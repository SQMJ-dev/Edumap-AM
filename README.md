# EduMap: Sejarah — Prototype (view only)

React + Tailwind (v4) + Vite. Data lives in `src/data/spots.js`; no database or server.

## Run
    npm install
    npm run dev        # local dev server
    npm run build      # writes ONE file: dist/index.html

## Deploy (static)
Upload `dist/index.html` to Netlify / Vercel / Cloudflare Pages / GitHub Pages, or put it
as `index.html` in the web folder of a static site on a Forge server.

## Structure
- `src/data/spots.js` – sample spots (content + place + date)
- `src/components/MapView.jsx` – sketch map with markers
- `src/components/Timeline.jsx` – slider, play button, event pips
- `src/components/DetailPanel.jsx` – facts and Glosari for the active spot
- Next: Tokoh template (profile + life timeline)

## Pictures
Put image files in `public/images/`, then in `src/data/spots.js` add a line such as
`IMG(niah, 'niah-caves.jpg', 'Gua Niah di Sarawak', 'Foto: ...')` after the spot is defined.
When hosting, upload the `images` folder next to `index.html`. A missing file falls back to the grey placeholder.

The same `IMG(...)` line works for a person (`IMG(tunPerak, ...)`, shown as a round portrait) and for a Konsep card (`IMG(agong.cards[0], ...)`).
