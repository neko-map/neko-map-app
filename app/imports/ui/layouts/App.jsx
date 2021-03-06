import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { Roles } from 'meteor/alanning:roles';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Landing from '../pages/Landing';
import ListCats from '../pages/ListCats';
import NotFound from '../pages/NotFound';
import CreateUserProfile from '../pages/CreateUserProfile';
import EditUserProfile from '../pages/EditUserProfile';
import UserProfile from '../pages/UserProfile';
import UserProfileAdmin from '../pages/UserProfileAdmin';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import VolunteerForm from '../pages/VolunteerForm';
import VolunteerAdmin from '../pages/VolunteerAdmin';
import RegisterCatForm from '../pages/RegisterCatForm';
import EditCats from '../pages/EditCats';
import ListCatsPublic from '../pages/ListCatsPublic';

/** Top-level layout component for this application. Called in imports/startup/client/startup.jsx. */
class App extends React.Component {
  render() {
    return (
      <Router>
        <NavBar/>
        <Switch>
          <Route exact path="/" component={Landing}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/signout" component={Signout}/>
          <Route path="/register" component={RegisterCatForm}/>
          <Route path="/catspublic" component={ListCatsPublic}/>
          <ProtectedRoute path="/cats" component={ListCats}/>
          <ProtectedRoute path="/volunteer" component={VolunteerForm}/>
          <ProtectedRoute path="/volunteeradmin" component={VolunteerAdmin}/>
          <ProtectedRoute path="/createuserprofile" component={CreateUserProfile}/>
          <ProtectedRoute path="/edituserprofile/:_id" component={EditUserProfile}/>
          <ProtectedRoute path="/editcats/:_id" component={EditCats}/>
          <ProtectedRoute path="/userprofile" component={UserProfile}/>
          <ProtectedRoute path="/volunteer" component={VolunteerForm}/>
          <AdminProtectedRoute path="/admin" component={UserProfileAdmin}/>
          <Route component={NotFound}/>
        </Switch>
      </Router>
    );
  }
}

/**
 * ProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      return isLogged ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

/**
 * AdminProtectedRoute (see React Router v4 sample)
 * Checks for Meteor login and admin role before routing to the requested page, otherwise goes to signin page.
 * @param {any} { component: Component, ...rest }
 */
const AdminProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const isLogged = Meteor.userId() !== null;
      const isAdmin = Roles.userIsInRole(Meteor.userId(), 'admin');
      return (isLogged && isAdmin) ?
        (<Component {...props} />) :
        (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
        );
    }}
  />
);

// Require a component and location to be passed to each ProtectedRoute.
ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

// Require a component and location to be passed to each AdminProtectedRoute.
AdminProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
  location: PropTypes.object,
};

export default App;
