import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getPostById, updatePost } from '../../../redux/postsRedux.js';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostEdit.module.scss';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import {NavLink} from 'react-router-dom';

class Component extends React.Component {

  state = {
    postData: {
      id: this.props.post.id,
      title: this.props.post.title,
      content: this.props.post.content,
      publicationDate: this.props.post.publicationDate,
      lastUpdate: this.props.post.lastUpdate,
      email: this.props.post.email,
      status: this.props.post.status,
      photo: this.props.post.photo,
      price: this.props.post.price,
      phone: this.props.post.phone,
      location: this.props.post.location,
    },
    loading: {
      error: false,
    },
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    post: PropTypes.object,
    updatePost: PropTypes.func,
  }

  // setPhoto = (files) => {
  //   const { postData } = this.state;

  //   if(files) this.setState({ data: {...data, photo: files[0] }});
  // }

  handleChange = (event) => {
    const { postData } = this.state;
    const { value, id } = event.target;

    this.setState({
      postData: {...postData, [id]: value },
    });

  }

  submitForm = (event) => {
    const { postData } = this.state;
    const { updatePost } = this.props;
    event.preventDefault();

    updatePost(postData);
  }


  render() {
    const { post } = this.props;

    return post? this.postEdit() : this.noPost();
  }

  postEdit() {
    const { postData } = this.state;

    return(
      <Paper className={styles.root}>
        <h2>Edit Post</h2>
        <form
          className={styles.form}
          onSubmit={this.submitForm}>
          <TextField
            id="title"
            label="Title"
            variant="outlined"
            InputProps={{
              minLength: 10,
            }}
            required
            fullWidth
            className={styles.formFieldFullWidth}
            onChange={this.handleChange}
            value={postData.title}
          />
          <TextField
            id="content"
            label="Content"
            multiline
            variant="outlined"
            InputProps={{
              minLength: 20,
            }}
            required
            fullWidth
            className={styles.formFieldFullWidth}
            onChange={this.handleChange}
            value={postData.content}
          />
          <TextField
            id="price"
            label="Price"
            variant="outlined"
            type="number"
            inputProps={{
              min: 0,
            }}
            InputProps={{
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
            }}
            className={styles.formFieldPartialWidth}
            onChange={this.handleChange}
            value={postData.price}
          />
          <TextField
            id="phone"
            label="Phone number"
            variant="outlined"
            type="tel"
            className={styles.formFieldPartialWidth}
            onChange={this.handleChange}
            value={postData.phone}
          />
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            className={styles.formFieldPartialWidth}
            onChange={this.handleChange}
            value={postData.location}
          />
          <TextField
            id="file"
            variant="outlined"
            type="file"
            fullWidth
            className={styles.formFieldFullWidth}
          />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            className={styles.button}
            type="submit"
          >
            Edit
          </Button>
        </form>
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
              Oooops, there is no post to edit!
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

const mapDispatchToProps = dispatch => ({
  updatePost: (data) => dispatch(updatePost(data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,
};
