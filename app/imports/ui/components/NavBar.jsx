import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '14px' };
    return (
      <Menu style={menuStyle} attached="top" borderless id="nav">
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
          <Header as='h3'>Home</Header>
        </Menu.Item>
        <Menu.Item as={NavLink} activeClassName="" exact to="/catspublic" key='cat' id="font2">
          All Cats</Menu.Item>
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="" exact to="/cats" key='cat' id="font2">
          Your Cats
          </Menu.Item>]
        ) : ''}
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/register" key='add' id="font2">Register a Cat</Menu.Item>]
        ) : ''}
        {this.props.currentUser ? (
          [<Menu.Item as={NavLink} activeClassName="active" exact to="/volunteer" key='add' id="font2">Volunteer</Menu.Item>]
        ) : ''}

        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/volunteeradmin" key='volunteeradmin' id="font2">Volunteer Admin Page</Menu.Item>
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'admin') ? (
          <Menu.Item as={NavLink} activeClassName="active" exact to="/admin" key='useradmin'>Users Admin Page</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown id="login-dropdown font2" text="Login" pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="login-dropdown-sign-in" icon="user" text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item id="login-dropdown-sign-up" icon="add user" text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown id="navbar-current-user" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
                <Dropdown.Item id="navbar-sign-out" icon="user" text="User Profile" as={NavLink} exact to="/userprofile"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>

      </Menu>

    );
  }
}

// Declare the types of all properties.
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(NavBarContainer);
