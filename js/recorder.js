import { animateWord, currentAnimating } from './animation.js';

/**
 * Video recording variables
 */
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let animationFrameId;
let startTime;

/**
 * Initializes the video recorder functionality
 */
function initRecorder() {
    const recordButton = document.getElementById('recordButton');
    const downloadButton = document.getElementById('downloadButton');
    
    if (!recordButton || !downloadButton) {
        console.error("Recording buttons not found");
        return;
    }
    
    // Function to start/stop recording
    recordButton.addEventListener('click', function() {
        if (!isRecording) {
            // Start recording
            startRecording();
        } else {
            // Stop recording
            stopRecording();
        }
    });
    
    // Function to download the recorded video
    downloadButton.addEventListener('click', function() {
        if (recordedChunks.length === 0) return;
        
        const blob = new Blob(recordedChunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.style.display = 'none';
        a.href = url;
        a.download = 'letter-animation-1080p.webm';
        document.body.appendChild(a);
        a.click();
        
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 100);
    });
}

/**
 * Starts the recording process
 */
function startRecording() {
    const canvas = document.getElementById('recordingCanvas');
    const ctx = canvas.getContext('2d');
    
    recordedChunks = [];
    isRecording = true;
    
    const recordButton = document.getElementById('recordButton');
    const downloadButton = document.getElementById('downloadButton');
    
    recordButton.textContent = "Stop Recording";
    recordButton.classList.add('recording');
    downloadButton.disabled = true;
    
    // Set up the stream from the canvas
    const stream = canvas.captureStream(30); // 30 FPS
    mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
    
    mediaRecorder.ondataavailable = function(e) {
        if (e.data.size > 0) {
            recordedChunks.push(e.data);
        }
    };
    
    mediaRecorder.onstop = function() {
        downloadButton.disabled = false;
    };
    
    // Start the recorder and the animation loop
    mediaRecorder.start();
    startTime = performance.now();
    animationLoop();
    
    // Trigger animation if not already animating
    if (!currentAnimating) {
        const word = document.getElementById('wordInput').value;
        if (word) {
            animateWord(word);
        } else {
            // If no word is entered, show a message on the canvas
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = '48px Poppins';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Please enter a word and try again', canvas.width/2, canvas.height/2);
            
            // Auto-stop recording if no animation
            setTimeout(stopRecording, 2000);
        }
    }
}

/**
 * Stops the recording process
 */
function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        isRecording = false;
        
        const recordButton = document.getElementById('recordButton');
        recordButton.textContent = "Record Animation";
        recordButton.classList.remove('recording');
        
        cancelAnimationFrame(animationFrameId);
    }
}

/**
 * Animation loop for canvas recording
 */
function animationLoop() {
    const canvas = document.getElementById('recordingCanvas');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw the current state of the animation
    const videoFrame = document.querySelector('.video-frame');
    const textDisplay = document.getElementById('textDisplay');
    
    if (!textDisplay) {
        animationFrameId = requestAnimationFrame(animationLoop);
        return;
    }
    
    // Center the text on the canvas
    ctx.save();
    ctx.translate(
        canvas.width / 2 - textDisplay.offsetWidth / 2, 
        canvas.height / 2 - textDisplay.offsetHeight / 2
    );
    
    // Draw each letter
    const letters = textDisplay.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        // Get computed style of the letter
        const style = window.getComputedStyle(letter);
        const letterSpacing = parseInt(document.getElementById('letterSpacingInput').value) || 15;
        
        ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        ctx.fillStyle = style.color;
        ctx.textAlign = 'center';
        
        // Calculate position considering letter spacing
        const x = index * (parseInt(style.minWidth) + letterSpacing);
        
        // Draw with the letter's current content
        ctx.globalAlpha = parseFloat(style.opacity);
        ctx.fillText(letter.textContent || ' ', x + parseInt(style.minWidth)/2, parseInt(style.fontSize)/2);
    });
    
    ctx.restore();
    
    // Continue the loop only if still recording
    if (isRecording) {
        // Stop after 10 seconds to prevent huge files
        if (performance.now() - startTime > 10000) {
            stopRecording();
            return;
        }
        animationFrameId = requestAnimationFrame(animationLoop);
    }
}

export { initRecorder };