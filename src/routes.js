import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Team from './components/Team/Team'
import addSuggestion from './components/addSuggestion/addSuggestion';
import AssignRole from './components/AssignRole/AssignRole'


export default (
<Switch>
    <Route exact path='/' component={Login}/>
    <Route path='/assignrole' component={AssignRole}/>
    <Route path='/dashboard' component={Dashboard}/>
    <Route path='/addSuggestion' component={addSuggestion}/>
    <Route path='/Team/:id' component={Team}/>


</Switch>




)