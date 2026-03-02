import React from 'react';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import classnames from 'classnames';

interface FeatureCardAttributes {
  imageUrl: string;
  imageAlt: string;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  backgroundColor: 'cream' | 'charcoal' | 'aqua';
}

interface SaveProps {
  attributes: FeatureCardAttributes;
}

export default function save({ attributes }: SaveProps) {
  const { imageUrl, imageAlt, title, description, buttonText, buttonUrl, backgroundColor } =
    attributes;

  const blockProps = useBlockProps.save({
    className: classnames('wp-block-feature-cards-card', `bg-${backgroundColor}`),
  });

  return (
    <article {...blockProps}>
      {imageUrl && (
        <div className="wp-block-feature-cards-card__image-wrapper">
          <img src={imageUrl} alt={imageAlt} className="wp-block-feature-cards-card__image" />
        </div>
      )}

      <div className="wp-block-feature-cards-card__content">
        {title && (
          <RichText.Content
            tagName="h3"
            className="wp-block-feature-cards-card__title"
            value={title}
          />
        )}

        {description && (
          <RichText.Content
            tagName="p"
            className="wp-block-feature-cards-card__description"
            value={description}
          />
        )}

        {buttonUrl && buttonText && (
          <a
            href={buttonUrl}
            className="wp-block-feature-cards-card__button"
            rel="noopener noreferrer"
          >
            {buttonText}
          </a>
        )}
      </div>
    </article>
  );
}
