import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPostById } from '../../../redux/postsRedux.js';

import styles from './Post.module.scss';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import {NavLink} from 'react-router-dom';

class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    post: PropTypes.object,
  }

  render() {
    const { post } = this.props;

    return post? this.postTemplate() : this.noPost();
  }

  postTemplate() {
    const {className, post} = this.props;

    return(
      <Paper className={clsx(className, styles.root)}>
        <Card
          variant="outlined"
          className={styles.card}
        >
          <CardHeader
            title={post.title}
            subheader={`Publicated: ${post.publicationDate}, last updated: ${post.lastUpdate}`}
          />
          <CardContent>
            <img className={styles.photo} src={post.photo} alt="User photography" />
            <div className={styles.content_wrapper}>
              <p className={styles.content}>{post.content}</p>
            </div>
            <Table className={styles.table}>
              <TableBody>
                <TableRow>
                  <TableCell>Price</TableCell>
                  <TableCell align="right">{post.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">{post.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone</TableCell>
                  <TableCell align="right">{post.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell align="right">{post.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">{post.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              size="large"
              color="primary"
              className={styles.button}
              component={NavLink}
              exact to={`/post/${post.id}/edit`}
            >
                  Edit post
            </Button>
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
          </CardActions>
        </Card>
      </Paper>
    );

  }

  noPost() {
    return (
      <Paper className={styles.root}>
        <Card
          variant="outlined"
          className={styles.card}
        >
          <CardContent>
            <Typography>
              Oooops, no post!
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={styles.button}
              component={NavLink}
              exact to={`/`}
            >
                  Go back to main page
            </Button>
          </CardActions>
        </Card>
      </Paper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
});

const Container = connect(mapStateToProps)(Component);

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
