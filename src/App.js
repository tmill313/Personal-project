import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/Login/Login';
import Routes from './routes.js';
import 'intro.js/introjs.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        {Routes }
      </div>
    );
  }
}

export default App;
