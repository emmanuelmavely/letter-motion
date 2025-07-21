/**
 * Letter Motion - JavaScript Animation Controller
 * A text animation that cycles letters through different writing systems
 * before revealing the final text, inspired by "Kalki 2898 AD" movie title.
 */

// Character mappings for different languages/scripts - CLEANED VERSION
// Already filtered to exclude visually similar characters and the English letter itself
const languageMappings = {
    'A': ['अ', 'আ', 'அ', 'అ', 'ಅ', 'അ', 'અ', 'ਏ', 'ا', 'あ', 'ㅏ', '艾', 'Ā'],
    'B': ['ब', 'ব', 'প', 'బ', 'ಬ', 'ബ', 'બ', 'ਬ', 'ب', 'び', 'ㅂ', '比', '฿'],
    'C': ['च', 'চ', 'ச', 'చ', 'ಚ', 'ച', 'સ', 'ਸ', 'س', 'Ц', 'し', 'ㅊ', '西', 'Č'],
    'D': ['द', 'দ', 'ট', 'ద', 'ದ', 'ദ', 'ડ', 'ਡ', 'د', 'Д', 'Δ', 'で', 'ㄷ', '迪', 'Ď'],
    'E': ['ए', 'এ', 'எ', 'ఎ', 'ಎ', 'എ', 'ઈ', 'ਈ', 'إ', 'え', 'ㅔ', '伊', 'Ē'],
    'F': ['फ', 'ফ', 'ಫ', 'ఫ', 'ಫ', 'ഫ', 'ફ', 'ફ', 'ف', 'Ф', 'Φ', 'ふ', 'ㅍ', '弗', 'Ƒ'],
    'G': ['ग', 'গ', 'க', 'గ', 'ಗ', 'ഗ', 'ગ', 'જ', 'ج', 'じ', 'ㄱ', '吉', 'Ĝ'],
    'H': ['ह', 'হ', 'ஹ', 'హ', 'ಹ', 'ഹ', 'હ', 'ਹ', 'ه', 'は', 'ㅎ', '哈', 'Ĥ'],
    'I': ['इ', 'ই', 'இ', 'ఇ', 'ಇ', 'ഇ', 'આ', 'ਆ', 'ي', 'И', 'い', 'ㅣ', '艾', 'Ī'],
    'J': ['ज', 'জ', 'ஜ', 'జ', 'ಜ', 'ജ', 'જ', 'ਜ', 'ج', 'Џ', 'じ', 'ㅈ', '杰', 'Ĵ'],
    'K': ['क', 'ক', 'க', 'క', 'ಕ', 'ಕ', 'ક', 'ક', 'ك', 'く', 'ㅋ', '科', 'Ķ'],
    'L': ['ल', 'ল', 'ல', 'ల', 'ಲ', 'ಲ', 'લ', 'લ', 'ل', 'Л', 'Λ', 'る', 'ㄹ', '勒', 'Ļ'],
    'M': ['म', 'ম', 'ம', 'మ', 'ಮ', 'മ', 'મ', 'મ', 'م', 'む', 'ㅁ', '马', 'M̄'],
    'N': ['न', 'ন', 'ந', 'ன', 'ನ', 'ന', 'ન', 'ન', 'ن', 'ん', 'ㄴ', '娜', 'Ņ'],
    'O': ['ओ', 'ও', 'ஒ', 'ఓ', 'ಒ', 'ഒ', 'ઓ', 'ਓ', 'و', 'お', 'ㅗ', '哦', 'Ō'],
    'P': ['प', 'প', 'ப', 'ప', 'ಪ', 'ಪ', 'પ', 'પ', 'پ', 'ぴ', 'ㅍ', '帕', '℗'],
    'Q': ['क', 'क', 'ग', 'क', 'ಕ', 'ಕ', 'ક', 'ક', 'ق', 'Ϙ', 'く', 'ㅋ', '趣'],
    'R': ['र', 'র', 'ர', 'ర', 'ರ', 'ര', 'ર', 'ર', 'ر', 'ら', 'ㄹ', '瑞', 'Ř'],
    'S': ['स', 'স', 'ஸ', 'స', 'ಸ', 'സ', 'સ', 'ਸ', 'س', 'Σ', 'す', 'ㅅ', '萨', 'Š'],
    'T': ['त', 'ত', 'த', 'త', 'ತ', 'ತ', 'ટ', 'ਤ', 'ت', 'て', 'ㅌ', '特', 'Ť'],
    'U': ['उ', 'উ', 'உ', 'ఉ', 'ಉ', 'ഉ', 'ઉ', 'ਊ', 'يو', 'う', 'ㅜ', '优', 'Ū'],
    'V': ['व', 'ভ', 'வ', 'వ', 'ವ', 'വ', 'વ', 'વ', 'ڤ', 'ゔ', 'ㅂ', '维'],
    'W': ['व', 'ড', 'ட', 'డ', 'ಡ', 'ಡ', 'ડ', 'ડ', 'و', 'Ω', 'わ', 'ㅇ', '瓦'],
    'X': ['स', 'স', 'ச', 'స', 'ಸ', 'സ', 'ક્ષ', 'ਕ', 'س', 'え', 'ㄱ', '希', 'X̄'],
    'Y': ['य', 'য়', 'ஒ', 'వ', 'ವ', 'വ', 'ય', 'ਯ', 'ي', 'Й', 'Ψ', 'わ', 'ㅑ', '伊'],
    'Z': ['ज़', 'জ', 'இ', 'జ', 'ಝ', 'സ', 'ઝ', 'ਜ਼', 'ز', 'ず', 'ㅈ', '泽', 'Ž']
};

// Application state
let currentAnimating = false;
let isRecording = false;
let mediaRecorder = null;
let recordedChunks = [];
let animationFrameId = null;
let startTime = 0;

// DOM element references
let elements = {};

/**
 * Initialize the application
 */
function initializeApp() {
    // Cache DOM elements
    cacheElements();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize UI state
    initializeUI();
    
    console.log('Letter Motion initialized successfully');
}

/**
 * Cache frequently used DOM elements
 */
function cacheElements() {
    elements = {
        wordInput: document.getElementById('wordInput'),
        textDisplay: document.getElementById('textDisplay'),
        settingsButton: document.getElementById('settingsButton'),
        controlsPanel: document.getElementById('controlsPanel'),
        recordButton: document.getElementById('recordButton'),
        downloadButton: document.getElementById('downloadButton'),
        greenScreenToggle: document.getElementById('greenScreenToggle'),
        backgroundColorInput: document.getElementById('backgroundColorInput'),
        fontColorInput: document.getElementById('fontColorInput'),
        greenScreenColorSelect: document.getElementById('greenScreenColorSelect'),
        canvas: document.getElementById('recordingCanvas'),
        numCyclesInput: document.getElementById('numCyclesInput'),
        cycleIntervalInput: document.getElementById('cycleIntervalInput'),
        letterSpacingInput: document.getElementById('letterSpacingInput')
    };
    
    elements.ctx = elements.canvas.getContext('2d');
}

/**
 * Set up all event listeners
 */
function setupEventListeners() {
    // Input events
    elements.wordInput.addEventListener('keypress', handleKeyPress);
    
    // Button events
    elements.settingsButton.addEventListener('click', toggleSettingsPanel);
    elements.recordButton.addEventListener('click', toggleRecording);
    
    // Settings events
    elements.backgroundColorInput.addEventListener('change', updateBackgroundColor);
    elements.fontColorInput.addEventListener('change', updateFontColor);
    elements.greenScreenToggle.addEventListener('click', toggleGreenScreen);
    elements.greenScreenColorSelect.addEventListener('change', updateGreenScreenColor);
    
    // Download events
    setupDownloadEvents();
    
    // Close settings panel when clicking outside
    document.addEventListener('click', handleDocumentClick);
    
    // Window events
    window.addEventListener('load', () => {
        elements.wordInput.focus();
    });
    
    // Error handling
    window.addEventListener('error', handleGlobalError);
}

/**
 * Initialize UI state
 */
function initializeUI() {
    // Check for iOS and add appropriate classes
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS && elements.downloadButton) {
        elements.downloadButton.classList.add('long-press-hint');
    }
    
    // Log MediaRecorder support
    console.log('MediaRecorder supported:', typeof MediaRecorder !== 'undefined');
}

/**
 * Handle key press events
 * @param {KeyboardEvent} e - The keyboard event
 */
function handleKeyPress(e) {
    if (e.key === 'Enter') {
        startAnimation();
    }
}

/**
 * Toggle the settings panel
 */
function toggleSettingsPanel() {
    elements.controlsPanel.classList.toggle('open');
    elements.settingsButton.classList.toggle('active');
}

/**
 * Handle document clicks for closing panels
 * @param {MouseEvent} e - The click event
 */
function handleDocumentClick(e) {
    if (!elements.controlsPanel.contains(e.target) && !elements.settingsButton.contains(e.target)) {
        elements.controlsPanel.classList.remove('open');
        elements.settingsButton.classList.remove('active');
    }
}

/**
 * Start the text animation
 */
function startAnimation() {
    if (currentAnimating) return;
    
    const word = sanitizeInput(elements.wordInput.value.toUpperCase().trim());
    
    if (!word) {
        elements.wordInput.focus();
        return;
    }
    
    currentAnimating = true;
    document.body.classList.add('animating');
    elements.textDisplay.innerHTML = '';
    
    animateWord(word);
}

/**
 * Sanitize user input
 * @param {string} input - Raw user input
 * @returns {string} Sanitized input
 */
function sanitizeInput(input) {
    // Remove potentially harmful characters and limit length
    return input.replace(/[<>&"']/g, '').substring(0, 15);
}

/**
 * Animate a complete word
 * @param {string} word - The word to animate
 */
async function animateWord(word) {
    currentAnimating = true;
    elements.textDisplay.innerHTML = '';
    const letters = word.split('');
    const letterSpans = [];
    
    // Get and validate letter spacing
    const letterSpacing = getValidatedNumberInput(elements.letterSpacingInput, 15);
    elements.textDisplay.style.gap = `${letterSpacing}px`;

    // Create letter spans
    letters.forEach(() => {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'letter';
        letterSpan.innerHTML = '&nbsp;';
        elements.textDisplay.appendChild(letterSpan);
        letterSpans.push(letterSpan);
    });

    // Animate each letter with staggered timing
    for (let i = 0; i < letters.length; i++) {
        if (i > 0) {
            await delay(150);
        }
        await animateLetter(letterSpans[i], letters[i], i);
    }
    
    currentAnimating = false;
    document.body.classList.remove('animating');
}

/**
 * Animate a single letter
 * @param {HTMLElement} element - The DOM element to animate
 * @param {string} targetLetter - The final letter to display
 * @param {number} index - Letter index in the word
 * @returns {Promise} Promise that resolves when animation completes
 */
async function animateLetter(element, targetLetter, index) {
    return new Promise(resolve => {
        cycleThroughLanguages(element, targetLetter, () => {
            element.textContent = targetLetter;
            element.style.opacity = '1';
            element.style.transform = 'scale(1) translateY(0)';
            resolve();
        });
    });
}

/**
 * Cycle through different language characters
 * @param {HTMLElement} element - The DOM element to update
 * @param {string} targetLetter - The final target letter
 * @param {Function} onComplete - Callback when cycling completes
 */
function cycleThroughLanguages(element, targetLetter, onComplete) {
    let cycles = 0;
    
    // Get and validate settings
    const maxCycles = getValidatedNumberInput(elements.numCyclesInput, 12);
    const intervalTime = getValidatedNumberInput(elements.cycleIntervalInput, 75);
    
    const upperTargetLetter = targetLetter.toUpperCase();
    const mappedChars = languageMappings[upperTargetLetter];
    let cyclingCharsPool;

    // Determine character pool for cycling
    if (mappedChars && mappedChars.length > 0) {
        cyclingCharsPool = mappedChars.filter(c => c !== targetLetter);
        if (cyclingCharsPool.length === 0) {
            cyclingCharsPool = mappedChars;
        }
    } else {
        const fallbackSymbols = ['*', '#', '$', '%', '§', 'Ω', '∑', '∆', '!', '?'];
        cyclingCharsPool = fallbackSymbols.filter(s => s !== targetLetter);
        if (cyclingCharsPool.length === 0) cyclingCharsPool = ['?'];
    }

    // Pre-shuffle the character pool for better randomness
    const shuffledPool = [...cyclingCharsPool];
    for (let i = shuffledPool.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPool[i], shuffledPool[j]] = [shuffledPool[j], shuffledPool[i]];
    }

    // Set initial display character
    let poolIndex = 0;
    let currentDisplayChar = shuffledPool[poolIndex] || getRandomCharacter(cyclingCharsPool, targetLetter);
    element.textContent = currentDisplayChar;

    // Start cycling animation
    const intervalId = setInterval(() => {
        cycles++;
        if (cycles >= maxCycles) {
            clearInterval(intervalId);
            onComplete();
            return;
        }

        // Use pre-shuffled pool for better performance
        poolIndex = (poolIndex + 1) % shuffledPool.length;
        element.textContent = shuffledPool[poolIndex];
    }, intervalTime);
}

/**
 * Get a random character from the pool, avoiding repetition
 * @param {Array} charPool - Available characters
 * @param {string} currentChar - Current character to avoid
 * @returns {string} Random character
 */
function getRandomCharacter(charPool, currentChar) {
    if (charPool.length === 0) return '?';
    if (charPool.length === 1) return charPool[0];
    
    let attempts = 0;
    let nextChar = charPool[Math.floor(Math.random() * charPool.length)];
    
    // Try to avoid repeating the same character
    while (nextChar === currentChar && attempts < charPool.length) {
        nextChar = charPool[Math.floor(Math.random() * charPool.length)];
        attempts++;
    }
    
    return nextChar;
}

/**
 * Validate and return a number input value
 * @param {HTMLInputElement} input - The input element
 * @param {number} defaultValue - Default value if validation fails
 * @returns {number} Validated number
 */
function getValidatedNumberInput(input, defaultValue) {
    const value = parseInt(input.value, 10);
    const min = parseInt(input.min, 10);
    const max = parseInt(input.max, 10);
    
    if (isNaN(value) || value < min || value > max) {
        input.value = defaultValue;
        return defaultValue;
    }
    
    return value;
}

/**
 * Create a delay promise
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise} Promise that resolves after delay
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Update background color
 */
function updateBackgroundColor() {
    if (!elements.greenScreenToggle.classList.contains('active')) {
        elements.textDisplay.style.backgroundColor = elements.backgroundColorInput.value;
    }
}

/**
 * Update font color
 */
function updateFontColor() {
    const color = elements.fontColorInput.value;
    const letters = document.querySelectorAll('.letter');
    letters.forEach(letter => {
        letter.style.color = color;
    });
}

/**
 * Toggle green screen mode
 */
function toggleGreenScreen() {
    elements.greenScreenToggle.classList.toggle('active');
    
    if (elements.greenScreenToggle.classList.contains('active')) {
        elements.textDisplay.style.backgroundColor = elements.greenScreenColorSelect.value;
    } else {
        elements.textDisplay.style.backgroundColor = elements.backgroundColorInput.value;
    }
}

/**
 * Update green screen color
 */
function updateGreenScreenColor() {
    if (elements.greenScreenToggle.classList.contains('active')) {
        elements.textDisplay.style.backgroundColor = elements.greenScreenColorSelect.value;
    }
}

// Recording functionality
/**
 * Toggle recording state
 */
function toggleRecording() {
    if (!isRecording) {
        startRecording();
    } else {
        stopRecording();
    }
}

/**
 * Start video recording
 */
function startRecording() {
    if (!elements.canvas || typeof MediaRecorder === 'undefined') {
        alert('Recording is not supported in this browser.');
        return;
    }
    
    recordedChunks = [];
    isRecording = true;
    elements.recordButton.classList.add('recording');
    elements.downloadButton.disabled = true;
    
    console.log('Starting recording...');
    
    try {
        // Get canvas stream
        const stream = elements.canvas.captureStream(30);
        console.log('Canvas stream created:', stream);
        
        // Determine optimal MIME type
        const mimeType = getOptimalMimeType();
        console.log('Using MIME type:', mimeType);
        
        mediaRecorder = new MediaRecorder(stream, { mimeType });
        
        mediaRecorder.ondataavailable = function(event) {
            console.log('Data available:', event.data.size);
            if (event.data.size > 0) {
                recordedChunks.push(event.data);
            }
        };
        
        mediaRecorder.onstop = function() {
            console.log('Recording stopped, chunks:', recordedChunks.length);
            if (recordedChunks.length > 0) {
                elements.downloadButton.disabled = false;
            }
            isRecording = false;
            elements.recordButton.classList.remove('recording');
        };
        
        mediaRecorder.onerror = function(event) {
            console.error('MediaRecorder error:', event);
            resetRecordingState();
        };
        
        mediaRecorder.start(1000);
        console.log('MediaRecorder started');
        
        startTime = performance.now();
        animationLoop();
        
        // Start animation if word exists
        if (!currentAnimating) {
            const word = elements.wordInput.value;
            if (word.trim()) {
                animateWord(word.toUpperCase().trim());
            } else {
                drawMessageOnCanvas('Please enter a word and try again');
                setTimeout(stopRecording, 2000);
            }
        }
        
    } catch (error) {
        console.error('Recording failed:', error);
        resetRecordingState();
        alert('Recording failed: ' + error.message);
    }
}

/**
 * Stop video recording
 */
function stopRecording() {
    console.log('Stopping recording...');
    
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        
        // Stop all tracks
        if (mediaRecorder.stream) {
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
    }
    
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
}

/**
 * Reset recording state
 */
function resetRecordingState() {
    isRecording = false;
    elements.recordButton.classList.remove('recording');
    elements.downloadButton.disabled = true;
    console.log('Recording state reset');
}

/**
 * Get optimal MIME type for recording
 * @returns {string} MIME type string
 */
function getOptimalMimeType() {
    const types = [
        'video/mp4',
        'video/webm;codecs=h264',
        'video/webm;codecs=vp9',
        'video/webm'
    ];
    
    for (let type of types) {
        if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(type)) {
            return type;
        }
    }
    
    return 'video/webm'; // Final fallback
}

/**
 * Animation loop for recording
 */
function animationLoop() {
    // Throttle animation loop for better performance
    const now = performance.now();
    if (now - (animationLoop.lastTime || 0) < 16) { // ~60fps
        if (isRecording) {
            animationFrameId = requestAnimationFrame(animationLoop);
        }
        return;
    }
    animationLoop.lastTime = now;

    // Get current background color
    let bgColor = elements.backgroundColorInput.value;
    if (elements.greenScreenToggle.classList.contains('active')) {
        bgColor = elements.greenScreenColorSelect.value;
    }
    
    elements.ctx.fillStyle = bgColor;
    elements.ctx.fillRect(0, 0, elements.canvas.width, elements.canvas.height);
    
    elements.ctx.save();
    elements.ctx.translate(
        elements.canvas.width / 2 - elements.textDisplay.offsetWidth / 2, 
        elements.canvas.height / 2 - elements.textDisplay.offsetHeight / 2
    );
    
    const letters = elements.textDisplay.querySelectorAll('.letter');
    letters.forEach((letter, index) => {
        const style = window.getComputedStyle(letter);
        const letterSpacing = getValidatedNumberInput(elements.letterSpacingInput, 15);
        
        elements.ctx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
        elements.ctx.fillStyle = elements.fontColorInput.value;
        elements.ctx.textAlign = 'center';
        
        const x = index * (parseInt(style.minWidth) + letterSpacing);
        
        elements.ctx.globalAlpha = parseFloat(style.opacity);
        elements.ctx.fillText(letter.textContent || ' ', x + parseInt(style.minWidth)/2, parseInt(style.fontSize)/2);
    });
    
    elements.ctx.restore();
    
    if (isRecording) {
        // Auto-stop after 10 seconds
        if (performance.now() - startTime > 10000) {
            stopRecording();
            return;
        }
        animationFrameId = requestAnimationFrame(animationLoop);
    }
}

/**
 * Draw message on canvas
 * @param {string} message - Message to display
 */
function drawMessageOnCanvas(message) {
    let bgColor = elements.backgroundColorInput.value;
    if (elements.greenScreenToggle.classList.contains('active')) {
        bgColor = elements.greenScreenColorSelect.value;
    }
    
    elements.ctx.fillStyle = bgColor;
    elements.ctx.fillRect(0, 0, elements.canvas.width, elements.canvas.height);
    elements.ctx.font = '48px Inter';
    elements.ctx.fillStyle = elements.fontColorInput.value;
    elements.ctx.textAlign = 'center';
    elements.ctx.fillText(message, elements.canvas.width/2, elements.canvas.height/2);
}

// Download functionality
/**
 * Set up download event listeners
 */
function setupDownloadEvents() {
    let longPressTimer;
    
    // Mouse events
    elements.downloadButton.addEventListener('mousedown', startLongPress);
    elements.downloadButton.addEventListener('mouseup', endLongPress);
    elements.downloadButton.addEventListener('mouseleave', endLongPress);
    
    // Touch events for mobile
    elements.downloadButton.addEventListener('touchstart', startLongPress);
    elements.downloadButton.addEventListener('touchend', endLongPress);
    elements.downloadButton.addEventListener('touchcancel', endLongPress);
    
    elements.downloadButton.addEventListener('click', handleDownload);
    
    function startLongPress(e) {
        if (recordedChunks.length === 0) return;
        
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            longPressTimer = setTimeout(() => {
                handleIOSSave();
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
            }, 800);
        }
    }
    
    function endLongPress(e) {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    }
    
    function handleDownload(e) {
        if (recordedChunks.length === 0) {
            alert('No video recorded. Please record a video first.');
            return;
        }
        
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
            return;
        }
        
        handleRegularDownload();
    }
}

/**
 * Handle regular download
 */
function handleRegularDownload() {
    if (recordedChunks.length === 0) {
        alert('No video recorded. Please record a video first.');
        return;
    }
    
    const blob = new Blob(recordedChunks, { 
        type: mediaRecorder ? mediaRecorder.mimeType : 'video/webm' 
    });
    
    console.log('Creating download blob:', blob.type, 'Size:', blob.size);
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.style.display = 'none';
    a.href = url;
    a.download = `letter-animation${getFileExtension(blob.type)}`;
    
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
    
    console.log('Download triggered for:', blob.type, 'Size:', blob.size);
}

/**
 * Handle iOS-specific save functionality
 */
function handleIOSSave() {
    if (recordedChunks.length === 0) {
        alert('No video recorded. Please record a video first.');
        return;
    }
    
    const blob = new Blob(recordedChunks, { 
        type: mediaRecorder ? mediaRecorder.mimeType : 'video/webm' 
    });
    
    // Try Web Share API first
    if (navigator.share && navigator.canShare) {
        try {
            const file = new File([blob], 'letter-animation.webm', { 
                type: blob.type 
            });
            
            if (navigator.canShare({ files: [file] })) {
                navigator.share({
                    files: [file],
                    title: 'Letter Motion Animation',
                    text: 'Check out this letter animation!'
                }).then(() => {
                    console.log('Share successful');
                }).catch((error) => {
                    console.log('Share failed:', error);
                    fallbackIOSSave(blob);
                });
                return;
            }
        } catch (error) {
            console.log('Web Share API failed:', error);
        }
    }
    
    fallbackIOSSave(blob);
}

/**
 * Fallback save method for iOS
 * @param {Blob} blob - The video blob
 */
function fallbackIOSSave(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.style.display = 'none';
    a.href = url;
    a.download = 'letter-animation.webm';
    a.target = '_blank';
    
    document.body.appendChild(a);
    
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
        const clickEvent = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true
        });
        a.dispatchEvent(clickEvent);
        
        setTimeout(() => {
            alert('Tip for iOS: After downloading, the video will be in your Files app. You can then move it to Photos by opening Files > letter-animation.webm > Share > Save to Photos');
        }, 1000);
    } else {
        a.click();
    }
    
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

/**
 * Get file extension based on MIME type
 * @param {string} mimeType - MIME type string
 * @returns {string} File extension
 */
function getFileExtension(mimeType) {
    if (!mimeType) return '.webm';
    if (mimeType.includes('mp4')) return '.mp4';
    if (mimeType.includes('webm')) return '.webm';
    if (mimeType.includes('mov')) return '.mov';
    return '.webm';
}

/**
 * Global error handler
 * @param {ErrorEvent} event - Error event
 */
function handleGlobalError(event) {
    console.error('Global error:', event.error);
    // Could implement user-friendly error reporting here
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeApp,
        startAnimation,
        languageMappings
    };
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}