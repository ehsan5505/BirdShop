import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import CheckOut from './pages/checkout/checkout.component';
import Header from './components/header/header.component';
import SignInSignOut from './pages/register/sign-in-sign-out.components';
import { selectCurrentUser } from './redux/user/user.selectors';

import { setCurrentUser } from './redux/user/user.actions';
import './App.css';


class App extends React.Component {

  unsubscribedAuthUser = null;

  componentDidMount() {


    const { setCurrentUser } = this.props;
    // this.unsubscribedAuthUser = auth.onAuthStateChanged(async userAuth => {
    //   // this.setState({currentUser:user})
    //   // createUserProfileDocument(user);

    //   if (userAuth) {
    //     const userRef = await createUserProfileDocument(userAuth);

    //     userRef.onSnapshot(snapShot => {
    //       setCurrentUser(
    //         {
    //           id: snapShot.id,
    //           ...snapShot.data()
    //         }
    //       );
    //       console.log(this.state);
    //     })
    //   } else {
    //     setCurrentUser(userAuth);
    //   }
    // })
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
  setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
