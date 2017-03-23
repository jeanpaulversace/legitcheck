import { connect } from 'react-redux';
import {
  addFiles,
  removeFile,
  setTags,
  setLink,
} from '../actions/createPost';

import Post from '../components/Post';

const mapStateToProps = (state) => {
  const post = state.post;
  return {
    files: post.files,
    tags: post.tags,
    link: post.link,
    // isPosting: state.isPosting
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
  };
};

const PostContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Post);

export default PostContainer;
