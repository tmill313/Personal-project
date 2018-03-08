import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { getTeam, getTeamSuggestions } from '../ducks/reducer';
import './Team.css'

class Team extends Component {
    constructor() {
        super();

    }


    componentDidMount() {
        axios.get(`/getTeam/${this.props.match.params.id}`).then(res => {
            this.props.getTeam(res.data)
        })
        axios.get(`/getTeamSuggestions/${this.props.match.params.id}`).then(res => {
            this.props.getTeamSuggestions(res.data.teamSuggestions)
        })
    }
    completion(completed_votes, completed, id, assigned_id, votes) {
        axios.put(`/completion/${id}/${assigned_id}/${votes}/${!completed}/${completed_votes}`).then(res => {
            this.props.getTeamSuggestions(res.data.teamSuggestions)
            this.props.getTeam(res.data.team)
        })
    }

    render() {
        let thisTeamSuggestions = this.props.teamSuggestions.map(obj => (
            this.props.user.access === 2 || this.props.user.access === 3 ?
            <div>
                {!obj.completed ?
                    <div className="task_not_completed_div">
                        <h1>{obj.suggestion}</h1>
                        <h1>votes: {obj.votes}</h1>
                        <h1>Is currently being worked on</h1>
                        <button onClick={() => this.completion(this.props.team.completed_votes, obj.completed, obj.suggestion_id, obj.assigned_id, obj.votes)}>mark as completed</button>
                    </div>
                    :
                    <div className="task_completed_div">
                        <h1>{obj.suggestion}</h1>
                        <h1>votes: {obj.votes}</h1>
                        <h1>Is completed</h1>
                        <button onClick={() => this.completion(this.props.team.completed_votes, obj.completed, obj.suggestion_id, obj.assigned_id, obj.votes)}>mark as NOT completed</button>
                    </div>
                }
            </div>
            :
            <div>
            {!obj.completed ?
                <div className="task_not_completed_div">
                    <h1>{obj.suggestion}</h1>
                    <h1>votes: {obj.votes}</h1>
                    <h1>Is currently being worked on</h1>
                </div>
                :
                <div className="task_completed_div">
                    <h1>{obj.suggestion}</h1>
                    <h1>votes: {obj.votes}</h1>
                    <h1>Is completed</h1>
                </div>
            }
        </div>
        ))
        let teamName = 
            <div>
                <h1>{this.props.team.team_name}</h1>
                <h1>Completed votes: {this.props.team.completed_votes}</h1>
            </div>
    
        return (
            <div>
                <Link to='/dashboard'><button>Back to Dashboard</button></Link>
                {teamName}
                {thisTeamSuggestions}
            </div>
        )
    }



}


function mapStateToProps(state) {
    return {
        team: state.team,
        teamSuggestions: state.teamSuggestions,
        user: state.user
    }
}

export default connect(mapStateToProps, { getTeam, getTeamSuggestions })(Team);








//--------taskcompleted/notcompleted ---------
// task(completed, id, assigned_id, votes) {
//         axios.put(`/taskCompleted/${id}/${assigned_id}/${votes}/${!completed}`).then(res => {
//             this.props.getTeamSuggestions(res.data)
//         })
// }
// --------------- controller --------------
// task: (req, res) => {
//     const db= req.app.get('db');
        // let sign = '';
//      req.params.completed ? sign = + : sign = -;
//     const{params} = req;
//     db.taskNotCompleted([params.id, params.assigned_id, params.votes, params.completed, sign]).then(teamSuggestions => res.status(200).send(teamSuggestions))
// }
// ---------------SQL-------------------
// UPDATE "public"."suggestions" SET "completed"=$4 WHERE 
// "suggestion_id"= $1;
// UPDATE "public"."teams" SET "completed_votes"= completed_votes $5 $3 WHERE "id"=$2;
// select * from suggestions where assigned_id = $2
// order by completed;


