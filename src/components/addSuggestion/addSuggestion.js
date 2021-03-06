import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux'
import { typingNewSuggestion } from '../ducks/reducer';
import './addSuggestion.css'

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
        let remainingChar = 300 - this.props.newSuggestion.length;
        if(!this.state.toggle) {
        return (
            <div>
                <input className="suggestion-input"onChange={e => this.props.typingNewSuggestion(e.target.value)} placeholder="suggest something" type="text" maxlength="300"></input>
                <p>you have {remainingChar} characters remaining</p>
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