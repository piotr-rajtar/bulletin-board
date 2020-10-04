import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getAllUsers } from '../../../redux/usersRedux';

import styles from './Header.module.scss';

import {NavLink, Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';


class Component extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    users: PropTypes.array,
  }

  state = {
    permission: 'not authorized',
  }

  handleChange = event => {
    this.setState({
      permission: event.target.value,
    });
  };

  render() {
    const { users } = this.props;
    const { permission } = this.state;

    return (
      <header className={styles.root}>
        <h2 className={styles.title}><Link to={'/'} className={styles.link}>Bulletin Board</Link></h2>

        <select value={this.state.authorizationStatus} onChange={this.handleChange} className={styles.header_item}>
          {users.map(user => {
            return(
              <option key={user.id} value={user.permission}>{user.name}</option>
            );
          })}
        </select>

        {permission === 'not authorized'
          ? this.userNotAuthorized()
          : this.userAuthorized()
        }

      </header>
    );
  }

  userAuthorized() {
    return(
      <nav>
        <Button className={styles.link} component={NavLink} exact to={`/`} activeClassName='active'>HomePage</Button>
        <Button className={styles.link} component={NavLink} exact to={`/post/myposts`} activeClassName='active'>My Posts</Button>
        <Button className={styles.link} component={NavLink} exact to={`/post/add`} activeClassName='active'>Add Post</Button>
        <Button className={styles.link} component={NavLink} exact to={`/`}>Log out</Button>
      </nav>
    );
  }

  userNotAuthorized() {
    return(
      <nav>
        <Button><a href="https://google.com" className={styles.link}>Log in</a></Button>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  users: getAllUsers(state),
});

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

const Container = connect(mapStateToProps)(Component);

export {
  // Component as Header,
  Container as Header,
  Component as HeaderComponent,
};
