import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './PostAdd.module.scss';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';


const Component = ({className, children}) => (
  <Paper className={styles.root}>
    <h2>Add new post</h2>
    <form className={clsx(className, styles.form)}>
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        InputProps={{
          minLength: 10,
        }}
        required
        fullWidth
        className={styles.title}
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
        className={styles.description}
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
        className={styles.price}
      />
      <TextField
        id="phone"
        label="Phone number"
        variant="outlined"
        type="tel"
        className={styles.phone}
      />
      <TextField
        id="location"
        label="Location"
        variant="outlined"
        className={styles.location}
      />

      <TextField
        id="file"
        variant="outlined"
        type="file"
        fullWidth
        className={styles.file}
      />
      <Button
        variant="outlined"
        color="primary"
        size="large"
        className={styles.button}
      >
        Submit
      </Button>

    </form>
  </Paper>




);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as PostAdd,
  // Container as PostAdd,
  Component as PostAddComponent,
};
