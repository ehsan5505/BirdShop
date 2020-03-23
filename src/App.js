import React from 'react';
import {Route,Switch} from "react-router-dom";

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';

import './App.css';

// const Test = () => (
//   <div>
//     <h1>Just a test for the Router</h1>
//   </div>
// )

function App() {
  return (
    <div> 
      <Header/>
      <Switch>
        <Route exact='true' path='/' component={HomePage} />
        <Route exact="true" path="/shop" component={ShopPage} />
      </Switch>

    </div>
  );
}

export default App;
