import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Post.css';

import {
  Grid,
  Row,
  Col,
  Button,
  PageHeader,
  Alert,
} from 'react-bootstrap';

import Dropzone from 'react-dropzone';
import TagsInput from 'react-tagsinput';

import ValidateLinkInput from '../../components/ValidateLinkInput';
import PostImage from '../../components/PostImage';
import PostProgressModal from '../../components/PostProgressModal';

const validationRegex = new RegExp(/[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi);

class Post extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      filesMessage: '',
      tagsMessage: '',
      linkMessage: '',
    };
  }

  // react-dropzone
  onOpenClick = () => {
    this.dropzone.open();
  }

  // submit handlers
  handleBadSubmit = (evt) => {
    evt.preventDefault();

    let filesMessage = '';
    let tagsMessage = '';
    let linkMessage = '';

    if (!(this.props.files.length > 0)) {
      filesMessage = 'You must upload at least one photo';
    }

    if (!(this.props.tags.length > 0)) {
      tagsMessage = 'You must provide at least one tag';
    }

    if (this.state.isLinkValid === 'error') {
      linkMessage = 'You must provide a valid link';
    }

    this.setState({ filesMessage, tagsMessage, linkMessage });
  }

  handlePost = (evt) => {

  }

  // render
  render() {
    const link = this.props.link;
    let validationState = link.match(validationRegex) ? "success" : "error";
    if (link === '') { validationState = null; }
    const images = [];
    const files = this.props.files;
    const tags = this.props.tags;
    const handleSubmit = (files.length > 0 && tags.length > 0 && (this.state.linkValidationState === 'success' || !this.state.linkValidationState)) ? this.handlePost : this.handleEmptySubmit;
    for (let i = files.length - 1; i >= 0; i -= 3) {
      images.push(
        <Row key={i} className={s.row}>
          <Col sm={4} md={4}>
            <PostImage src={files[i].preview} onImageCloseButtonClick={() => this.props.onImageCloseButtonClick(i)} />
          </Col>
          { i - 1 >= 0 && <Col sm={4} md={4}><PostImage src={files[i - 1].preview} onImageCloseButtonClick={() => this.props.onImageCloseButtonClick(i-1)} /></Col> }
          { i - 2 >= 0 && <Col sm={4} md={4}><PostImage src={files[i - 2].preview} onImageCloseButtonClick={() => this.props.onImageCloseButtonClick(i-2)} /></Col> }
        </Row>,
      );
    }
    // <PostProgressModal show={this.state.showModal} progress={this.state.progress} fileCount={files.length} />
    return (
      <div>
        <Grid>
          <Row>
            <Col sm={3} md={3} />
            <Col sm={6} md={6}>
              <PageHeader className={s.pageHeader}>Is It Real Or Fake?</PageHeader>
              { this.state.filesMessage && <Alert bsStyle="danger">{this.state.filesMessage}</Alert> }
              <h3>Photos <small>- upload high-quality, tagged pictures</small></h3>
              <div className={s.dropzone} onClick={this.onOpenClick}>
                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.props.onDrop} accept="image/*" maxSize={1000000}>
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
              </div>
              {files.length > 0 ? <div>{images}</div> : null}
              <form onSubmit={handleSubmit}>
                { this.state.tagsMessage && <Alert bsStyle="danger">{this.state.tagsMessage}</Alert> }
                <div className={s.formGroup}>
                  <h3>Tags <small>- help identify your item - e.g. Nike, AirMax97, SilverBullet</small></h3>
                  <TagsInput value={tags} onChange={this.props.handleTagsChange} maxTags={10} />
                </div>
                { this.state.linkMessage && <Alert bsStyle="danger">{this.state.linkMessage}</Alert> }
                <div className={s.formGroup}>
                  <h3>Link <small>- link to eBay, Grailed, etc. listing</small></h3>
                  <ValidateLinkInput
                    id="link"
                    type="text"
                    name="link"
                    placeholder="e.g. https://www.grailed.com/mygrails/7602"
                    validationState={validationState}
                    handleLinkChange={(evt) => { this.props.handleLinkChange(evt.currentTarget.value); }}
                  />
                </div>
                <div className={s.submit}>
                  <Button bsSize="large" type="submit" block>
                    Post
                  </Button>
                </div>
              </form>
            </Col>
            <Col sm={3} md={3} />
          </Row>
        </Grid>
      </div>
    );
  }
}

Post.propTypes = {
  files: PropTypes.arrayOf(PropTypes.any.isRequired).isRequired,
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  link: PropTypes.string.isRequired,
  // isPosting: PropTypes.bool.isRequired,
  onDrop: PropTypes.func.isRequired,
  onImageCloseButtonClick: PropTypes.func.isRequired,
  handleTagsChange: PropTypes.func.isRequired,
  handleLinkChange: PropTypes.func.isRequired,
};

export default withStyles(s)(Post);
