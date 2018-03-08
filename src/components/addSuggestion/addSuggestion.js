import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { typingNewSuggestion } from '../ducks/reducer';

class addSuggestion extends Component {
    constructor() {
        super();

        this.state = {
            toggle: false
        }
    }


    createSuggestion() {
        let body = { suggestion: this.props.newSuggestion, date: '12/12/12', user_id: 1, votes: 0, assigned_id: 1, completed: false };
        axios.post('/addSuggestion', body).then(res => {
            this.setState({
                toggle: true
            })
        })
    }



    render() {
        if(!this.state.toggle) {
        return (
            <div>
                <input onChange={e => this.props.typingNewSuggestion(e.target.value)} placeholder="suggest something"></input>
                {/* need some kind of redirect so that when you click submit it takes you back to the dashboard, but not before the new suggestion has been added and rendered */}
                <button onClick={() => this.createSuggestion()}>submit</button>
                <Link to='/'><button>logout</button></Link>
                <Link to='/dashboard'><button>Back to Dashboard</button></Link>
            </div>
        )
    } else {
        return <Redirect to='/dashboard' />
    }
}



}


function mapStateToProps(state) {
    return {
        newSuggestion: state.newSuggestion
    }
}

export default connect(mapStateToProps, { typingNewSuggestion })(addSuggestion);