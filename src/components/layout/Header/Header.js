import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

import {NavLink} from 'react-router-dom';
import Button from '@material-ui/core/Button';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <h2>Bulletin Board</h2>
    <nav>
      <Button component={NavLink} exact to={`/myPosts`} activeClassName='active'>My Posts</Button>
      <Button component={NavLink} exact to={`/post/add`} activeClassName='active'>Add Post</Button>
      <Button component={NavLink} exact to={`/`}>Log out</Button>
      <Button component={NavLink} exact to={`/`}>Log in</Button>
    </nav>
  </div>
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
  Component as Header,
  // Container as Header,
  Component as HeaderComponent,
};
