import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { Header } from '../Header/Header';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './MainLayout.module.scss';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Container from '@material-ui/core/Container';

const Component = ({className, children}) => (
  <div className={clsx(className, styles.root)}>
    <AppBar>
      <Container>
        <Toolbar>
          <Header />
        </Toolbar>
      </Container>
    </AppBar>
    <Container>
      <h2>MainLayout</h2>
      {children}
    </Container>
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
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
