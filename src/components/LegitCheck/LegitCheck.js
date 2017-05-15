import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './LegitCheck.css';
import FontAwesome from 'react-fontawesome';

import {
  Panel,
  Image,
  Button,
  OverlayTrigger,
  Tooltip,
  FormGroup,
  FormControl,
} from 'react-bootstrap';

import Carousel from 'nuka-carousel';

class LegitCheck extends React.Component {

  constructor(props) {
    super(props);
  }

  state = {
    comment: '',
  }

  settings = {
    dots: false,
    infinite: true,
  }

  handleCheckClick = (vote) => {
    const post = this.props.post;
    const check = post.checks.find((chck) => chck.user.id === this.props.user.id);

    if (check) {
      if (check.vote === vote) {
        this.props.removeCheck({
          postId: post.id,
          checkId: check.id,
          vote,
        });
      } else {
        this.props.updateCheck({
          postId: post.id,
          checkId: check.id,
          vote,
          oldVote: vote === 'UP' ? 'DOWN' : 'UP',
        });
      }
    } else {
      this.props.addCheck({
        postId: this.props.post.id,
        vote,
      });
    }
  }

  handleCommentChange = (evt) => {
    this.setState({ comment: evt.target.value });
  }

  handleCommentSubmit = (evt) => {
    evt.preventDefault();

    this.props.addComment({
      postId: this.props.post.id,
      content: this.state.comment,
    });

    this.setState({ comment: '' });
  }

  handleCommentDelete = (comment) => {
    this.props.removeComment({
      postId: this.props.post.id,
      commentId: comment.id,
      content: comment.content,
    });
  }

  render() {
    const post = this.props.post;
    const percentage = Math.round(post.checks.map((current, total) => total + (current.vote === 'UP' ? 1 : 0), 0) / post.checks.length * 100) || 0;
    let userCheck = '';
    for (const i = 0; i < post.checks.length; i++) {
      const check = post.checks[i];
      if (check.vote === 'UP') userCheck = 'UP';
      if (check.vote === 'DOWN') userCheck = 'DOWN';
    }
    const numberOfChecksTooltip = (
      <Tooltip id={post.id}><strong>{post.checks.length}</strong> checks</Tooltip>
    );
    return (
      <div className={s.legitcheck}>
        <Button className={s.username} bsStyle="link"><h4>{post.user.email}</h4></Button>
        <Carousel dragging>
          {post.imageURLs.map((imageURL, index) =>
            <Image key={index} src={imageURL} onLoad={() => { window.dispatchEvent(new Event('resize')); }} responsive />,
          )}
        </Carousel>
        <OverlayTrigger placement="top" overlay={numberOfChecksTooltip}>
          <h1 className={s.numberOfChecks}><strong>{percentage}%</strong> legit</h1>
        </OverlayTrigger>
        <h5 className={s.link}><a>{post.link}</a></h5>
        <div className={s.tagContainer}>
          {post.tags.map((tag) =>
            <Button key={tag.name} bsStyle="warning" className={s.tag}>#{tag.name}</Button>,
          )}
        </div>
        <div className={s.commentContainer}>
          {post.comments.map((comment) =>
            <h5 key={comment.id} className={comment.isPosting ? s.commentPosting : s.comment}>
              <strong>{comment.user.email}</strong> {comment.content}
              { comment.user.id === this.props.user.id && <span className={s.commentDelete} onClick={() => { this.handleCommentDelete({ id: comment.id, content: comment.content }); }} >&times;</span> }
            </h5>,
          )}
        </div>
        <div className={s.break} />
        <div className={s.checkContainer}>
          <Button bsStyle="link" onClick={(e) => { e.preventDefault(); this.handleCheckClick('UP'); }}><FontAwesome className={userCheck === 'UP' ? s.checkGreen : s.checkBlack} name="check" /></Button>
          <Button bsStyle="link" onClick={(e) => { e.preventDefault(); this.handleCheckClick('DOWN'); }}><FontAwesome className={userCheck === 'DOWN' ? s.xRed : s.xBlack} name="times" /></Button>
        </div>
        <form onSubmit={this.handleCommentSubmit}>
          <FormGroup>
            <FormControl
              className={s.newComment}
              type="text"
              value={this.state.comment}
              placeholder="Enter a comment"
              onChange={this.handleCommentChange}
            />
            <input
              type="submit"
              className={s.hiddenSubmit}
              tabIndex="-1"
            />
          </FormGroup>
        </form>
      </div>
    );
  }
}

LegitCheck.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  addCheck: PropTypes.func.isRequired,
  removeCheck: PropTypes.func.isRequired,
  updateCheck: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
};

export default withStyles(s)(LegitCheck);
