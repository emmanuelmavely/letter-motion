import { startAnimation } from './animation.js';
import { initRecorder } from './recorder.js';

document.addEventListener('DOMContentLoaded', function() {
    // Set up the UI components
    setupUI();
    
    // Initialize video recorder functionality
    initRecorder();
});

/**
 * Sets up the user interface components
 */
function setupUI() {
    // Create the input container and text display
    const videoFrame = document.querySelector('.video-frame');
    
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';
    
    const wordInput = document.createElement('input');
    wordInput.type = 'text';
    wordInput.id = 'wordInput';
    wordInput.placeholder = 'Type a word...';
    
    const animateButton = document.createElement('button');
    animateButton.textContent = 'Animate';
    animateButton.onclick = () => startAnimation();
    
    inputContainer.appendChild(wordInput);
    inputContainer.appendChild(animateButton);
    
    const textDisplay = document.createElement('div');
    textDisplay.className = 'text-display';
    textDisplay.id = 'textDisplay';
    
    // Instructions
    const instructions = document.createElement('div');
    instructions.className = 'instructions';
    const note = document.createElement('p');
    note.className = 'note';
    note.textContent = 'Note: Video recording works best in Chrome/Edge. Large animations may result in large file sizes.';
    instructions.appendChild(note);
    
    // Controls panel
    const controlsPanel = document.querySelector('.controls-panel');
    if (!controlsPanel.hasChildNodes()) {
        // Cycles per Letter control
        const cyclesDiv = document.createElement('div');
        const cyclesLabel = document.createElement('label');
        cyclesLabel.htmlFor = 'numCyclesInput';
        cyclesLabel.textContent = 'Cycles per Letter (5-50):';
        const cyclesInput = document.createElement('input');
        cyclesInput.type = 'number';
        cyclesInput.id = 'numCyclesInput';
        cyclesInput.value = '12';
        cyclesInput.min = '5';
        cyclesInput.max = '50';
        cyclesDiv.appendChild(cyclesLabel);
        cyclesDiv.appendChild(cyclesInput);
        
        // Cycle Speed control
        const speedDiv = document.createElement('div');
        const speedLabel = document.createElement('label');
        speedLabel.htmlFor = 'cycleIntervalInput';
        speedLabel.textContent = 'Cycle Speed (ms, 20-200):';
        const speedInput = document.createElement('input');
        speedInput.type = 'number';
        speedInput.id = 'cycleIntervalInput';
        speedInput.value = '75';
        speedInput.min = '20';
        speedInput.max = '200';
        speedInput.step = '5';
        speedDiv.appendChild(speedLabel);
        speedDiv.appendChild(speedInput);
        
        // Letter Spacing control
        const spacingDiv = document.createElement('div');
        const spacingLabel = document.createElement('label');
        spacingLabel.htmlFor = 'letterSpacingInput';
        spacingLabel.textContent = 'Letter Spacing (px, 0-50):';
        const spacingInput = document.createElement('input');
        spacingInput.type = 'number';
        spacingInput.id = 'letterSpacingInput';
        spacingInput.value = '15';
        spacingInput.min = '0';
        spacingInput.max = '50';
        spacingInput.step = '1';
        spacingDiv.appendChild(spacingLabel);
        spacingDiv.appendChild(spacingInput);
        
        // Video controls
        const videoControlsDiv = document.createElement('div');
        videoControlsDiv.className = 'video-controls';
        const recordButton = document.createElement('button');
        recordButton.id = 'recordButton';
        recordButton.className = 'control-button';
        recordButton.textContent = 'Record Animation';
        const downloadButton = document.createElement('button');
        downloadButton.id = 'downloadButton';
        downloadButton.className = 'control-button';
        downloadButton.disabled = true;
        downloadButton.textContent = 'Download 1080p Video';
        videoControlsDiv.appendChild(recordButton);
        videoControlsDiv.appendChild(downloadButton);
        
        // Append all controls
        controlsPanel.appendChild(cyclesDiv);
        controlsPanel.appendChild(speedDiv);
        controlsPanel.appendChild(spacingDiv);
        controlsPanel.appendChild(videoControlsDiv);
    }
    
    // Add everything to the video frame
    if (!videoFrame.querySelector('.input-container')) {
        videoFrame.appendChild(textDisplay);
        videoFrame.appendChild(inputContainer);
        videoFrame.appendChild(instructions);
    }
    
    // Allow Enter key to start animation
    wordInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission if it's in a form
            startAnimation();
        }
    });

    // Auto-focus input
    wordInput.focus();
    
    // Optional: Update letter spacing in real-time when the input changes
    document.getElementById('letterSpacingInput').addEventListener('input', function() {
        const textDisplay = document.getElementById('textDisplay');
        const letterSpacing = parseInt(this.value, 10);
        
        if (!isNaN(letterSpacing) && letterSpacing >= parseInt(this.min, 10) && letterSpacing <= parseInt(this.max, 10)) {
            textDisplay.style.gap = `${letterSpacing}px`;
        }
    });
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
    setupUI();
    initRecorder();
});