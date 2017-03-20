import React from 'react';

import {
  FormGroup,
  ControlLabel,
  FormControl,
  HelpBlock,
} from 'react-bootstrap';

function ValidateLinkInput({ id, validationState, onLinkChange, help, ...props }) {
  return (
    <FormGroup controlId={id} validationState={validationState}>
      <FormControl onChange={onLinkChange} {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default ValidateLinkInput;
