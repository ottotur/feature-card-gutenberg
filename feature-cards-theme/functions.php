<?php
/**
 * Feature Cards Theme Functions
 * 
 * Registers custom Gutenberg blocks for Feature Cards
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue theme styles
 */
function feature_cards_theme_enqueue_styles() {
	// Enqueue the WordPress theme header file (required for theme detection)
	wp_enqueue_style(
		'feature-cards-theme-header',
		get_stylesheet_uri(),
		array(),
		wp_get_theme()->get( 'Version' )
	);
	
	// Enqueue the built Tailwind CSS from theme's assets directory
	$theme_css_path = get_template_directory() . '/assets/theme.css';
	if ( file_exists( $theme_css_path ) ) {
		wp_enqueue_style(
			'feature-cards-theme-style',
			get_template_directory_uri() . '/assets/theme.css',
			array(),
			filemtime( $theme_css_path )
		);
	}
}
add_action( 'wp_enqueue_scripts', 'feature_cards_theme_enqueue_styles' );

/**
 * Theme setup
 */
function feature_cards_theme_setup() {
	// Add support for block styles
	add_theme_support( 'wp-block-styles' );
	
	// Add support for editor styles
	add_theme_support( 'editor-styles' );
	
	// Add editor stylesheet
	add_editor_style( 'assets/editor.css' );
	
	// Add support for full and wide align
	add_theme_support( 'align-wide' );
	
	// Add support for responsive embeds
	add_theme_support( 'responsive-embeds' );
	
	// Add title tag support
	add_theme_support( 'title-tag' );
}
add_action( 'after_setup_theme', 'feature_cards_theme_setup' );
