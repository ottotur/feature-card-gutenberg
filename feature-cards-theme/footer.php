	</main><!-- #main -->
	
	<footer class="site-footer">
		<div class="site-footer__container">
			<p class="site-footer__text">
				&copy; <?php echo esc_html( date_i18n( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>.
				<?php esc_html_e( 'Powered by', 'feature-cards-theme' ); ?> 
				<a href="<?php echo esc_url( __( 'https://wordpress.org/', 'feature-cards-theme' ) ); ?>" class="hover:text-gray-900 transition-colors">
					WordPress
				</a>
			</p>
		</div>
	</footer>
</div><!-- #page -->

<?php wp_footer(); ?>
</body>
</html>
