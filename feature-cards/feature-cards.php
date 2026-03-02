<?php
/**
 * Plugin Name: Feature Cards
 * Plugin URI: https://github.com/yourusername/feature-cards
 * Description: Custom Gutenberg blocks for creating responsive feature card grids. Built with React, TypeScript, and Tailwind CSS.
 * Version: 1.0.0
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * Author: Your Name
 * Author URI: https://yourwebsite.com
 * License: GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: feature-cards
 * Domain Path: /languages
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Check WordPress and PHP version requirements
 */
function feature_cards_check_requirements() {
	global $wp_version;
	
	$required_wp_version = '6.0';
	$required_php_version = '7.4';
	
	if ( version_compare( $wp_version, $required_wp_version, '<' ) ) {
		add_action( 'admin_notices', function() use ( $required_wp_version ) {
			echo '<div class="error"><p>';
			printf(
				__( 'Feature Cards requires WordPress %s or higher. Please update WordPress.', 'feature-cards' ),
				$required_wp_version
			);
			echo '</p></div>';
		});
		return false;
	}
	
	if ( version_compare( PHP_VERSION, $required_php_version, '<' ) ) {
		add_action( 'admin_notices', function() use ( $required_php_version ) {
			echo '<div class="error"><p>';
			printf(
				__( 'Feature Cards requires PHP %s or higher. Your current PHP version is %s. Please update PHP.', 'feature-cards' ),
				$required_php_version,
				PHP_VERSION
			);
			echo '</p></div>';
		});
		return false;
	}
	
	return true;
}

/**
 * Register Feature Grid Block
 */
function feature_cards_register_grid_block() {
	if ( ! feature_cards_check_requirements() ) {
		return;
	}
	
	register_block_type( plugin_dir_path( __FILE__ ) . 'build/blocks/feature-grid' );
}
add_action( 'init', 'feature_cards_register_grid_block' );

/**
 * Register Feature Card Block
 */
function feature_cards_register_card_block() {
	if ( ! feature_cards_check_requirements() ) {
		return;
	}
	
	register_block_type( plugin_dir_path( __FILE__ ) . 'build/blocks/feature-card' );
}
add_action( 'init', 'feature_cards_register_card_block' );
