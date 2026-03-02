=== Feature Cards ===
Contributors: yourname
Tags: gutenberg, blocks, feature-cards, grid, responsive
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 1.0.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Custom Gutenberg blocks for creating responsive feature card grids with images, titles, descriptions, and CTA buttons.

== Description ==

Feature Cards provides two custom Gutenberg blocks for building beautiful, responsive feature sections on your WordPress site:

* **Feature Grid** - A flexible container block with configurable columns (2, 3, or 4) and gap sizes
* **Feature Card** - Individual cards with image, title, description, and customizable button

Built with modern technologies:
* React & TypeScript for type-safe development
* Tailwind CSS for utility-first styling
* WordPress Block Editor APIs for native integration
* Mobile-first responsive design

**Key Features:**

* Parent-child block architecture (cards only work inside grid)
* Responsive breakpoints: 1 column (mobile) → 2 columns (tablet) → 2-4 columns (desktop)
* Three preset color schemes: Cream, Charcoal, and Aqua
* 16:9 aspect ratio images with object-fit
* Customizable gap sizes: small, medium, large
* Accessible markup with proper ARIA labels
* No jQuery dependencies - vanilla JavaScript only

== Installation ==

1. Upload the `feature-cards` folder to the `/wp-content/plugins/` directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Create a new page or post
4. Add the "Feature Grid" block from the block inserter
5. Feature Card blocks will be automatically added inside the grid
6. Customize each card with your content

== Frequently Asked Questions ==

= Can I use Feature Cards with any theme? =

Yes! Feature Cards is a standalone plugin that works with any WordPress theme that supports Gutenberg blocks.

= How many columns can I display? =

On desktop, you can choose between 2, 3, or 4 columns. On tablet, it automatically displays 2 columns, and on mobile, it displays 1 column for optimal readability.

= Can I customize the colors? =

The plugin includes three preset color schemes (Cream, Charcoal, Aqua) that you can apply per card. These colors are optimized for accessibility and visual harmony.

= Is the plugin accessible? =

Yes! The plugin follows WordPress accessibility standards, including proper heading hierarchy, image alt text fields, and keyboard navigation support.

= Does it work with Full Site Editing (FSE)? =

Yes, the blocks work in both classic themes and Full Site Editing (block themes).

== Screenshots ==

1. Feature Grid block with three cards in the editor
2. Feature Card customization options in the inspector panel
3. Responsive display on mobile, tablet, and desktop
4. Color scheme variations (Cream, Charcoal, Aqua)

== Changelog ==

= 1.0.0 =
* Initial release
* Feature Grid parent block with column and gap controls
* Feature Card child block with image, title, description, and button
* Three preset color schemes
* Fully responsive design (mobile, tablet, desktop)
* Parent-child block relationship enforcement
* TypeScript and Tailwind CSS integration
* Accessibility features and ARIA support

== Upgrade Notice ==

= 1.0.0 =
Initial release of Feature Cards plugin.

== Developer Notes ==

**Build from Source:**

```bash
# Install dependencies
npm install

# Development with hot reload
npm start

# Production build
npm run build
```

**Requirements:**
* Node.js 20+
* npm or yarn
* WordPress 6.0+
* PHP 7.4+

**Textdomain:** feature-cards

For development documentation, see the project README.md file.
