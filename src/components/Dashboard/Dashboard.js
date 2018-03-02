import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            suggestions: [],
            newSuggestion: '',
            teams:[]


        }
    }


    componentDidMount() {
        axios.get('/getTeams').then(res => {
            this.setState({
                teams: res.data
            })
        })
        axios.get('/getSuggestions').then(res => {
            this.setState({
                suggestions: res.data
            })
        })
    }

    deleteSuggestion(id) {
        axios.delete(`/delete/${id}`).then(res => {
            this.setState({
                suggestions: res.data
            })
        })
    }

    addLike(id, initialVal, incrementer) {
        let body = {suggid: id, votes: initialVal, incrementer: incrementer}
        axios.put(`/like`, body).then(res => {
            this.setState({
                suggestions: res.data
            })
        })
    }

render() {
    let teamsBox = this.state.teams.sort((a, b) => b.completedvotes - a.completedvotes).map((obj) => (
        <div>
            <h1>{obj.teamname}</h1>
            <h3>{obj.completedvotes}</h3>
        </div>
    ))
    let suggBox = this.state.suggestions.sort((a, b) => b.votes - a.votes).map((obj) => (
        <div>
            <h1>{obj.suggestion}</h1>
            <p># of points: {obj.votes}</p>
            <button onClick={() => this.deleteSuggestion(obj.suggid)}>delete</button>
            <button onClick={() => this.addLike(obj.suggid, obj.votes, 1)}>Like</button>
            <button>commit suggestion to team</button>
        </div>
    ))
    return(
        <div>
            <h1>Dashboard View</h1>
            {teamsBox}
            <h2>CHARTS</h2>
            {suggBox}
            <Link to='/addSuggestion'><button>Add a suggestion</button></Link>
            <a href='http://localhost:3030/auth/logout'><button>Log out</button></a>
        </div>
    )
}










}