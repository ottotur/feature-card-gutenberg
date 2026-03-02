#!/usr/bin/env node

/**
 * Sync Theme Colors
 * 
 * This script:
 * 1. Copies src/colors.css from plugin to theme's src/ directory
 * 2. Parses colors from colors.css
 * 3. Generates theme.json color palette for WordPress Block Editor
 * 
 * Run automatically during theme build process (prebuild step)
 */

const fs = require('fs');
const path = require('path');

// Configuration
const PLUGIN_COLORS_PATH = path.resolve(__dirname, '../../feature-cards/src/colors.css');
const THEME_COLORS_PATH = path.resolve(__dirname, '../src/colors.css');
const THEME_JSON_PATH = path.resolve(__dirname, '../theme.json');

// Color name mapping for WordPress theme.json
const COLOR_NAMES = {
  'cream': 'Cream',
  'charcoal': 'Charcoal',
  'aqua': 'Aqua'
};

/**
 * Copy colors.css from plugin to theme
 */
function copyColorsFile() {
  console.log('📋 Copying colors.css from plugin...');
  
  if (!fs.existsSync(PLUGIN_COLORS_PATH)) {
    console.error(`❌ Error: Plugin colors.css not found at ${PLUGIN_COLORS_PATH}`);
    console.error('   Make sure the feature-cards plugin is located at ../feature-cards/');
    process.exit(1);
  }
  
  // Ensure src directory exists
  const srcDir = path.dirname(THEME_COLORS_PATH);
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir, { recursive: true });
  }
  
  fs.copyFileSync(PLUGIN_COLORS_PATH, THEME_COLORS_PATH);
  console.log('✅ Copied colors.css to theme/src/');
}

/**
 * Parse colors from colors.css file
 */
function parseColors(cssContent) {
  const colors = [];
  
  // Match: --color-{name}: rgb(r, g, b);
  const colorRegex = /--color-(\w+):\s*rgb\((\d+),\s*(\d+),\s*(\d+)\)/g;
  let match;
  
  while ((match = colorRegex.exec(cssContent)) !== null) {
    const [, slug, r, g, b] = match;
    colors.push({
      slug,
      color: `rgb(${r}, ${g}, ${b})`,
      name: COLOR_NAMES[slug] || slug.charAt(0).toUpperCase() + slug.slice(1)
    });
  }
  
  return colors;
}

/**
 * Update theme.json with parsed colors
 */
function updateThemeJson(colors) {
  console.log('🎨 Updating theme.json color palette...');
  
  if (!fs.existsSync(THEME_JSON_PATH)) {
    console.error(`❌ Error: theme.json not found at ${THEME_JSON_PATH}`);
    process.exit(1);
  }
  
  // Read existing theme.json
  const themeJson = JSON.parse(fs.readFileSync(THEME_JSON_PATH, 'utf8'));
  
  // Update color palette
  if (!themeJson.settings) themeJson.settings = {};
  if (!themeJson.settings.color) themeJson.settings.color = {};
  themeJson.settings.color.palette = colors;
  
  // Write back with pretty formatting
  fs.writeFileSync(
    THEME_JSON_PATH,
    JSON.stringify(themeJson, null, '\t') + '\n',
    'utf8'
  );
  
  console.log(`✅ Updated theme.json with ${colors.length} colors:`);
  colors.forEach(({ slug, color }) => {
    console.log(`   - ${slug}: ${color}`);
  });
}

/**
 * Main execution
 */
function main() {
  console.log('🚀 Starting theme color sync...\n');
  
  try {
    // Step 1: Copy colors.css from plugin
    copyColorsFile();
    
    // Step 2: Parse colors
    const cssContent = fs.readFileSync(THEME_COLORS_PATH, 'utf8');
    const colors = parseColors(cssContent);
    
    if (colors.length === 0) {
      console.warn('⚠️  Warning: No colors found in colors.css');
      process.exit(0);
    }
    
    // Step 3: Update theme.json
    updateThemeJson(colors);
    
    console.log('\n✨ Theme color sync complete!');
  } catch (error) {
    console.error('\n❌ Error during sync:', error.message);
    process.exit(1);
  }
}

main();
