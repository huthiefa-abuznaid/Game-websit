# Website Game

EduGames24 is a bilingual educational-games catalog built with React and Vite. It includes Arabic RTL and English LTR interfaces, filters for 60 games, game detail pages with the supplied JPG artwork, and student, teacher, and school sign-in/registration previews.

## Run locally

```sh
npm install
npm run dev
```

Open the preview at `http://127.0.0.1:5173/preview.html`.

## Build

```sh
npm run build
```

## Routes

- `preview.html` — homepage and game catalog
- `game.html?id=1` — details for a game (IDs 1–60)
- `login.html` — sign-in preview; supports `?role=student`, `?role=teacher`, or `?role=school`
- `register.html` — registration preview

## Preview limitations

Authentication and registration are front-end previews and are not connected to a backend. The game pages display artwork and details; playable game content and real leaderboard data are not included.

The game artwork is included under `EduGames24_Game_Icons_JPG/`. No license is declared by this repository.
