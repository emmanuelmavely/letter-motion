# Letter Motion 🎬

A captivating text animation inspired by the "Kalki 2898 AD" movie title. Watch letters transform through different writing systems before revealing the final text.

![Letter Motion Demo](https://github.com/user-attachments/assets/0c308468-5e5b-46d6-9591-c0c2771d8f46)

## ✨ Features

- **Multi-Language Animation**: Letters cycle through various writing systems (Devanagari, Bengali, Tamil, Arabic, Japanese, Korean, Chinese, and more)
- **Customizable Settings**: Adjust animation speed, cycles, colors, and letter spacing
- **Video Recording**: Record animations as MP4/WebM videos with green screen support
- **Mobile Optimized**: Works seamlessly on desktop, tablet, and mobile devices
- **Accessibility First**: Full keyboard navigation and screen reader support
- **Progressive Enhancement**: Graceful fallbacks for older browsers

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/emmanuelmavely/letter-motion.git
   cd letter-motion
   ```

2. **Start a local server**
   ```bash
   npm start
   # or
   python3 -m http.server 8080
   ```

3. **Open in browser**
   Navigate to `http://localhost:8080`

## 🎮 Usage

1. **Enter Text**: Type your text in the input field (max 15 characters)
2. **Animate**: Click the "Animate" button or press Enter
3. **Customize**: Use the settings panel (⚙️) to adjust animation parameters
4. **Record**: Click the record button (🎥) to capture your animation
5. **Download**: Download your recorded video (📥)

## ⚙️ Settings

| Setting | Description | Range |
|---------|-------------|--------|
| Animation Cycles | Number of character changes before revealing final letter | 5-50 |
| Speed (ms) | Time between character changes | 20-200ms |
| Letter Spacing | Space between letters in pixels | 0-50px |
| Green Screen | Enable chroma key background for video editing | Toggle |
| Background Color | Custom background color | Color picker |
| Font Color | Custom text color | Color picker |

## 🎬 Video Recording

The app includes built-in video recording with the following features:

- **Multiple Formats**: Supports MP4, WebM formats based on browser capabilities
- **Green Screen**: Multiple chroma key options (green, blue, magenta, yellow)
- **High Quality**: Records at 1920x1080 resolution at 30fps
- **iOS Optimized**: Special download handling for iOS devices

## 🌐 Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| Animation | ✅ | ✅ | ✅ | ✅ |
| Recording | ✅ | ✅ | ⚠️ | ✅ |
| Green Screen | ✅ | ✅ | ⚠️ | ✅ |

⚠️ Safari has limited MediaRecorder support

## 🎨 Customization

### Adding New Languages

To add support for new writing systems, edit `src/js/app.js`:

```javascript
const languageMappings = {
    'A': ['अ', 'আ', 'அ', 'あ', /* add your characters here */],
    // ... more letters
};
```

### Styling

Customize the appearance by modifying `src/css/styles.css`. Key CSS custom properties:

```css
:root {
    --primary-color: #007aff;
    --background-color: #000000;
    --text-color: #ffffff;
    --animation-duration: 0.6s;
}
```

## 📁 Project Structure

```
letter-motion/
├── index.html                 # Main HTML file
├── src/
│   ├── css/
│   │   └── styles.css        # Stylesheet
│   └── js/
│       └── app.js            # Main application logic
├── package.json              # Project metadata
└── README.md                 # This file
```

## 🔧 Development

### Prerequisites

- Modern web browser
- Python 3.x (for local server) or Node.js
- Text editor or IDE

### Scripts

```bash
npm start       # Start development server on port 8080
npm run dev     # Start development server on port 3000
npm run serve   # Start server on default port (8000)
```

### Code Quality

The codebase follows modern JavaScript practices:

- **ES6+ Features**: Arrow functions, async/await, destructuring
- **Error Handling**: Comprehensive try-catch blocks and validation
- **Performance**: Efficient DOM manipulation and memory management
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## 🌟 Inspiration

This project was inspired by the innovative title sequence of "Kalki 2898 AD" where letters morph through different scripts, representing the multilingual nature of Indian cinema.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### Development Guidelines

1. Follow existing code style and conventions
2. Add appropriate comments for complex logic
3. Test on multiple browsers and devices
4. Ensure accessibility compliance
5. Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by "Kalki 2898 AD" movie title sequence
- Font families from various writing systems
- Modern web APIs (MediaRecorder, Canvas, Web Fonts)

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/emmanuelmavely/letter-motion/issues) page
2. Create a new issue with detailed information
3. Include browser version, OS, and steps to reproduce

---

Made with ❤️ by [Emmanuel Mavely](https://github.com/emmanuelmavely)
