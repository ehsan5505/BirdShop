import React from 'react';
import {Route,Switch} from "react-router-dom";

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInSignOut from './pages/register/sign-in-sign-out.components';
import { auth } from './firebase/firebase.utils';

import './App.css';

// const Test = () => (
//   <div>
//     <h1>Just a test for the Router</h1>
//   </div>
// )

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      currentUser:null
    }
  }

  unsubscribedAuthUser = null;

  componentDidMount(){
    unsubscribedAuthUser=auth.onAuthStateChanged(user => {
      this.setState({currentUser:user})
      console.log(user);
    })
  }

  componentWillUnmount(){
    this.unsubscribedAuthUser();
  }

  render() {
    return (
      <div> 
        <Header/>
        <Switch>
          <Route exact='true' path='/' component={HomePage} />
          <Route exact="true" path="/shop" component={ShopPage} />
          <Route exact="true" path="/signin" component={SignInSignOut} />
        </Switch>
  
      </div>
    )
  }
}

export default App;
