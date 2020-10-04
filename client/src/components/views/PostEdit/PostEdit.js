import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getPostById, updatePost } from '../../../redux/postsRedux.js';
import { createDate } from '../../../utils';

import styles from './PostEdit.module.scss';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

import {NavLink} from 'react-router-dom';
import {Form} from '../../common/Form/Form';

class Component extends React.Component {

  state = {
    postData: {
      id: this.props.post.id,
      title: this.props.post.title,
      content: this.props.post.content,
      created: this.props.post.created,
      updated: this.props.post.updated,
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
        updated: date,
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
        <Form
          postData={postData}
          setPhoto={this.setPhoto}
          setUpdateDate={this.setUpdateDate}
          handleChange={this.handleChange}
          handleSelectChange={this.handleSelectChange}
          submitForm={this.submitForm}
        />
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
