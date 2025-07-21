/**
 * Configuration file for Letter Motion
 * Centralized settings for easy customization
 */

const CONFIG = {
    // Animation settings
    animation: {
        defaultCycles: 12,
        minCycles: 5,
        maxCycles: 50,
        defaultSpeed: 75, // milliseconds
        minSpeed: 20,
        maxSpeed: 200,
        defaultLetterSpacing: 15,
        minLetterSpacing: 0,
        maxLetterSpacing: 50,
        staggerDelay: 150 // delay between letter animations
    },
    
    // Visual settings
    visual: {
        defaultBackgroundColor: '#000000',
        defaultFontColor: '#ffffff',
        fontSize: 120,
        minFontSize: 60,
        maxFontSize: 200,
        fontWeight: 700,
        fontFamily: 'Inter'
    },
    
    // Recording settings
    recording: {
        width: 1920,
        height: 1080,
        frameRate: 30,
        maxDuration: 10000, // 10 seconds
        defaultMimeType: 'video/webm',
        chunkInterval: 1000 // 1 second chunks
    },
    
    // Input validation
    validation: {
        maxTextLength: 15,
        allowedCharacters: /^[a-zA-Z0-9\s]*$/, // letters, numbers, spaces
        sanitizeInput: true
    },
    
    // Accessibility
    accessibility: {
        announceAnimations: true,
        respectMotionPreferences: true,
        keyboardNavigationEnabled: true,
        highContrastSupport: true
    },
    
    // Performance
    performance: {
        animationThrottleFPS: 60,
        enablePreloading: true,
        lazyLoadFonts: true,
        optimizeCanvas: true
    },
    
    // Green screen colors
    greenScreenColors: {
        'chroma-green': '#00FF00',
        'studio-green': '#00B04F',
        'blue-screen': '#0000FF',
        'magenta': '#FF00FF',
        'yellow': '#FFFF00'
    },
    
    // Debug settings
    debug: {
        enableLogging: false,
        showPerformanceMetrics: false,
        enableErrorReporting: true
    }
};

// Make config immutable
Object.freeze(CONFIG);

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}