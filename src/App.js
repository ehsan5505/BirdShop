import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckOut from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInSignOut from './pages/register/sign-in-sign-out.components';
import { selectCurrentUser } from './redux/user/user.selectors';

import { checkCurrentUser } from './redux/user/user.actions';
import './App.css';


class App extends React.Component {

  unsubscribedAuthUser = null;

  componentDidMount() {
    const { checkCurrentUser } = this.props;
    checkCurrentUser();


  }

  componentWillUnmount() {
    this.unsubscribedAuthUser();
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact={true} path='/' component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact={true} path="/signin" render={() => this.props.currentUser ? (<Redirect to='/' />) : (<SignInSignOut />)} />
          <Route exact path="/checkout" component={CheckOut} />
        </Switch>

      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkCurrentUser: () => dispatch(checkCurrentUser())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
