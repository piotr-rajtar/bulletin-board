import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll } from '../../../redux/postsRedux';

import styles from './Homepage.module.scss';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {NavLink} from 'react-router-dom';

class Component extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.array,
  }

  render() {
    const {className, children, posts} = this.props;

    return(
      <Paper className={clsx(className, styles.root)}>
        <div >
          <h2>BULLETIN BOARD!!</h2>
          <p>Please, find something you can bullet-in</p>
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
              exact to={`/post/add`}
            >
              Add Post
            </Button>
          </div>
          {children}
        </div>
      </Paper>
    );
  }
}

const mapStateToProps = state => ({
  posts: getAll(state),
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
