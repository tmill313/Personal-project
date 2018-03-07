import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux'
import { getTeams, getUser, getSuggestions } from '../ducks/reducer';
import Graph from '../charts/Graph';
import './Dashboard.css'


class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            suggestions: [],
            newSuggestion: '',
            teams: [],
            user: {},


        }
        this.addLike = this.addLike.bind(this)
    }


    componentDidMount() {
        axios.get('/getTeams').then(res => {
            console.log(res.data)
            this.props.getTeams(res.data)
        })
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data)
        })
        axios.get('/getSuggestions').then(res => {
            this.props.getSuggestions(res.data)
        })
    }

    deleteSuggestion(id) {
        axios.delete(`/delete/${id}`).then(res => {
            this.props.getSuggestions(res.data)
        })
    }

    addLike(id, initialVal, incrementer, ) {
        let body = { suggestion_id: id, votes: initialVal, incrementer: incrementer }
        axios.put(`/like`, body).then(res => {
            this.props.getSuggestions(res.data)
        })
        axios.put(`/pushLike/${id}`).then(res => {
            this.props.getUser(res.data)
        })

    }

    removeLike(id, initialVal, incrementer, ) {
        let body = { suggestion_id: id, votes: initialVal, incrementer: incrementer }
        axios.put(`/removeLike`, body).then(res => {
            this.props.getSuggestions(res.data)
        })
        axios.put(`/spliceLike/${id}`).then(res => {
            this.props.getUser(res.data)
        })

    }

    commitSuggestion(id, suggestion_id) {
        axios.put(`/commitSuggestion/${id}/${suggestion_id}`).then(res => {
            this.props.getSuggestions(res.data)
        })
    }

    render() {


        let teamsBox = this.props.teams.sort((a, b) => b.completed_votes - a.completed_votes).map((obj) => (
            <div>
                <h1>{this.props.user ? obj.team_name : null}</h1>
                <h3>{this.props.user ? obj.completed_votes : null}</h3>
                <Link to={`/Team/${obj.id}`}><button>TEAM VIEW</button></Link>
            </div>
        ))
        let suggBox = this.props.suggestions.sort((a, b) => b.votes - a.votes).map((obj) => (

            this.props.user.access === 3 ?
                <div>
                    <h1>{this.props.user ? obj.suggestion : null}</h1>
                    <h3>assigned to - {obj.team_name}</h3>
                    <p># of points: {this.props.user ? obj.votes : null}</p>
                    <button onClick={() => this.deleteSuggestion(obj.suggestion_id)}>delete</button>
                    {
                        !(obj.assigned_id === 1)
                            ?
                            null
                            :
                            !this.props.user.voted.some(e => e === obj.suggestion_id)
                                ?
                                <button onClick={() => this.addLike(obj.suggestion_id, obj.votes, 5)}>Like</button>
                                :
                                <button onClick={() => this.removeLike(obj.suggestion_id, obj.votes, 5)}>Undo Like</button>
                    }
                    <button onClick={() => this.commitSuggestion(this.props.user.team_id, obj.suggestion_id)}>commit suggestion to team</button>
                </div>
                :
                this.props.user.access === 2 ?
                    <div>
                        <h1>{this.props.user ? obj.suggestion : null}</h1>
                        <h3>assigned to - {obj.team_name}</h3>
                        <p># of points: {this.props.user ? obj.votes : null}</p>
                        <button onClick={() => this.deleteSuggestion(obj.suggestion_id)}>delete</button>
                    {
                        !(obj.assigned_id === 1)
                            ?
                            null
                            :
                            !this.props.user.voted.some(e => e === obj.suggestion_id)
                                ?
                                <button onClick={() => this.addLike(obj.suggestion_id, obj.votes, 3)}>Like</button>
                                :
                                <button onClick={() => this.removeLike(obj.suggestion_id, obj.votes, 3)}>Undo Like</button>
                    }
                        <button onClick={() => this.commitSuggestion(this.props.user.team_id, obj.suggestion_id)}>commit suggestion to team</button>
                    </div>
                    :
                    <div>
                        <h1>{this.props.user ? obj.suggestion : null}</h1>
                        <h3>assigned to - {obj.team_name}</h3>
                        <p># of points: {this.props.user ? obj.votes : null}</p>
                    </div>
        ))
        return (
            <div>
                <h1>WELCOME, {this.props.user ? this.props.user.first_name : null}</h1>
                <h1>Dashboard View</h1>
                <div className="graph-wrapper">
                <Graph/>
                <div className="graph-filler">
                <h1># of completed votes:</h1>
                </div>
                </div>
                {teamsBox}
                {suggBox}
                <Link to='/addSuggestion'><button>Add a suggestion</button></Link>
                <a href='http://localhost:3030/auth/logout'><button>Log out</button></a>
            </div>
        )
    }



}


function mapStateToProps(state) {
    return {
        teams: state.teams,
        user: state.user,
        suggestions: state.suggestions
    }
}

export default connect(mapStateToProps, { getTeams, getUser, getSuggestions })(Dashboard);