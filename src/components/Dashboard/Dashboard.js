import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'

export default class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            suggestions: [],
            newSuggestion: '',
            teams:[],
            user: {}


        }
    }


    componentDidMount() {
        axios.get('/getTeams').then(res => {
            this.setState({
                teams: res.data
            })
        })
        axios.get('/auth/me').then(res => {
            this.setState({
                user: res.data
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
        let body = {suggestion_id: id, votes: initialVal, incrementer: incrementer}
        axios.put(`/like`, body).then(res => {
            this.setState({
                suggestions: res.data
            })
        })
    }

render() {
    let teamsBox = this.state.teams.sort((a, b) => b.completed_votes - a.completed_votes).map((obj) => (
        <div>
            <h1>{this.state.user ? obj.team_name : null}</h1>
            <h3>{this.state.user ? obj.completed_votes : null}</h3>
        </div>
    ))
    let suggBox = this.state.suggestions.sort((a, b) => b.votes - a.votes).map((obj) => (
        <div>
            <h1>{this.state.user ? obj.suggestion : null}</h1>
            <p># of points: {this.state.user ? obj.votes : null}</p>
            <button onClick={() => this.deleteSuggestion(obj.suggestion_id)}>delete</button>
            <button onClick={() => this.addLike(obj.suggestion_id, obj.votes, 1)}>Like</button>
            <button>commit suggestion to team</button>
        </div>
    ))
    return(
        <div>
            <h1>WELCOME, {this.state.user ? this.state.user.user_name : null}</h1>
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