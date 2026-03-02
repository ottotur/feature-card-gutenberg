<?php
/**
 * Sample Content Generator for Feature Cards
 * 
 * Creates a demo page with Feature Grid and Feature Cards
 * for testing the block functionality.
 */

// Check if we're in WordPress environment
if (!function_exists('wp_insert_post')) {
    echo "Error: This script must be run from WordPress context\n";
    exit(1);
}

// Check if sample page already exists
$existing_page = get_page_by_title('Feature Cards Theme Demo', OBJECT, 'page');
if ($existing_page) {
    echo "Sample content already exists (Page ID: {$existing_page->ID})\n";
    echo "Visit: " . get_permalink($existing_page->ID) . "\n";
    exit(0);
}

// Sample block content with Feature Grid and Feature Cards
$blocks_content = <<<'BLOCKS'
<!-- wp:paragraph -->
<p>This is a minimal WordPress theme showcasing custom Gutenberg blocks for Feature Cards. Below is a sample Feature Grid with three cards.</p>
<!-- /wp:paragraph -->

<!-- wp:feature-cards/grid -->
<div class="wp-block-feature-cards-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-medium">

<!-- wp:feature-cards/card {"title":"Easy to Use","description":"Create beautiful feature cards with our intuitive block editor interface. No coding required.","buttonText":"Click here","buttonUrl":"#"} -->
<article class="wp-block-feature-cards-card bg-cream"><div class="wp-block-feature-cards-card__content"><h3 class="wp-block-feature-cards-card__title">Easy to Use</h3><p class="wp-block-feature-cards-card__description">Create beautiful feature cards with our intuitive block editor interface. No coding required.</p><a href="#" class="wp-block-feature-cards-card__button" rel="noopener noreferrer">Click here</a></div></article>
<!-- /wp:feature-cards/card -->

<!-- wp:feature-cards/card {"title":"Fully Responsive","description":"Your feature cards look great on all devices, from mobile phones to desktop computers.","buttonText":"View Demo","buttonUrl":"#","backgroundColor":"charcoal"} -->
<article class="wp-block-feature-cards-card bg-charcoal"><div class="wp-block-feature-cards-card__content"><h3 class="wp-block-feature-cards-card__title">Fully Responsive</h3><p class="wp-block-feature-cards-card__description">Your feature cards look great on all devices, from mobile phones to desktop computers.</p><a href="#" class="wp-block-feature-cards-card__button" rel="noopener noreferrer">View Demo</a></div></article>
<!-- /wp:feature-cards/card -->

<!-- wp:feature-cards/card {"title":"Customizable","description":"Choose from three color schemes and configure grid layouts to match your brand perfectly.","buttonText":"Get Started","buttonUrl":"#","backgroundColor":"aqua"} -->
<article class="wp-block-feature-cards-card bg-aqua"><div class="wp-block-feature-cards-card__content"><h3 class="wp-block-feature-cards-card__title">Customizable</h3><p class="wp-block-feature-cards-card__description">Choose from three color schemes and configure grid layouts to match your brand perfectly.</p><a href="#" class="wp-block-feature-cards-card__button" rel="noopener noreferrer">Get Started</a></div></article>
<!-- /wp:feature-cards/card -->
</div>
<!-- /wp:feature-cards/grid -->
<!-- wp:heading {"level":2} -->
<h2 class="wp-block-heading">Getting Started</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>To add more feature cards to your page:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul>
<li>Click the + button to add a new block</li>
<li>Search for "Feature Grid"</li>
<li>Add Feature Card blocks inside the grid</li>
<li>Customize each card with images, titles, descriptions, and buttons</li>
</ul>
<!-- /wp:list -->
BLOCKS;

// Create the demo page
$page_data = array(
    'post_title'    => 'Feature Cards Theme Demo',
    'post_content'  => $blocks_content,
    'post_status'   => 'publish',
    'post_type'     => 'page',
    'post_author'   => 1,
    'comment_status' => 'closed',
    'ping_status'   => 'closed',
);

$page_id = wp_insert_post($page_data);

if (is_wp_error($page_id)) {
    echo "Error creating sample page: " . $page_id->get_error_message() . "\n";
    exit(1);
}

// Set as front page
update_option('show_on_front', 'page');
update_option('page_on_front', $page_id);

echo "✅ Sample content created successfully!\n";
echo "🏠 Set as front page\n";
echo "📄 Page ID: {$page_id}\n";
echo "🔗 View at: " . get_permalink($page_id) . "\n";
echo "\n";
echo "Login credentials:\n";
echo "  Username: admin\n";
echo "  Password: password\n";
echo "\n";
echo "🎨 The demo page includes instructions for using Feature Cards blocks.\n";
echo "Add Feature Grid blocks with Feature Card children through the block editor.\n";
