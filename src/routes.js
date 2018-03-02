import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import addSuggestion from './components/addSuggestion/addSuggestion';

export default (
<Switch>
    <Route exact path='/' component={Login}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/addSuggestion' component={addSuggestion}/>


</Switch>




)