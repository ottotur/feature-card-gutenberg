<?php
/**
 * Main template file
 * 
 * Minimal template for displaying content
 */

get_header();

if ( have_posts() ) :
	while ( have_posts() ) :
		the_post();
		?>
		<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
			<header class="entry-header">
				<?php the_title( '<h1 class="entry-title">', '</h1>' ); ?>
			</header>

			<div class="entry-content">
				<?php the_content(); ?>
			</div>
		</article>
		<?php
	endwhile;
else :
	?>
	<p><?php esc_html_e( 'No content found.', 'feature-cards-theme' ); ?></p>
	<?php
endif;

get_footer();
