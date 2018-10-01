import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/enrollment/Auth/Auth';
import Logout from './containers/enrollment/Logout/Logout'
import * as actions from './store/actions';
import Vehicole from './containers/vehicole/vehicole'
import Vehicol from './containers/vehicole/vehicol/vehicol'
import Intretineri from './containers/intretineri/intretineri'
import Produse from './containers/produse/produse'

class App extends Component {
  componentDidMount() {
    ReactGA.initialize('UA-126700247-1')
    this.props.history.listen(location => ReactGA.pageview(location.pathname));
    this.props.onTryAutoSignup()
  }
  
  render() {
    // call fetch here only dev
    let routes = (
      <Switch>
        <Route path="/Auth" component={Auth}/>
        <Route path="/" component={Vehicole}/>
        <Redirect to="/Auth" />
      </Switch>
    )

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/vehicole" component={Vehicole} />
          <Route path="/vehicol/:plateNumber" component={Vehicol} />
          <Route path="/intretineri" component={Intretineri} />
          <Route path="/produse" component={Produse} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Vehicole} />
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
