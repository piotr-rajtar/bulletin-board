import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addPost } from '../../../redux/postsRedux';
import { createDate } from '../../../utils';

import styles from './PostAdd.module.scss';

import Paper from '@material-ui/core/Paper';

import Button from '@material-ui/core/Button';

import {NavLink} from 'react-router-dom';
import {Form} from '../../common/Form/Form';

import { v4 as uuidv4 } from 'uuid';

class Component extends React.Component {

  state = {
    postData: {
      id: '',
      title: '',
      content: '',
      created: '',
      updated: '',
      email: '',
      status: '',
      photo: null,
      price: '',
      phone: '',
      location: '',
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
        [id]: value,
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
        created: date,
        updated: date,
        status: 'active',
      },
    });
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

  submitForm = (event) => {
    const { postData } = this.state;
    const { addPost } = this.props;
    event.preventDefault();

    let error = null;

    if (!postData.title.length || !postData.content.length || !postData.email.length) error ='You cannot leave title, content and email firlds empty';
    else if(postData.title.length < 10 || postData.content.length < 20) error ='Too short, title cannot has less than 10 character, content less than 20';

    if(!error) {
      addPost(postData);
      alert('Post added successfully');
    } else {
      alert(error);
    }
  }

  render() {
    return(
      <Paper className={styles.root}>
        <h2>Add new post</h2>
        <Form
          setPhoto={this.setPhoto}
          handleChange={this.handleChange}
          submitForm={this.submitForm}
          fillNoVisibleParameters={this.fillNoVisibleParameters}
        />
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
