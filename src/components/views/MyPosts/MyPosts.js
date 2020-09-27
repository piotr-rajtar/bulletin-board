import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getPostsByUser } from '../../../redux/postsRedux';

import styles from './MyPosts.module.scss';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';

class Component extends React.Component {

  static propTypes = {
    posts: PropTypes.array,
    user: PropTypes.object,
  }

  state = {
    id: '2',
    permission: 'user',
  }

  render() {
    const {posts} = this.props;
    console.log(this.props);

    return(
      <Paper className={styles.root}>
        <div >
          <h2>MY POSTS</h2>
          <div className={styles.cardContainer}>

            {posts
              .sort(
                (date1,date2) => {
                  const dateA = new Date(date1.lastUpdate);
                  const dateB = new Date(date2.lastUpdate);

                  return dateB.getTime() - dateA.getTime();
                }
              )
              .map(post => (
                <Card
                  variant="outlined"
                  key={post.id}
                  className={styles.card}
                >
                  <CardContent>{post.title}</CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      size="small"
                      color="primary"
                      className={styles.button}
                      component={NavLink}
                      exact to={`/post/${post.id}`}
                    >
                      Find out more
                    </Button>
                  </CardActions>
                </Card>
              ))}
            <Button
              variant="outlined"
              color="primary"
              size="large"
              className={styles.button}
              component={NavLink}
              exact to={`/`}
            >
              Go back to mainpage
            </Button>
          </div>
        </div>
      </Paper>

    );
  }
}

const mapStateToProps = state => ({
  posts: getPostsByUser(state, '2'),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as MyPosts,
  Container as MyPosts,
  Component as MyPostsComponent,
};
