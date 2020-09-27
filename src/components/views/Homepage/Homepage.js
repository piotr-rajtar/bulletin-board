import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAllPosts } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';

class Component extends React.Component {

  static propTypes = {
    posts: PropTypes.array,
  }

  state = {
    permission: 'user',
  }

  render() {
    const {posts} = this.props;
    const {permission} = this.state;

    return(
      <Paper className={styles.root}>
        <div >
          <h2>BULLETIN BOARD!!</h2>
          <p>Please, find something you can bullet-in</p>
          <div className={styles.cardContainer}>

            {posts.map(post => (
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

            {permission === 'not authorized'
              ? ''
              : this.showButton()
            }

          </div>
        </div>
      </Paper>
    );
  }

  showButton() {
    return (
      <Button
        variant="outlined"
        color="primary"
        size="large"
        className={styles.button}
        component={NavLink}
        exact to={`/post/add`}
      >
        Add Post
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  posts: getAllPosts(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  //Component as Homepage,
  Container as Homepage,
  Component as HomepageComponent,
};
