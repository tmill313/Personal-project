import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { connect } from 'react-redux'
import { getTeams, getUser, getSuggestions } from '../ducks/reducer';
import Graph from '../charts/Graph';
import './Dashboard.css'
import addSuggestion from './Asset 6.svg'

class Dashboard extends Component {
    constructor() {
        super();

        this.state = {
            suggestions: [],
            newSuggestion: '',
            teams: [],
            user: {},


        }
    }

    componentDidMount() {
        axios.get('/getTeams').then(res => {
            this.props.getTeams(res.data)
        })
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data)
        })
        axios.get('/getSuggestions').then(res => {
            this.props.getSuggestions(res.data)
        })
    }

    componentWillReceiveProps(newProps) {
        if(newProps.suggestions.length) {
        let suggestions = newProps.suggestions.map(obj => {
            obj.voted = newProps.user.voted.some(e => e === obj.suggestion_id)}) 
        this.setState({
            suggestions
        })
    }
    }

    deleteSuggestion(id) {
        axios.delete(`/delete/${id}`).then(res => {
            this.props.getSuggestions(res.data)
        })
    }

    like(liked, id, initialVal, incrementer) {
    let body = { liked: liked, suggestion_id: id, votes: initialVal, incrementer: incrementer }
    axios.put('/like', body).then(res => {
    this.props.getSuggestions(res.data.suggestions)
    this.props.getUser(res.data.user)})
    }

    commitSuggestion(id, suggestion_id) {
        axios.put(`/commitSuggestion/${id}/${suggestion_id}`).then(res => {
            this.props.getSuggestions(res.data)
        })
    }

    render() {


        let teamsBox = this.props.teams.sort((a, b) => b.completed_votes - a.completed_votes).map((obj) => (
            <Link to={`/Team/${obj.id}`}><div className="team-item">
                <h5>{this.props.user ? obj.team_name : null}</h5>
                <h5>{this.props.user ? obj.completed_votes : null}</h5>
                {/* <Link to={`/Team/${obj.id}`}><button>TEAM VIEW</button></Link> */}
            </div></Link>
        ))
        if(this.props.suggestions.length > 0) {
        var suggBox = this.props.suggestions.sort((a, b) => b.votes - a.votes).map((obj) => (

            this.props.user.access === 3 ?
                <div className="suggestion-item">
                    <p className="suggestion-user">suggested by - {obj.first_name} {obj.last_name}</p>
                    <h5 className="suggestion">{this.props.user ? obj.suggestion : null}</h5>
                    <h5 className="assigned-team"> assigned to - {obj.team_name}</h5>
                    <p className="vote-number"># of points: {this.props.user ? obj.votes : null}</p>
                    <button className="delete-button" onClick={() => this.deleteSuggestion(obj.suggestion_id)}>delete</button>
                    {
                        !(obj.assigned_id === 1)
                            ?
                            null
                            :
                            <button className="like-button" onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 5)}>Like</button>
                    }
                    <button className="commit-button" onClick={() => this.commitSuggestion(this.props.user.team_id, obj.suggestion_id)}>commit suggestion to team</button>
                </div>
                :
                this.props.user.access === 2 ?
                    <div className="suggestion-item">
                        <p className="suggestion-user">suggested by - {obj.first_name} {obj.last_name}</p>
                        <h5 className="suggestion">{this.props.user ? obj.suggestion : null}</h5>
                        <h5 className="assigned-team">assigned to - {obj.team_name}</h5>
                        <p className="vote-number"># of points: {this.props.user ? obj.votes : null}</p>
                        <button className="delete-button" onClick={() => this.deleteSuggestion(obj.suggestion_id)}>delete</button>
                    {
                        !(obj.assigned_id === 1)
                        ?
                        null
                        :
                        <button className="like-button"onClick={() => this.like(obj.voted, obj.suggestion_id, obj.votes, 3)}>Like</button>
                }
                        <button className="commit-button" onClick={() => this.commitSuggestion(this.props.user.team_id, obj.suggestion_id)}>commit suggestion to team</button>
                    </div>
                    :
                    <div className="suggestion-item">
                        <p className="suggestion-user">suggested by - {obj.first_name} {obj.last_name}</p>
                        <h5 className="suggestion">{this.props.user ? obj.suggestion : null}</h5>
                        <h5 className="assigned-team">assigned to - {obj.team_name}</h5>
                        <p className="vote-number"># of points: {this.props.user ? obj.votes : null}</p>
                    </div>
        ))}
        return (
            <div>
                <header className="dash-header">
                <h1>WELCOME, {this.props.user ? this.props.user.first_name : null}</h1>
                <a className="logout-button" href='http://localhost:3030/auth/logout'><button>Log out</button></a>
                </header>
                <div className="dash-main-container">
                <div className="graph-wrapper">
                <Graph/>
                </div>
                <div className="team-rankings">
                {teamsBox}
                </div>
                <div className="suggestion-rankings">
                {suggBox}
                </div>
                <div>
                <Link to='/addSuggestion'><img className="add-suggestion"src={addSuggestion} alt="add suggestion" /></Link>
                </div>
                </div>
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






// const suggestion = {
//     name: '',
//     assigned_team: '',
//     numberofpoints: 0,
//     id: 0,
//     liked: false,

// }

//delete - will send suggestion id
//like - needs to know if its liked or not and will update sends userid and suggestionid
// let body = { liked? = true / false based on suggestion object, suggestion_id: id, votes: initialVal, incrementer: incrementer }
//  axios.put('/like', body).then(res => {
// this.props.getSuggestions(res.data)
// this.props.getUser(res.data)

// ---- controller -----
    // removeLike: (req, res) => {
        // const db = req.app.get('db');
        // let newVotes = 0;
        // let newArr = [...req.user.voted]
//          if(req.body.liked) {
    // newVotes = req.body.votes -= req.body.incrementer
    // newArr.splice(newArr.indexOf(params.id), 1)
// } else { newVotes = req.body.votes += req.body.incrementer
// newArr.push(params.id)
// };
        // const {suggestion_id} = req.body;
        // db.addLike(newVotes, suggestion_id, newArr, req.user.user_id).then(suggestions => res.status(200).send(suggestions))
// })
// -------SQL---------
// UPDATE "public"."users" SET "voted"=$3 WHERE "user_id"=$4;
// UPDATE suggestions
// SET votes=$1
// WHERE suggestion_id=$2;
// select * from suggestions;
// 
// 
// 
//commit - needs to know if it has an assigned team needs team id of current user.
//
// 

//     db.updatevotes(adsfadsfas).then(votes => {
//         db.getuser.then(user => {
//             let data = {user, votes}
//             res.status.send(data) 
//         })
//     })
// })
















