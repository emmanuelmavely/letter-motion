import { languageMappings } from './languages.js';

/**
 * Starts the animation for the input word
 */
function startAnimation() {
    const wordInput = document.getElementById('wordInput');
    const word = wordInput.value.trim();
    if (word && !currentAnimating) {
        animateWord(word);
    }
}

/**
 * Animates each letter in a word, one by one
 * @param {string} word - The word to animate
 */
async function animateWord(word) {
    currentAnimating = true;
    const textDisplay = document.getElementById('textDisplay');
    textDisplay.innerHTML = ''; 
    const letters = word.split('');
    const letterSpans = [];
    
    // Get the letter spacing value from the input
    const letterSpacingInput = document.getElementById('letterSpacingInput');
    let letterSpacing = parseInt(letterSpacingInput.value, 10);
    if (isNaN(letterSpacing) || letterSpacing < parseInt(letterSpacingInput.min, 10) || letterSpacing > parseInt(letterSpacingInput.max, 10)) {
        letterSpacing = 15; // Default value if the input is invalid
        letterSpacingInput.value = letterSpacing; // Correct the input field
    }
    
    // Apply letter spacing to the container
    textDisplay.style.gap = `${letterSpacing}px`;

    // Create letter spans
    for (let i = 0; i < letters.length; i++) {
        const letterSpan = document.createElement('span');
        letterSpan.className = 'letter';
        letterSpan.innerHTML = '&nbsp;'; 
        textDisplay.appendChild(letterSpan);
        letterSpans.push(letterSpan);
    }

    // Animate each letter
    for (let i = 0; i < letters.length; i++) {
        if (i > 0) {
            await new Promise(resolve => setTimeout(resolve, 150)); 
        }
        await animateLetter(letterSpans[i], letters[i], i);
    }
    currentAnimating = false;
}

/**
 * Animates a single letter with cycling effect
 * @param {HTMLElement} element - The span element to animate
 * @param {string} targetLetter - The final letter to display
 * @param {number} index - The index of this letter in the word
 */
async function animateLetter(element, targetLetter, index) {
    return new Promise(resolve => {
        cycleThroughLanguages(element, targetLetter, () => {
            element.textContent = targetLetter;
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
            resolve(); 
        });
    });
}

/**
 * Cycles through different language equivalents before showing the final letter
 * @param {HTMLElement} element - The span element to animate
 * @param {string} targetLetter - The final letter to display
 * @param {Function} onComplete - Callback function when cycling is complete
 */
function cycleThroughLanguages(element, targetLetter, onComplete) {
    let cycles = 0;

    // Read values from the control panel
    const numCyclesInput = document.getElementById('numCyclesInput');
    const cycleIntervalInput = document.getElementById('cycleIntervalInput');

    // Use parseInt to ensure they are numbers, provide defaults if parsing fails or input is invalid
    let maxCycles = parseInt(numCyclesInput.value, 10);
    if (isNaN(maxCycles) || maxCycles < parseInt(numCyclesInput.min, 10) || maxCycles > parseInt(numCyclesInput.max, 10)) {
        maxCycles = 12; // Default value if input is invalid
        numCyclesInput.value = maxCycles; // Correct the input field
    }

    let intervalTime = parseInt(cycleIntervalInput.value, 10);
    if (isNaN(intervalTime) || intervalTime < parseInt(cycleIntervalInput.min, 10) || intervalTime > parseInt(cycleIntervalInput.max, 10)) {
        intervalTime = 75; // Default value
        cycleIntervalInput.value = intervalTime; // Correct the input field
    }

    const upperTargetLetter = targetLetter.toUpperCase();
    let mappedChars = languageMappings[upperTargetLetter];
    let cyclingCharsPool;

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

    let currentDisplayChar = targetLetter;
    if (cyclingCharsPool.length > 0 && cyclingCharsPool[0] !== targetLetter) {
        currentDisplayChar = cyclingCharsPool[Math.floor(Math.random() * cyclingCharsPool.length)];
    } else if (cyclingCharsPool.length > 1) {
        currentDisplayChar = cyclingCharsPool[1];
    } else {
        currentDisplayChar = (targetLetter !== '?') ? '?' : '*';
    }
    element.textContent = currentDisplayChar;

    const intervalId = setInterval(() => {
        cycles++;
        if (cycles >= maxCycles) {
            clearInterval(intervalId);
            onComplete(); 
            return;
        }

        if (cyclingCharsPool.length > 0) {
            let nextChar = cyclingCharsPool[Math.floor(Math.random() * cyclingCharsPool.length)];
            if (cyclingCharsPool.length > 1 && nextChar === element.textContent) {
                let attempts = 0;
                while(nextChar === element.textContent && attempts < cyclingCharsPool.length) {
                    nextChar = cyclingCharsPool[Math.floor(Math.random() * cyclingCharsPool.length)];
                    attempts++;
                }
            }
            element.textContent = nextChar;
        } else {
            element.textContent = (element.textContent === '?') ? '#' : '?';
        }
    }, intervalTime);
}