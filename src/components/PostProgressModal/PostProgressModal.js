import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './PostProgressModal.css';

import {
  Modal,
  ProgressBar,
} from 'react-bootstrap';

function PostProgressModal({ show, progress, fileCount, ...props }) {
  return (
    <Modal show={show}>
      <Modal.Body>
        <ProgressBar bsStyle="warning" now={progress} label={`${progress}%`} />
        Uploading {fileCount} images...
      </Modal.Body>
    </Modal>
  );
}

export default withStyles(s)(PostProgressModal);
