import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Post.css';

import AWS from '../../core/AWS/AWS';
import fetchWithProgress from '../../core/fetch/fetchWithProgress';

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

  state = {
    files: [],
    tags: [],
    validationState: '',
    showModal: false,
    progress: 0,
  }

  onDrop = (acceptedFiles) => {
    this.setState({ files: this.state.files.concat(acceptedFiles) });
  }

  onOpenClick = () => {
    this.dropzone.open();
  }

  handleTagInputChange = (tags) => {
    this.setState({ tags });
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault();

    let filesMessage = '';
    let tagsMessage = '';
    let linkMessage = '';

    if (!(this.state.files.length > 0)) {
      filesMessage = 'You must upload at least one photo';
    }

    if (!(this.state.tags.length > 0)) {
      tagsMessage = 'You must provide at least one tag';
    }

    if (this.state.linkValidationState === 'error') {
      linkMessage = 'You must provide a valid link';
    }

    this.setState({ filesMessage, tagsMessage, linkMessage });
  }

  handlePost = (evt) => {
    evt.preventDefault();

    const files = this.state.files;
    const formattedFileNames = files.map((file) => {
      const fileNameSplit = file.name.replace(/[^\w\d_\-\.]+/ig, '').split('.');
      return `${fileNameSplit.shift() + Date.now().toString()}.${fileNameSplit.shift()}`;
    });
    const fileNameProgress = {};
    formattedFileNames.map((fileName) => {
      fileNameProgress[AWS.getUploadPreSignedUrl(fileName)] = {
        loaded: 0,
        total: 0,
      };
    });

    function onProgress(url) {
      const _this = this;
      return function (event) {
        const currentProgress = fileNameProgress[url];
        if (currentProgress.total == 0) currentProgress.total = event.total;
        currentProgress.loaded = event.loaded;
        const progresses = Object.values(fileNameProgress);
        const progress = Math.round(progresses.reduce((prev, curr) => ({ loaded: prev.loaded += curr.loaded }), { loaded: 0 }).loaded / progresses.reduce((prev, curr) => ({ total: prev.total += curr.total }), { total: 0 }).total * 100);
        _this.setState({ progress });
      };
    }

    const imageUploadPromises = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const data = new FormData();
      data.append('file', file);
      imageUploadPromises.push(fetchWithProgress(AWS.getUploadPreSignedUrl(formattedFileNames[i]), {
        method: 'PUT',
        body: data,
        headers: {
          'Content-Type': 'binary/octet-stream',
        },
      }, onProgress.bind(this)));
    }

    // const downloadPreSignedUrls = formattedFileNames.map((fileName) => AWS.getDownloadPreSignedUrl(fileName));
    // imageUploadPromises.push(Promise.resolve(1).then(() => {
    //   this.setState({
    //     files: [],
    //     tags: [],
    //     link: '',
    //     filesMessage: '',
    //     tagsMessage: '',
    //     linkMessage: '',
    //     showModal: false,
    //     progress: 0,
    //   });
    // }));

    this.setState({ showModal: true });
    Promise.all(imageUploadPromises).then(() => {
      console.log('All promises have finished!');
    });
  }

  onImageCloseButtonClick = (i) => {
    const files = this.state.files;
    files.splice(i, 1);
    this.setState({ files });
  }

  onLinkChange = (evt) => {
    this.setState({ link: evt.currentTarget.value });
    evt.currentTarget.value.match(validationRegex) ? this.setState({ linkValidationState: 'success' }) : this.setState({ linkValidationState: 'error' });
  }

  render() {
    const images = [];
    const files = this.state.files;
    for (let i = files.length - 1; i >= 0; i -= 3) {
      images.push(
        <Row key={i} className={s.row}>
          <Col sm={4} md={4}>
            <PostImage src={files[i].preview} onImageCloseButtonClick={this.onImageCloseButtonClick.bind(null, i)} />
          </Col>
          { i - 1 >= 0 && <Col sm={4} md={4}><PostImage src={files[i - 1].preview} onImageCloseButtonClick={this.onImageCloseButtonClick.bind(null, i - 1)} /></Col> }
          { i - 2 >= 0 && <Col sm={4} md={4}><PostImage src={files[i - 2].preview} onImageCloseButtonClick={this.onImageCloseButtonClick.bind(null, i - 2)} /></Col> }
        </Row>,
      );
    }
    const tags = this.state.tags;
    const suggestions = this.state.suggestions;
    const handleSubmit = (this.state.files.length > 0 && this.state.tags.length > 0 && (this.state.linkValidationState === 'success' || !this.state.linkValidationState)) ? this.handlePost : this.handleEmptySubmit;
    return (
      <div>
        <PostProgressModal show={this.state.showModal} progress={this.state.progress} fileCount={files.length} />
        <Grid>
          <Row>
            <Col sm={3} md={3} />
            <Col sm={6} md={6}>
              <PageHeader className={s.pageheader}>Is It Real Or Fake?</PageHeader>
              { this.state.filesMessage && <Alert bsStyle="danger">{this.state.filesMessage}</Alert> }
              <h3>Photos <small>- upload high-quality, tagged pictures</small></h3>
              <div className={s.dropzone} onClick={this.onOpenClick}>
                <Dropzone ref={(node) => { this.dropzone = node; }} onDrop={this.onDrop} accept="image/*" maxSize={1000000}>
                  <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
              </div>
              {this.state.files.length > 0 ? <div>{images}</div> : null}
              <form onSubmit={handleSubmit}>
                { this.state.tagsMessage && <Alert bsStyle="danger">{this.state.tagsMessage}</Alert> }
                <div className={s.formGroup}>
                  <h3>Tags <small>- help identify your item - e.g. Nike, AirMax97, SilverBullet</small></h3>
                  <TagsInput value={this.state.tags} onChange={::this.handleTagInputChange} maxTags={10} />
                </div>
                { this.state.linkMessage && <Alert bsStyle="danger">{this.state.linkMessage}</Alert> }
                <div className={s.formGroup}>
                  <h3>Link <small>- link to eBay, Grailed, etc. listing</small></h3>
                  <ValidateLinkInput
                    id="link"
                    type="text"
                    name="link"
                    placeholder="e.g. https://www.grailed.com/mygrails/7602"
                    validationState={this.state.linkValidationState}
                    onLinkChange={this.onLinkChange}
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

export default withStyles(s)(Post);
