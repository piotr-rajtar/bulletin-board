import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addPost } from '../../../redux/postsRedux';
import { createDate } from '../../../utils';

import styles from './PostAdd.module.scss';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';

import ImageUploader from 'react-images-upload';

import { v4 as uuidv4 } from 'uuid';

class Component extends React.Component {

  state = {
    postData: {
      id: '',
      title: '',
      content: '',
      publicationDate: '',
      lastUpdate: '',
      email: '',
      status: '',
      photo: null,
      price: '',
      phone: '',
      location: ''
    },
    loading: {
      error: false,
    },
  }

  static propTypes = {
    addPost: PropTypes.func,
  }

  handleChange = (event) => {
    const { postData } = this.state;
    const {value, id } = event.target;

    this.setState({
      postData: {
        ...postData,
        [id]: value
      },
    });
  }

  fillNoVisibleParameters = () => {
    const { postData } = this.state;
    const date = createDate();
    const id = uuidv4();

    this.setState({
      postData: {
        ...postData,
        id: id,
        publicationDate: date,
        lastUpdate: date,
        status: 'published',
      },
    });
  }

  setPhoto = (files) => {
    const { postData } = this.state;

    if(files) this.setState({
      postData: {
        ...postData,
        photo: files[0]
      }
    });
  }

  submitForm = (event) => {
    const { postData } = this.state;
    const { addPost } = this.props;
    event.preventDefault();

    let error = null;

    if (!postData.title.length || !postData.content.length || !postData.email.length) error ='You cannot leave title, content and email firlds empty';
    else if(postData.title.length < 10 || postData.content.length < 20) error ="Too short, title cannot has less than 10 character, content less than 20";

    if(!error) {
      addPost(postData);
      alert('Post added successfully')
    } else {
      alert(error);
    }
  }

  render() {

    return(
      <Paper className={styles.root}>
        <h2>Add new post</h2>
        <form
          className={styles.form}
          onSubmit={this.submitForm}
        >
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
          />
          <TextField
            id="phone"
            label="Phone number"
            variant="outlined"
            type="tel"
            className={styles.formFieldPartialWidth}
            onChange={this.handleChange}
          />
          <TextField
            id="location"
            label="Location"
            variant="outlined"
            className={styles.formFieldPartialWidth}
            onChange={this.handleChange}
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
          />
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
            onClick={this.fillNoVisibleParameters}
          >
            Submit
          </Button>
        </form>
      </Paper>
    );
  }
}


// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

const mapDispatchToProps = dispatch => ({
   addPost: data => dispatch(addPost(data)),
 });

const Container = connect(null, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
