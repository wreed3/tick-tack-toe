# Tic-Tac-Toe Game

A classic Tic-Tac-Toe game built with React, featuring a clean UI, game state management, and win detection.

## Features

- 🎮 Interactive 3x3 game board
- 👥 Two-player gameplay (X and O)
- 🏆 Automatic win detection (rows, columns, diagonals)
- 🤝 Draw detection when board is full
- 🔄 Reset button to start a new game
- 💅 Clean, modern UI with hover effects
- 📱 Responsive design

## Technologies Used

- **React** - UI framework
- **JavaScript (ES6+)** - Game logic
- **CSS3** - Styling and animations
- **Create React App** - Project setup and build tools

## Project Structure

```
src/
├── game.js       # Core game logic (win detection, move validation)
├── App.js        # Main React component
├── App.css       # Styling
└── index.js      # Entry point
public/
└── index.html    # HTML template
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
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

## How to Play

1. The game starts with Player X
2. Click on any empty square to place your mark
3. Players alternate turns (X and O)
4. First player to get 3 marks in a row (horizontally, vertically, or diagonally) wins
5. If all squares are filled with no winner, the game is a draw
6. Click "Reset Game" to start a new game

## Game Logic

The game uses a pure JavaScript module (`game.js`) that handles:
- **Board state management** - Tracks the 3x3 grid
- **Move validation** - Ensures moves are legal
- **Win detection** - Checks all possible winning combinations
- **Draw detection** - Identifies when the board is full

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## Future Enhancements

Potential improvements for the game:
- 🤖 AI opponent with difficulty levels
- 📊 Score tracking across multiple games
- ⏱️ Move timer
- 🎨 Theme customization
- 💾 Save game state to localStorage
- 🎵 Sound effects
- 🏅 Player name input

## License

This project is open source and available under the MIT License.