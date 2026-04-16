# BPP Calculator

A web tool for calculating **Bits Per Pixel (BPP)** of an image at a given display resolution.

**Live:** https://bpp-calculator.vercel.app/

## Why this exists

Starting with **Chrome 112** (April 2023), Google changed how [Largest Contentful Paint (LCP)](https://chromium.googlesource.com/chromium/src/+/refs/heads/main/docs/speed/metrics_changelog/2023_04_lcp.md) handles low-entropy images: any image with **less than 0.05 BPP** is excluded from LCP measurement entirely.

This means large background images, simple placeholders, and low-detail overlays no longer count as LCP candidates — which can significantly shift your LCP score up or down depending on what was being measured before.

BPP Calculator lets you quickly check whether a specific image at a given render size crosses the 0.05 BPP threshold, so you can understand how Chrome will treat it in LCP scoring.

## What it does

Upload any image — the calculator shows you:

- **BPP** — how many bits per pixel the file takes at the current render size
- **File size** — actual size on disk
- **Render size** — the display resolution used in the BPP calculation (editable)
- **Original vs render preview** — side-by-side canvas comparison

You can change the render width/height manually or lock the aspect ratio to scale proportionally.

**Formula:** `BPP = (file size in bits) / (render width × render height)`

## Tech stack

- React 18 + TypeScript
- Vite
- SCSS Modules
- Vercel (hosting, analytics, speed insights)

## Local development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```