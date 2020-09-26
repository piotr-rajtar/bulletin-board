import React from 'react';
import PropTypes from 'prop-types';

// import { connect } from 'react-redux';
// import { reduxSelector, reduxActionCreator } from '../../../redux/exampleRedux.js';

import styles from './Header.module.scss';

import {NavLink, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
  }

  state = {
    authorizationStatus: 'not logged',
  }

  handleChange = event => {
    this.setState({
      authorizationStatus: event.target.value,
    });
  };

  render() {
    const {} = this.props;

    return (
      <header className={styles.root}>
        <h2 className={styles.title}><Link to={'/'} className={styles.link}>Bulletin Board</Link></h2>

        <select value={this.state.authorizationStatus} onChange={this.handleChange} className={styles.header_item}>
          <option value="logged">logged</option>
          <option value="not logged">not logged</option>
          <option value="admin">admin</option>
        </select>

        {this.state.authorizationStatus !== 'not logged'
          ?
          <nav>
            <Button className={styles.link} component={NavLink} exact to={`/`} activeClassName='active'>HomePage</Button>
            <Button className={styles.link} component={NavLink} exact to={`/post/myposts`} activeClassName='active'>My Posts</Button>
            <Button className={styles.link} component={NavLink} exact to={`/post/add`} activeClassName='active'>Add Post</Button>
            <Button className={styles.link} component={NavLink} exact to={`/`}>Log out</Button>
          </nav>
          :
          <nav>
            <Button><a href="https://google.com" className={styles.link}>Log in</a></Button>
          </nav>
        }
      </header>
    );
  }
}

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
