# Viviane's Journey

An atmospheric opening scene for a small, chapter-based birthday adventure.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Included journey and Earth model

The Earth GLB and the full five-world mini-game journey are now included. The landing CTA opens `/journey`, which plays the experience from the provided game repository.

To use another Earth model later, copy `.env.example` to `.env.local`, set `NEXT_PUBLIC_EARTH_MODEL_URL` to its public URL, and restart the dev server.

The primary CTA deliberately keeps the surprise hidden for the next chapter.
