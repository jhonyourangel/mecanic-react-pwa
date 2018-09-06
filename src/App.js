import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/enrollment/Auth/Auth';
import History from './containers/history/History'
import Projects from './containers/projects/Projects'
import Logout from './containers/enrollment/Logout/Logout'
import * as actions from './store/actions';
import Dashboard from './containers/Dashboard/Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/Auth" component={Auth}/>
        <Route path="/" component={Dashboard}/>
        <Redirect to="/" />
      </Switch>
    )

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/history" component={History} />
          <Route path="/projects" component={Projects} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={History} />
          <Redirect to="/" />
        </Switch>
      )
    }

    return (
      <div >
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( actions.authCheckState() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
