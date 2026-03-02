# Feature Cards Theme

WordPress theme designed for the Feature Cards plugin with Tailwind CSS styling.

## Project Structure

This is the **theme** containing site-wide styles. It automatically syncs design tokens from shared `src/colors.css` at root.

```
feature-cards-theme/
├── style.css                  # WordPress theme header
├── functions.php              # Theme setup & CSS enqueuing
├── theme.json                 # Block editor config (auto-generated)
├── header.php, footer.php, index.php
├── src/
│   ├── theme.css              # Frontend styles (imports ../../src/colors.css)
│   └── editor.css             # Gutenberg editor styles
├── assets/
│   ├── theme.css              # Compiled frontend CSS
│   └── editor.css             # Compiled editor CSS
└── scripts/
    └── sync-theme-colors.js   # Reads ../../src/colors.css → theme.json
```

## Development

### Prerequisites
- Node.js v20+ (see `.nvmrc` in root)
- npm
- nvm (recommended)
- Docker Desktop (for wp-env)

### Setup (From Root Directory)

**Note:** This theme is part of a monorepo. All commands should be run from the root directory.

```bash
cd ..  # Go to root (feature-card-gutenberg/)
nvm use
npm run install:all

# Start WordPress (builds both plugin and theme)
npm run env:start

# Development with watch mode
npm start  # Watches both plugin and theme
# OR for theme only:
npm run start:theme

# Production build
npm run build  # Builds both
# OR for theme only:
npm run build:theme
```

### Build Process

1. **Pre-build**: `scripts/sync-theme-colors.js` runs automatically
   - Reads `../../src/colors.css` from root
   - Parses RGB color values
   - Generates `theme.json` color palette for Block Editor

2. **Build CSS**: PostCSS compiles:
   - `src/theme.css` → `assets/theme.css` (frontend styles)
   - `src/editor.css` → `assets/editor.css` (Gutenberg editor styles)
   - Both import shared `../../src/colors.css` for Tailwind utilities
   - Processes via `@tailwindcss/postcss` plugin + autoprefixer

## Color System

Colors are defined in **single source of truth** at root:
- Located at `../../src/colors.css` (root level)
- Theme imports this file during build via `@import "../../src/colors.css"`
- Build script auto-generates `theme.json` color palette for Block Editor
- Generates Tailwind utilities (e.g., `bg-cream`)
- Both frontend and editor styles use shared colors

**Custom Colors:**
- **Cream**: `rgb(248, 246, 239)`
- **Charcoal**: `rgb(40, 40, 40)`
- **Aqua**: `rgb(167, 248, 239)`

## Theme Features

- Responsive site header with navigation
- Semantic HTML5 structure
- Content width controls (800px content, 1200px wide)
- Typography styles for all heading levels
- Footer with branding
- Full Block Editor support (Wide/Full alignments, etc.)

## Tech Stack

- **Tailwind CSS v4** - Utility-first styling
- **PostCSS** - CSS processing pipeline
- **Autoprefixer** - Browser compatibility
- **WordPress Block Theme Support** - theme.json configuration

## Companion Plugin

This theme is designed to work with:
- [Feature Cards Plugin](../feature-cards/)

The theme works standalone but is optimized when used together with the plugin for a complete design system.

## Manual Color Sync

If you need to manually sync colors (build does this automatically):

```bash
node scripts/sync-theme-colors.js
```

This is useful if you update `../../src/colors.css` and want to regenerate `theme.json` without a full rebuild.
