import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux'
import {getTeam, getTeamSuggestions} from '../ducks/reducer';

class Team extends Component {
constructor() {
    super();

}


componentDidMount() {
    console.log(this.props.match.params.id)
    axios.get(`/getTeam/${this.props.match.params.id}`).then(res => {
        console.log(res.data)
        this.props.getTeam(res.data)
    })
    axios.get(`/getTeamSuggestions/${this.props.match.params.id}`).then(res => {
        this.props.getTeamSuggestions(res.data)
    })
}

taskCompleted(id, assigned_id) {
    axios.put(`/taskCompleted/${id}/${assigned_id}`).then(res => {
        this.props.getTeamSuggestions(res.data)
    })
}
taskNotCompleted(id, assigned_id) {
    axios.put(`/taskNotCompleted/${id}/${assigned_id}`).then(res => {
        this.props.getTeamSuggestions(res.data)
    })
}

render() {
    let thisTeamSuggestions = this.props.teamSuggestions.map(obj => (
        <div>
            <h1>{obj.suggestion}</h1>
            <h1>{obj.votes}</h1>
            {!obj.completed ?
            <div>
                <h1>Is currently being worked on</h1>
                <button onClick={() => this.taskCompleted(obj.suggestion_id, obj.assigned_id)}>mark as completed</button>
            </div>
            :
            <div>
                <h1>Is completed</h1>
                <button onClick={() => this.taskNotCompleted(obj.suggestion_id, obj.assigned_id)}>mark as NOT completed</button>
            </div>
            }
        </div>
    ))
    let teamName = this.props.team.map(obj => (
        <div>
            <h1>{obj.team_name}</h1>
        </div>
    ))
    return(
        <div>
            {teamName}
            {thisTeamSuggestions}
            <Link to='/dashboard'><button>Back to Dashboard</button></Link>
        </div>
    )
}



}


function mapStateToProps(state) {
    return{
        team: state.team,
        teamSuggestions: state.teamSuggestions
    }
}

export default connect(mapStateToProps, {getTeam, getTeamSuggestions})(Team);