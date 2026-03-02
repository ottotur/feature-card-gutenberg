import React from 'react';
import {
  useBlockProps,
  RichText,
  MediaUpload,
  MediaUploadCheck,
  InspectorControls,
} from '@wordpress/block-editor';
import { PanelBody, Button, TextControl, RadioControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { upload } from '@wordpress/icons';
import classnames from 'classnames';
import './style.css';

interface FeatureCardAttributes {
  imageUrl: string;
  imageAlt: string;
  imageId?: number;
  title: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  backgroundColor: 'cream' | 'charcoal' | 'aqua';
}

interface EditProps {
  attributes: FeatureCardAttributes;
  setAttributes: (attributes: Partial<FeatureCardAttributes>) => void;
}

interface MediaObject {
  url: string;
  alt: string;
  id: number;
}

export default function Edit({ attributes, setAttributes }: EditProps) {
  const { imageUrl, imageAlt, title, description, buttonText, buttonUrl, backgroundColor } =
    attributes;

  const blockProps = useBlockProps({
    className: classnames('wp-block-feature-cards-card', `bg-${backgroundColor}`),
  });

  const onSelectImage = (media: MediaObject) => {
    setAttributes({
      imageUrl: media.url,
      imageAlt: media.alt || '',
      imageId: media.id,
    });
  };

  const onRemoveImage = () => {
    setAttributes({
      imageUrl: '',
      imageAlt: '',
      imageId: undefined,
    });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Card Settings', 'feature-cards')}>
          <RadioControl
            label={__('Background Color', 'feature-cards')}
            selected={backgroundColor}
            options={[
              { label: __('Cream (Light)', 'feature-cards'), value: 'cream' },
              { label: __('Charcoal (Dark)', 'feature-cards'), value: 'charcoal' },
              { label: __('Aqua (Accent)', 'feature-cards'), value: 'aqua' },
            ]}
            onChange={(value) =>
              setAttributes({ backgroundColor: value as 'cream' | 'charcoal' | 'aqua' })
            }
          />
          <TextControl
            label={__('Button URL', 'feature-cards')}
            value={buttonUrl}
            onChange={(value) => setAttributes({ buttonUrl: value })}
            placeholder="https://example.com"
            type="url"
          />
          <TextControl
            label={__('Image Alt Text', 'feature-cards')}
            value={imageAlt}
            onChange={(value) => setAttributes({ imageAlt: value })}
            help={__('Describe the image for accessibility', 'feature-cards')}
          />
        </PanelBody>
      </InspectorControls>

      <article {...blockProps}>
        <MediaUploadCheck>
          <div className="wp-block-feature-cards-card__image-wrapper">
            {imageUrl ? (
              <>
                <img
                  src={imageUrl}
                  alt={imageAlt}
                  className="wp-block-feature-cards-card__image"
                />
                <Button
                  onClick={onRemoveImage}
                  isDestructive
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    zIndex: 10,
                  }}
                >
                  {__('Remove', 'feature-cards')}
                </Button>
              </>
            ) : (
              <MediaUpload
                onSelect={onSelectImage}
                allowedTypes={['image']}
                value={attributes.imageId}
                render={({ open }) => (
                  <div className="wp-block-feature-cards-card__placeholder">
                    <Button onClick={open} icon={upload} variant="primary">
                      {__('Upload Image', 'feature-cards')}
                    </Button>
                  </div>
                )}
              />
            )}
          </div>
        </MediaUploadCheck>

        <div className="wp-block-feature-cards-card__content">
          <RichText
            tagName="h3"
            className="wp-block-feature-cards-card__title"
            value={title}
            onChange={(value) => setAttributes({ title: value })}
            placeholder={__('Card Title', 'feature-cards')}
            allowedFormats={[]}
          />

          <RichText
            tagName="p"
            className="wp-block-feature-cards-card__description"
            value={description}
            onChange={(value) => setAttributes({ description: value })}
            placeholder={__('Add a description...', 'feature-cards')}
            allowedFormats={['core/bold', 'core/italic']}
          />

          <RichText
            tagName="span"
            className="wp-block-feature-cards-card__button"
            value={buttonText}
            onChange={(value) => setAttributes({ buttonText: value })}
            placeholder={__('Button Text', 'feature-cards')}
            allowedFormats={[]}
          />
        </div>
      </article>
    </>
  );
}
