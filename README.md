# Secret Santa Shuffler

## What is this?

Secret Santa Shuffler is a simple web application for organising Secret Santa gift exchanges! Add players and use the exclusion rules to generate random gift-giving pairs, ensuring that everyone is paired fairly while respecting your preferences.

## Features

### Player Management

- **Add Players, edit & remove players**: Easily manage your list of participants

### Pair Generation

- **Random Matching**: Creates fair, circular pairings where everyone gives and receives exactly one gift
- **Quick & Easy**: Just click "Generate pairs" and you're done!
- **Respects Rules**: Takes into account any exclusion conditions you've set

### Exclusion Conditions

- **Set Rules**: Specify who should NOT be paired together
  - Great for couples who live together
  - Family members who already exchange gifts
  - People who already know what they're getting
- **Easy Selection**: Simple interface to pick which pairs to exclude
- **Available for 3+ Players**: Exclusion rules appear when you have more than 2 players

### Automatic Saving

- **Never Lose Your Setup**: All your players, conditions, and pairs are automatically saved into your browser's cache

## How to Use

1. **Add Your Players**
   - Type each participant's name in the input field
   - Click "Add" or press Enter
   - Repeat until everyone is added

2. **Set Exclusion Rules (Optional)**
   - If you have 3 or more players, you'll see a "Set condition" button for each player
   - Click it to select who that person should NOT be paired with
   - Useful for couples, family members, or close friends

3. **Generate Pairs**
   - Click the "Generate pairs" button
   - The app randomly assigns everyone a gift recipient
   - Each assignment appears in the right column

4. **Share the Results**
   - Click "Copy" next to any pair to get a message to send to the giver
   - Send each person their assignment privately
   - Keep the secret in Secret Santa!

5. **Start Over (If Needed)**
   - Click "Clear pairs" to generate a new random assignment
   - Or "Clear all" to start completely fresh with new players

## Getting Started

### Direct access

[https://ffrancon.github.io/secretSantaShuffler](https://ffrancon.github.io/secretSantaShuffler)

### Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and go to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Tech Stack

Built with:

- **React**
- **TypeScript**
- **Vite**
- **Tailwind CSS**

## Things to Note

- **Minimum Players**: You need at least 2 players to generate pairs
- **Exclusion Limits**: The app tries up a certain number of times to find valid pairings with your exclusion rules. If you have too many exclusions, it might not find a solution.
- **Circular Pairing**: Everyone gives to exactly one person and receives from exactly one person, forming a complete circle
- **Privacy**: All data stays in your browser - nothing is sent to any server

## License

This project is open source and available for personal use.

---

Made with care to make your Secret Santa celebrations easier and more fun!
