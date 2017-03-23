import React, { PropTypes } from 'react';

import {
  FormGroup,
  FormControl,
} from 'react-bootstrap';

function ValidateLinkInput({ id, validationState, handleLinkChange, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl onChange={handleLinkChange} {...props} />
    </FormGroup>
  );
}

ValidateLinkInput.propTypes = {
  id: PropTypes.string.isRequired,
  handleLinkChange: PropTypes.func.isRequired,
};

export default ValidateLinkInput;
