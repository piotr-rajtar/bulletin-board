import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getPostById, updatePost } from '../../../redux/postsRedux.js';
import { createDate } from '../../../utils';

import styles from './PostEdit.module.scss';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

import ImageUploader from 'react-images-upload';

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
    post: PropTypes.object,
    updatePost: PropTypes.func,
  }

  setPhoto = (files) => {
    const { postData } = this.state;

    if(files) this.setState({
      postData: {
        ...postData,
        photo: files[0],
      },
    });
  }

  setUpdateDate = () => {
    const { postData } = this.state;
    const date = createDate();

    this.setState({
      postData: {
        ...postData,
        lastUpdate: date,
      },
    });
  }

  handleChange = (event) => {
    const { postData } = this.state;
    const { value, id } = event.target;

    this.setState({
      postData: {...postData, [id]: value },
    });
  }

  handleSelectChange = (event) => {
    const { postData } = this.state;
    const { value } = event.target;

    this.setState({
      postData: {
        ...postData,
        status: value,
      },
    });
  }

  submitForm = (event) => {
    const { postData } = this.state;
    const { updatePost } = this.props;
    event.preventDefault();

    let error = null;

    if (!postData.title.length || !postData.content.length || !postData.email.length) error ='You cannot leave title, content and email firlds empty';
    else if(postData.title.length < 10 || postData.content.length < 20) error ='Too short, title cannot has less than 10 character, content less than 20';

    if(!error) {
      updatePost(postData);
      alert('Post edited successfully');
    } else {
      alert(error);
    }
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
            id="email"
            label="Email"
            variant="outlined"
            type="email"
            required
            fullWidth
            className={styles.formFieldFullWidth}
            onChange={this.handleChange}
            value={postData.email}
          />
          <Select
            id="status"
            variant="outlined"
            value={postData.status}
            onChange={this.handleSelectChange}
            className={styles.formFieldPartialWidth}
          >
            <MenuItem value='active'>Active</MenuItem>
            <MenuItem value='closed'>Closed</MenuItem>
          </Select>
          <ImageUploader
            withIcon={true}
            buttonText='Choose image'
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withPreview={true}
            onChange={this.setPhoto}
            singleImage={true}
          />
          <Button
            variant="outlined"
            color="primary"
            size="large"
            className={styles.button}
            type="submit"
            onClick={this.setUpdateDate}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            className={styles.button}
            component={NavLink}
            exact to={`/post/${postData.id}`}
          >
            Go back to the post
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
