# TicTacToe — Frontend

A real-time multiplayer Tic-Tac-Toe client built with React, TypeScript, and Capacitor. It runs as a progressive web app (PWA) in the browser and as a native Android app distributed through the Play Store.

> **Backend:** Real-time synchronization is handled by the companion [TicTacToe_backend](https://github.com/Ahmed-Nehad/TicTacToe_backend) — a Socket.io server that relays moves and manages matchmaking.

---

## Table of Contents

- [Features](#features)
- [Game Modes](#game-modes)
- [Architecture](#architecture)
  - [Capacitor & Native Integration](#capacitor--native-integration)
  - [React State & Game Logic](#react-state--game-logic)
- [Dependencies](#dependencies)
- [Local Development](#local-development)
- [Backend Integration](#backend-integration)
- [Play Store Deployment Checklist](#play-store-deployment-checklist)
- [License](#license)

---

## Features

- **Real-Time Multiplayer** — Live matchmaking and move synchronization via Socket.io.
- **Single-Player Mode** — Play against an AI opponent with adjustable difficulty (Easy / Mid / Hard / Impossible).
- **Cross-Platform Delivery** — Ships as a browser-based PWA and a native Android app via Capacitor.
- **Optimistic UI Updates** — Local state updates immediately on move, independent of network latency.
- **Reconnection Handling** — Game state re-syncs automatically after a dropped connection.
- **Native Device Integration** — Haptics, preferences storage, status bar, keyboard, and toast support through Capacitor plugins.
- **Monetization Ready** — AdMob interstitial ad integration included out of the box.

---

## Game Modes

| Mode | Component | Description |
|--------|-------------|---------------|
| **Single Player** | `Board.tsx` + `AI.ts` | Play against an AI with adjustable difficulty (Easy / Mid / Hard / Impossible). |
| **Online Multiplayer** | `OnlineBoard.tsx` | Real-time matchmaking via Socket.io. |

---

## Architecture

### Capacitor & Native Integration

Capacitor turns the React web app into a native Android application.

| File | Purpose |
|--------|-----------|
| `capacitor.config.ts` | App ID (`com.X_and_O`), name (`X&O`), web directory (`build`), and Android scheme. |
| `ionic.config.json` | Integrates Capacitor with the Ionic CLI. |
| `public/manifest.webmanifest` | PWA manifest with icons for all screen sizes. |

**Android Build & Play Store**

1. **Build the web app**
   ```bash
   npm run build
   ```
2. **Sync with Capacitor**
   ```bash
   npx cap sync android
   ```
3. **Open in Android Studio**
   ```bash
   npx cap open android
   ```
4. **Generate a signed APK / App Bundle**
   Use Android Studio's **Build → Generate Signed Bundle / APK**.
5. **Upload to Play Store**
   Upload the `.aab` file to the Google Play Console and complete the store listing.

### React State & Game Logic

The app uses React hooks (`useState`, `useEffect`, `useRef`) for local state management and optimistic updates for low-latency multiplayer.

**Key State Hooks**

| Hook | Purpose |
|--------|-----------|
| `board` | 9-element array representing the game grid (`''`, `'X'`, or `'O'`). |
| `scores` | `[player1Score, player2Score]`. |
| `winner` | Winning line indices (used for highlighting). |
| `canPlay` / `myturn` | `useRef` booleans that prevent double-moves during network delays. |
| `lastVal` | Tracks whose turn it is (`'X'` or `'O'`). |

**Move Flow (Online Mode)**

```ts
const setValue = (pos: number, ig = false) => {
  if ((canPlay.current && myturn.current) || ig) {
    // 1. Update local board immediately (optimistic)
    setBoard(prev => { ... });
    // 2. Send move to server (unless this is an incoming sync)
    !ig && socketData.socket.emit('move', { pos, id: socketData.id });
    // 3. Toggle turn
    lastVal.current = lastVal.current === 'X' ? 'O' : 'X';
    myturn.current = !myturn.current;
    canPlay.current = myturn.current;
  }
};
```

Incoming moves from the opponent are processed via the `updateGame` event, which calls `setValue(pos, true)` to apply the move without re-emitting.

**Win / Draw Detection**

The `check()` function scans rows, columns, and diagonals for three in a row. On a win or draw:
- The game sound plays.
- Coins are awarded via `addCoins()` (stored with `@capacitor/preferences`).
- The board resets after 2 seconds.

---

## Dependencies

Key packages used in this project:

| Package | Purpose |
|-----------|-----------|
| `react` / `react-dom` | UI framework. |
| `socket.io-client` | Real-time communication with the backend. |
| `@capacitor/*` | Native bridge (Android, Preferences, Haptics, Keyboard, Status Bar, Toast). |
| `capacitor-admob-ads` | AdMob integration for interstitial ads. |
| `use-sound` | Audio playback for clicks and game-over events. |
| `tailwindcss` | Utility-first CSS styling. |

---

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## Backend Integration

The frontend connects to the live backend at:

`https://tictactoe-backend-kvgn.onrender.com`

**Socket events:**
- `join` — Player joins matchmaking.
- `ready` — Game starts, opponent details received.
- `move` — Send a move to the opponent.
- `updateGame` — Receive the opponent's move.
- `re` — Re-sync on reconnection.
- `dis` — Opponent disconnected.

For full backend details, see the [TicTacToe_backend README](https://github.com/Ahmed-Nehad/TicTacToe_backend).

---

## Play Store Deployment Checklist

- [ ] Update `appId` and `appName` in `capacitor.config.ts`.
- [ ] Generate icons in `icons/` and reference them in `manifest.webmanifest`.
- [ ] Run `npm run build` and `npx cap sync android`.
- [ ] Test on a physical device or emulator (`npx cap open android`).
- [ ] Generate a signed release build in Android Studio.
- [ ] Upload the `.aab` to Google Play Console.
- [ ] Complete store listing (description, screenshots, content rating).
---

## License

ISC — see the [LICENSE](https://github.com/Ahmed-Nehad/TicTacToe?tab=ISC-1-ov-file) file for details.
