import React, { FunctionComponent } from 'react';
import cn from 'classnames';
import { SlideShowItem } from '../SlideShow';
import styles from './Thumbnails.module.scss';
import Thumbnail from './Thumbnail';

const widthPercent = (numCols: number, maxNumCols: number) =>
  `${Math.ceil(100 / Math.min(numCols, maxNumCols))}%`;

interface ThumbnailsProps {
  images: SlideShowItem[];
  activeIndex?: number;
  overflow?: boolean;
  onClick?: (index: number) => any;
}

const Thumbnails: FunctionComponent<ThumbnailsProps> = ({
  images,
  activeIndex,
  overflow,
  onClick,
}) => (
  <div
    className={cn(styles.thumbnail, {
      [styles.thumbnailOverflow]: overflow,
    })}
  >
    {images?.map((image, index) => (
      <Thumbnail
        image={image}
        active={activeIndex === index}
        onClick={() => onClick && onClick(index)}
        style={{ width: widthPercent(images?.length, 10) }}
        key={image.src}
      />
    ))}
  </div>
);

export default Thumbnails;
