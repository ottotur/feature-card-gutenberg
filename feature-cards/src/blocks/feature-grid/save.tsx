import React from 'react';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import classnames from 'classnames';

interface FeatureGridAttributes {
  columns: number;
  gap: 'small' | 'medium' | 'large';
}

interface SaveProps {
  attributes: FeatureGridAttributes;
}

export default function save({ attributes }: SaveProps) {
  const { columns, gap } = attributes;

  const blockProps = useBlockProps.save({
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

  const innerBlocksProps = useInnerBlocksProps.save(blockProps);

  return <div {...innerBlocksProps} />;
}
