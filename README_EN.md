# Hovercraft - CSS Hover Effects Museum

[中文](README.md) | English

![Hovercraft Logo](assets/favicon.svg)

Hovercraft is an interactive CSS hover effect showcase and generation tool that allows you to easily create, preview, and export various beautiful CSS hover animation effects.

## ✨ Features

- **Multiple Hover Effects**: Includes various effects such as scaling, rotation, glow, blur, skew, and borders
- **Real-time Preview**: All effect parameter adjustments can be previewed instantly
- **Custom Controls**: Adjust animation speed, effect magnitude, and animation curves
- **Code Export**: One-click generation of CSS code and copy to clipboard
- **Responsive Design**: Perfect adaptation to various device screens
- **Modern UI**: Cyberpunk-style interface design

## 🚀 Quick Start

### Local Installation

1. Clone the repository
   ```bash
   git clone https://github.com/zym9863/hovercraft.git
   cd hovercraft
   ```

2. Run with a local server
   - Use VS Code's Live Server plugin
   - Or use Python's HTTP server
     ```bash
     python -m http.server
     ```
   - Or use Node.js's http-server
     ```bash
     npx http-server
     ```

3. Visit `http://localhost:8000` or corresponding port in your browser

## 💡 Usage Guide

### Select Effect

1. Click any effect card in the effect showcase area
2. Or choose an effect type from the dropdown menu in the control panel

### Customize Parameters

- **Animation Speed**: Adjust the slider to control the transition time (0.1 to 2 seconds)
- **Effect Magnitude**: Adjust the slider to control the effect intensity (1 to 2 times)
- **Animation Curve**: Choose different transition effects from the dropdown menu (smooth, ease-in, ease-out, ease-in-out, linear)

### Export Code

1. Adjust parameters until satisfied
2. View the generated CSS code in the code export area
3. Click "Copy Code"