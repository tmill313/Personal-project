import React, { Component } from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import teamMember from './team-member_1.svg';
import manager from './Manager.svg';
import executive from './Executive.svg';
import { Image, Header, Dropdown} from 'semantic-ui-react';
import './AssignRole.css'

export default class AssignRole extends Component {
    constructor() {
        super()

        this.state = {
            accessAssigned: false,
            userID: 0,
            position: '',
            access: 0,
            toggle: false

        }
        this.setAccess = this.setAccess.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    componentWillMount() {
        axios.get('/getRole').then(res => {
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

    }
    handleChange(e, data){
        this.setState({
            userID: data.value
        })
    }
    setUser() {
        axios.put(`/setUser/${this.state.userID}/${this.state.position}/${this.state.access}`).then(res => {
            this.setState({
                toggle: true
            })

        })
    }

    setAccess(value) {
        this.setState({
            access: value
        })

    }

    render() {
        const options = [
            { key: 2, text: 'Front-end Fighters', value: 2 },
            { key: 3, text: 'The BROgrammers', value: 3 },
            { key: 4, text: 'Crash Test Dummies', value: 4 },
          ]
        if (this.state.accessAssigned) {
            return <Redirect to='/dashboard' />
        } else {
            if (!this.state.toggle) {
                return (
                    <div>
                        {this.state.position === "Team Member" ?
                            <div>
                                <div>
                                    <Header as='h2' icon textAlign='center'>
                                        <Image size='massive' src={teamMember} circular />
                                        <Header.Content>
                                            Whose your squad?
                                        </Header.Content>
                                    </Header>
                                </div>
                                <div className='icon-holder'>
                                <div>
                                    I run with{' '}
                                    <Dropdown onChange={this.handleChange} inline options={options} defaultValue='2' />
                                    {' '}.
                                </div>
                                <button onClick={() => this.setUser()}>sign-in</button>
                                </div>
                            </div>
                            :
                            this.state.position === "Manager" ?
                                <div>
                                    <div>
                                        <Header size='large' as='h2' icon textAlign='center'>
                                            <Image size='massive' src={manager} circular />
                                            <br />
                                            <Header.Content>
                                                Whose your squad?
                                        </Header.Content>
                                        </Header>
                                    </div>
                                    <div className='icon-holder'>
                                    <div>
                                    I run with{' '}
                                    <Dropdown onChange={this.handleChange} inline options={options} defaultValue='2' />
                                    {' '}.
                                </div>
                                <button onClick={() => this.setUser()}>sign-in</button>
                                    </div>
                                </div>
                                :
                                this.state.position === "Executive" ?
                                    <div>
                                        <div>
                                            <Header as='h2' icon textAlign='center'>
                                                <Image size='massive' src={executive} circular />
                                                <Header.Content>
                                                    Whose your squad?
                                        </Header.Content>
                                            </Header>
                                        </div>
                                        <div className='icon-holder'>
                                        <div>
                                    I run with{' '}
                                    <Dropdown onChange={this.handleChange} inline options={options} defaultValue='2' />
                                    {' '}.
                                </div>
                                <button onClick={() => this.setUser()}>sign-in</button>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <div className='header-text'>
                                            <Header size='huge' as='h1' textAlign='center'>
                                                What is your role?
                                        </Header>
                                        </div>
                                        <div className='icon-holder'>
                                            <h3 className='icon-tag-team'>Team-Member</h3>
                                            <Image className='icon-image-team' size='large' onClick={() => this.clickTeamMember(1)} src={teamMember} alt="team-member" />
                                            <h3 className='icon-tag-manager'>Manager</h3>
                                            <Image className='icon-image-manager' size='large' onClick={() => this.clickManager(2)} src={manager} alt="manager" />
                                            <h3 className='icon-tag-executive'>Executive</h3>
                                            <Image className='icon-image-executive' size='large' onClick={() => this.clickExecutive(3)} src={executive} alt="executive" />
                                        </div>
                                    </div>
                        }


                    </div>
                )
            } else {
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















