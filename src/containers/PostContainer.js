import { connect } from 'react-redux';
import {
  addFiles,
  removeFile,
  setTags,
  setLink,
  uploadAWSImagesAndCreatePost,
  handleAfterPost,
} from '../actions/post/post';

import Post from '../components/Post';

const mapStateToProps = (state) => {
  const post = state.post;
  return {
    files: post.files,
    tags: post.tags,
    link: post.link,
    request: post.request,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onDrop: (files) => {
    dispatch(addFiles(files));
  },
  onImageCloseButtonClick: (index) => {
    dispatch(removeFile(index));
  },
  handleTagsChange: (tags) => {
    dispatch(setTags(tags));
  },
  handleLinkChange: (link) => {
    dispatch(setLink(link));
  },
  uploadAWSImagesAndCreatePost: () => {
    dispatch(uploadAWSImagesAndCreatePost()).then(() => dispatch(handleAfterPost()));
  },
});

const PostContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);

export default PostContainer;
