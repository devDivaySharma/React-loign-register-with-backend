import React from 'react';
import './App.css';
import HomeComponent from './cmp/home';
import ListingComponent from './cmp/listing';
import AboutComponent from './cmp/about';
import Auth from './cmp/auth';
import {BrowserRouter, Switch, Route }from 'react-router-dom';
import Checker from './cmp/protected';
import Nav from './cmp/nav'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav></Nav>
      <Switch>
        <Route path="/about">
          <Checker cmp={AboutComponent}></Checker>
        </Route>
        <Route path="/home">
        <Checker cmp={HomeComponent}></Checker>
        </Route>
        <Route path="/list">
        <Checker cmp={ListingComponent}></Checker>
        </Route>
        <Route path="/">
        <Auth></Auth>
        </Route>
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
