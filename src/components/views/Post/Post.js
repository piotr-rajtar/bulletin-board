import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPostById } from '../../../redux/postsRedux.js';

import styles from './Post.module.scss';

import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
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
    post: PropTypes.array,
  }

  render() {
    const {className, children, post} = this.props;

    const postData = post[0];

    //console.log(postData);

    return(
      <Paper className={clsx(className, styles.root)}>
        <Card
          variant="outlined"
          className={styles.card}
        >
          <CardHeader
            title={postData.title}
            subheader={`Publicated: ${postData.publicationDate}, last updated: ${postData.lastUpdate}`}
          />
          <CardMedia
            image={postData.photo}
          />
          <CardContent>
            <Typography>
              {postData.content}
            </Typography>
            {/*<Typography>
              {postData.price}
            </Typography>
            <Typography>
              {postData.email}
            </Typography>
            <Typography>
              {postData.phone}
            </Typography>
            <Typography>
              {postData.location}
            </Typography> */}
            <Table className={styles.table}>
              <TableBody>
                <TableRow>
                  <TableCell>Price</TableCell>
                  <TableCell align="right">{postData.price}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell align="right">{postData.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Phone</TableCell>
                  <TableCell align="right">{postData.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Location</TableCell>
                  <TableCell align="right">{postData.location}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">{postData.status}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              size="small"
              color="primary"
              className={styles.button}
              component={NavLink}
              exact to={`/post/${postData.id}/edit`}
            >
                  Edit post
            </Button>
          </CardActions>
        </Card>
        <p></p>
        <p></p>
        {children}
      </Paper>
    );
  }
}

const mapStateToProps = (state, props) => ({
  post: getPostById(state, 1),
});

// const mapStateToProps = (state, props) => ({
//   post: getPostById(state, props.match.params.id),
// });

const Container = connect(mapStateToProps)(Component);

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

export {
  //Component as Post,
  Container as Post,
  Component as PostComponent,
};
