import React, { PropTypes } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Feed.css';

import {
  Grid,
  Row,
  Col,
} from 'react-bootstrap';

import LegitCheck from '../LegitCheck';
import history from '../../core/history';

class Feed extends React.Component {

  componentDidMount() {
    if (!this.props.user) {
      history.push('/login');
      return;
    }
    this.props.getFeed();
  }

  render() {
    return (
      <div className={s.container}>
        <Grid>
          <Row>
            <Col sm={2} md={2} />
            <Col sm={8} md={8}>
              {this.props.posts.map((post) =>
                <LegitCheck
                  key={post.id}
                  user={this.props.user}
                  post={post}
                  addCheck={this.props.addCheck}
                  removeCheck={this.props.removeCheck}
                  updateCheck={this.props.updateCheck}
                  addComment={this.props.addComment}
                  removeComment={this.props.removeComment}
                />,
              )}
            </Col>
            <Col sm={2} md={2} />
          </Row>
        </Grid>
      </div>
    );
  }

}

Feed.propTypes = {
  user: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  getFeed: PropTypes.func.isRequired,
  addCheck: PropTypes.func.isRequired,
  removeCheck: PropTypes.func.isRequired,
  updateCheck: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
};

export default withStyles(s)(Feed);
