import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';

export default class AssignRole extends Component {
    constructor() {
        super()

        this.state = {
            accessAssigned: false,
            teamID: 0,
            position: '',
            access: 0,
            toggle: false

        }
        this.setAccess=this.setAccess.bind(this)
    }

    componentWillMount() {
        axios.get('/getRole').then(res => {
            console.log(res.data)
            if (res.data[0].access) {
                this.setState({
                    accessAssigned: true
                })
            }
        })
    }

    clickTeamMember() {
        this.setState({
            position: 'Team Member',
            access: 1
        })
    }

    clickManager() {
        this.setState({
            position: 'Manager',
            access: 2
        })
    }

    clickExecutive() {
        this.setState({
            position: 'Executive',
            access: 3
        })
        console.log(this.state.position)
        console.log(this.state.access)
    }
    handleChange(e) {
        this.setState({
            teamID: e
        })
        console.log(this.state.teamID)
    }
    setUser() {
        axios.put(`/setUser/${this.state.teamID}/${this.state.position}/${this.state.access}`).then(res => {
            this.setState({
                toggle: true
            })
            console.log(this.state.toggle)
        })
    }

    setAccess(value) {
        this.setState({
            access: value
        })
        console.log(this.state.access)
    }

    render() {

        if (this.state.accessAssigned) {
            return <Redirect to='/dashboard' />
        } else {
            if(!this.state.toggle){
            return (
                <div>
                    {this.state.position === "Team Member" ?
                        <div>
                            <h1>Tell us about yourself</h1>
                            <button>Team-Member</button>
                            <h3>Team-ID</h3>
                            <input onChange={e => this.handleChange(e.target.value)}></input>
                            <button onClick={() => this.setUser()}>sign in</button>
                        </div>
                        :
                        this.state.position === "Manager" ?
                            <div>
                                <h1>Tell us about yourself</h1>
                                <button>Manager</button>
                                <h3>Team-ID</h3>
                                <input onChange={e => this.handleChange(e.target.value)}></input>
                                <button onClick={() => this.setUser()}>sign in</button>
                            </div>
                            :
                            this.state.position === "Executive" ?
                                <div>
                                    <h1>Tell us about yourself</h1>
                                    <button>Executive</button>
                                    <h3>Team-ID</h3>
                                    <input onChange={e => this.handleChange(e.target.value)}></input>
                                    <button onClick={() => this.setUser()}>sign in</button>
                                </div>
                                :
                                <div>
                                    <h1>What is your role?</h1>
                                    <button onClick={() => this.clickTeamMember(1)}>Team-Member</button>
                                    <button onClick={() => this.clickManager(2)}>Manager</button>
                                    <button onClick={() => this.clickExecutive(3)}>Executive</button>
                                    <Link to='/dashboard'><button>Dashboard</button></Link>
                                </div>
                    }


                </div>
            )} else {
                return <Redirect to='/dashboard' />
            }

        }
    }


}



// setAccess(val) {
//     this.setState({
//         access: value
//     })
// }
// will just pass in a value 1,2 or 3 on click.















