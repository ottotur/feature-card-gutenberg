import React from 'react';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import './style.css';

interface FeatureGridAttributes {
  columns: number;
  gap: 'small' | 'medium' | 'large';
}

interface EditProps {
  attributes: FeatureGridAttributes;
  setAttributes: (attributes: Partial<FeatureGridAttributes>) => void;
}

const ALLOWED_BLOCKS = ['feature-cards/card'];

export default function Edit({ attributes, setAttributes }: EditProps) {
  const { columns, gap } = attributes;

  const blockProps = useBlockProps({
    className: classnames(
      'wp-block-feature-cards-grid',
      'grid',
      'grid-cols-1',
      'md:grid-cols-2',
      {
        'lg:grid-cols-2': columns === 2,
        'lg:grid-cols-3': columns === 3,
        'lg:grid-cols-4': columns === 4,
      },
      `gap-${gap}`
    ),
  });

  const innerBlocksProps = useInnerBlocksProps(blockProps, {
    allowedBlocks: ALLOWED_BLOCKS,
    template: [
      ['feature-cards/card'],
      ['feature-cards/card'],
      ['feature-cards/card'],
    ],
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Grid Settings', 'feature-cards')}>
          <SelectControl
            label={__('Number of Columns (Desktop)', 'feature-cards')}
            value={columns.toString()}
            options={[
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
            ]}
            onChange={(value) => setAttributes({ columns: parseInt(value as string, 10) })}
            help={__(
              'On mobile: 1 column. On tablet: 2 columns. On desktop: your selection.',
              'feature-cards'
            )}
          />
          <SelectControl
            label={__('Gap Size', 'feature-cards')}
            value={gap}
            options={[
              { label: __('Small', 'feature-cards'), value: 'small' },
              { label: __('Medium', 'feature-cards'), value: 'medium' },
              { label: __('Large', 'feature-cards'), value: 'large' },
            ]}
            onChange={(value) => setAttributes({ gap: value as 'small' | 'medium' | 'large' })}
          />
        </PanelBody>
      </InspectorControls>
      <div {...innerBlocksProps} />
    </>
  );
}
