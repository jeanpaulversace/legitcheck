import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PostImage.css';

import {
  Image,
} from 'react-bootstrap';

function PostImage({ src, onImageCloseButtonClick, ...props }) {
  return (
    <div className={s.imgWrap}>
      <span className={s.close} onClick={onImageCloseButtonClick} >&times;</span>
      <Image src={src} thumbnail />
    </div>
  );
}

export default withStyles(s)(PostImage);
