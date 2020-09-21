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
        className={styles.formFieldFullWidth}
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
      />
      <TextField
        id="phone"
        label="Phone number"
        variant="outlined"
        type="tel"
        className={styles.formFieldPartialWidth}
      />
      <TextField
        id="location"
        label="Location"
        variant="outlined"
        className={styles.formFieldPartialWidth}
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
