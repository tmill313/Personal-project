import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class addSuggestion extends Component {
constructor() {
    super();

    this.state = {
        newSuggestion: ''
    }
}

typingSuggestion(e) {
    this.setState({
        newSuggestion: e
    })
}

createSuggestion() {
    let body = {suggestion: this.state.newSuggestion, date: '12/12/12', userid: 'tm10', votes: 0, assignedid: 'none', completes: 'no'};
    axios.post('/addSuggestion', body).then(res => {

    })
}



render() {
    return(
        <div>
            <input onChange={e => this.typingSuggestion(e.target.value)}placeholder="suggest something"></input>
            {console.log(this.state.newSuggestion)}
            {/* need some kind of redirect so that when you click submit it takes you back to the dashboard, but not before the new suggestion has been added and rendered */}
            <button onClick={ () => this.createSuggestion()}>submit</button>
            <Link to='/'><button>logout</button></Link>
            <Link to='/dashboard'><button>Back to Dashboard</button></Link>
        </div>
    )
}








}