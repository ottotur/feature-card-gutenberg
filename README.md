# Feature Cards

A WordPress plugin and paired block theme for building responsive feature card sections in the Block Editor (Gutenberg).

Add a **Feature Grid** block to any page, drop **Feature Cards** inside it, and configure each card with an image, title, description, and call-to-action button — all via the editor sidebar, no code required.

**Features:**
- `feature-cards/grid` block — responsive 2/3/4-column layout with configurable gap
- `feature-cards/card` block — image, title, description, and CTA button per card
- Three brand color options per card: Cream, Charcoal, Aqua
- Live inline editing in the Block Editor
- Shared design token system keeps plugin styles and theme in sync
- Companion block theme with editor styles and auto-generated color palette

## Project Structure

```
feature-card-gutenberg/
├── src/
│   └── colors.css                  # ⭐ Shared design tokens (single source of truth)
├── .wp-env.json                    # Shared WordPress environment
├── package.json                    # Root package with wp-env
├── .nvmrc                          # Node v20
│
├── feature-cards/                  # Plugin (Gutenberg blocks)
│   ├── feature-cards.php
│   ├── package.json                # @wordpress/scripts
│   ├── src/blocks/
│   │   ├── feature-grid/
│   │   └── feature-card/
│   │       └── style.css           # Imports ../../../src/colors.css
│   └── build/blocks/
│
└── feature-cards-theme/            # Theme (site styles)
    ├── functions.php
    ├── package.json                # Tailwind/PostCSS
    ├── src/
    │   ├── theme.css               # Imports ../../src/colors.css
    │   └── editor.css              # Gutenberg editor styles
    ├── assets/
    │   ├── theme.css               # Compiled frontend CSS
    │   └── editor.css              # Compiled editor CSS
    └── scripts/
        └── sync-theme-colors.js    # Reads ../../src/colors.css → theme.json
```

## Quick Start

```bash
# 1. Install all dependencies (root + plugin + theme)
npm run install:all

# 2. Start WordPress environment (builds both automatically)
npm run env:start

# Site: http://localhost:8888
# Admin: http://localhost:8888/wp-admin
# Username: admin
# Password: password
```

## Development

### Watch Mode (Both Projects)
```bash
npm start
# Runs both plugin and theme in watch mode
```

### Build Both
```bash
npm run build
# Builds plugin blocks + theme CSS
```

### Individual Builds
```bash
npm run build:plugin   # Just blocks
npm run build:theme    # Just theme CSS
```

### Individual Watch Mode
```bash
npm run start:plugin   # Watch blocks only
npm run start:theme    # Watch theme CSS only
```

## WordPress Environment

### Start
```bash
npm run env:start
```
- Builds both plugin and theme
- Activates plugin and theme
- Removes default WordPress themes/plugins
- Runs sample content script

### Stop
```bash
npm run env:stop
```

### Clean & Restart
```bash
npm run env:clean      # Delete all data
npm run env:restart    # Stop + Start
```

## How It Works

### Shared Design Tokens
1. **Root** defines colors once in `src/colors.css`
2. **Plugin** blocks import via `@import "../../../src/colors.css"`
3. **Theme** build automatically:
   - Reads shared `../../src/colors.css`
   - Generates theme.json color palette for Block Editor
   - Compiles CSS with Tailwind utilities using shared colors

### Build Process
When you run `npm run env:start`, the lifecycle script:
1. Runs `nvm use` to ensure correct Node version
2. Builds plugin: `cd feature-cards && npm run build`
3. Builds theme: `cd feature-cards-theme && npm run build`
   - Pre-build: Syncs colors from plugin
   - Build: Compiles Tailwind CSS
4. Activates both in WordPress

### Watch Mode
Running `npm start` from root:
- Starts plugin watch: `wp-scripts start` (Webpack)
- Starts theme watch: `postcss --watch`
- Both run concurrently, auto-rebuild on file changes

## Tech Stack

### Plugin
- TypeScript + React
- @wordpress/scripts (Webpack, Babel)
- Tailwind CSS v4

### Theme
- Tailwind CSS v4
- PostCSS + Autoprefixer
- Auto-sync from plugin

### Development
- wp-env (Docker-based local WordPress)
- nvm (Node version management)
- Concurrent watch mode

## Design System

**Colors** (single source of truth at root):
- **Cream**: `rgb(248, 246, 239)`
- **Charcoal**: `rgb(40, 40, 40)`
- **Aqua**: `rgb(167, 248, 239)`

To change colors:
1. Edit `src/colors.css` at root level
2. Rebuild both projects: `npm run build`
3. Blocks and theme now use updated colors

## Folder Details

See individual READMEs:
- [Plugin README](feature-cards/README.md)
- [Theme README](feature-cards-theme/README.md)
