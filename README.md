# 🎃 Halloween Tic-Tac-Toe 👻

A spooky Halloween-themed twist on the classic Tic-Tac-Toe game! Battle it out as either a Pumpkin 🎃 or a Ghost 👻 in this haunted showdown.

![Halloween Tic-Tac-Toe](https://img.shields.io/badge/Theme-Halloween-orange?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.0.0-blue?style=for-the-badge&logo=react)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

## 🕷️ Features

- **Spooky Theme**: Dark purple and orange color scheme with glowing effects
- **Halloween Characters**: Play as Pumpkin (🎃) vs Ghost (👻)
- **Animated Gameplay**: Smooth animations for piece placement and winning combinations
- **Atmospheric Design**: Twinkling stars, glowing borders, and haunted aesthetics
- **Responsive Layout**: Works great on desktop and mobile devices
- **Victory Celebrations**: Special animations and messages when someone wins

## 🎮 How to Play

1. **Pumpkin** (🎃) always goes first
2. Click on any empty square to place your piece
3. Get three in a row (horizontally, vertically, or diagonally) to win!
4. Click "New Game" to start over

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/wreed3/tick-tack-toe.git
cd tick-tack-toe
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The game will automatically reload when you make changes.

## 🧪 Running Tests

Launch the test runner in interactive watch mode:

```bash
npm test
```

## 🏗️ Building for Production

Create an optimized production build:

```bash
npm run build
```

The build will be created in the `build/` folder, ready for deployment.

## 🎨 Customization

### Changing Colors

Edit `src/App.css` to modify the color scheme:
- Background gradient: `body` selector
- Glow effects: `.game-title` and `.square` selectors
- Border colors: `.square` and `.App` selectors

### Changing Game Pieces

Edit `src/App.js`, find the `getEmoji()` function in the `Square` component:

```javascript
const getEmoji = (val) => {
  if (val === 'X') return '🎃';  // Change pumpkin emoji
  if (val === 'O') return '👻';  // Change ghost emoji
  return '';
};
```

### Adding Sound Effects

To add spooky sound effects:

1. Create a `src/sounds/` directory
2. Add your audio files (e.g., `place.mp3`, `win.mp3`)
3. Import and play them in `src/App.js`:

```javascript
const placeSound = new Audio('/sounds/place.mp3');
placeSound.play();
```

## 📁 Project Structure

```
tick-tack-toe/
├── public/
│   ├── index.html          # HTML template with Halloween theme
│   ├── manifest.json       # PWA manifest with spooky branding
│   └── favicon.ico         # App icon
├── src/
│   ├── App.js              # Main game component with Halloween UI
│   ├── App.css             # Halloween styling and animations
│   ├── App.test.js         # Component tests
│   ├── game.js             # Game logic (winner calculation)
│   ├── game.test.js        # Game logic tests
│   └── index.js            # React entry point
└── package.json
```

## 🛠️ Technologies Used

- **React 18.0** - UI framework
- **Create React App** - Build tooling
- **CSS3** - Animations and styling
- **Google Fonts** - Creepster & Nosifer fonts
- **Jest & React Testing Library** - Testing

## 🎃 Theme Details

### Color Palette
- **Background**: Deep purple (#1a0a2e) with gradient
- **Primary Accent**: Halloween orange (#ff6600)
- **Secondary Accent**: Purple (#9d4edd)
- **Winning**: Neon green (#00ff00)

### Fonts
- **Title**: Nosifer (Google Fonts)
- **Body**: Creepster (Google Fonts)

### Animations
- Glowing title effect
- Piece placement with rotation
- Winning square pulse
- Hover effects with glow
- Twinkling star background

## 🐛 Known Issues

- Emoji rendering may vary slightly across different browsers and operating systems
- Some older browsers may not support all CSS animations

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [Create React App](https://create-react-app.dev/)
- Fonts from [Google Fonts](https://fonts.google.com/)
- Original Tic-Tac-Toe logic based on React tutorial

## 🎉 Have Fun!

Enjoy this spooky twist on a classic game! Perfect for Halloween parties or just getting into the spooky spirit! 🦇🕸️

---

**Happy Halloween! 🎃👻🕷️**