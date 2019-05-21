import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import ReactGA from 'react-ga';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/enrollment/Auth/Auth';
import Logout from './containers/enrollment/Logout/Logout'
import * as actions from './store/actions';

import Vehicles from './containers/vehicles/vehicles'
import VehiclePage from './containers/vehicles/vehiclePage/vehiclePage'
import Maintenances from './containers/maintenances/maintenances'
import MaintenancePage from './containers/maintenances/maintenancePage/maintenancePage'
import Products from './containers/products/products'

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
        <Route path="/" component={Auth}/>
        <Redirect to="/Auth" />
      </Switch>
    )

    if ( this.props.isAuthenticated ) {
      routes = (
        <Switch>
          <Route path="/vehicles" component={Vehicles} />
          <Route path="/vehicle/:plateNumber" component={VehiclePage} />
          <Route path="/maintenances" component={Maintenances} />
          <Route path="/maintenance/:maintenanceId" component={MaintenancePage} />
          <Route path="/products" component={Products} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Vehicles} />
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
