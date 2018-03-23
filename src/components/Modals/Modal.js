
import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from "react-redux";
import { Modal, Input, Grid, Icon, Button, Transition, Image } from "semantic-ui-react";
import iconImage from './Asset 5.svg';
import { closeModal, typingNewSuggestion, getSuggestions, getUser } from "../ducks/reducer";
import './Modal.css'

export class ModalManager extends Component {
    constructor() {
        super();

        this.state = {
            toggle: false
        }
    }
    componentDidMount() {
        axios.get('/auth/me').then(res => {
            this.props.getUser(res.data)
        })
    }

    createSuggestion() {
        let body = { suggestion: this.props.newSuggestion, date: '12/12/12', user_id: this.props.user.user_id, votes: 0, assigned_id: 1, completed: false };
        axios.post('/addSuggestion', body).then(res => {
            console.log(res.data)
            this.props.getSuggestions(res.data)
            this.props.closeModal()
        })
    }
    onKeyPress = e => {
        if(e.key === 'Enter') {
            this.createSuggestion()
        }  
    }

    render() {
        let remainingChar = 300 - this.props.newSuggestion.length;
        const { modalConfiguration } = this.props;

        const defaultProps = {
            defaultOpen: true,
            closeIcon: false,
            onClose: this.props.closeModal
        };
        const inlineStyle = {
            modal: {
                marginTop: '0 !important',
                marginLeft: 'auto',
                marginRight: 'auto'
            }
        };

        let renderedComponent;

        if (modalConfiguration) {
            const { modalProps = {} } = modalConfiguration;
            renderedComponent =
                <Modal dimmer='inverted' style={inlineStyle.modal}{...Object.assign({}, modalProps, defaultProps)}><Modal.Content>
                    <Image fluid src={iconImage}/>
                    <Input fluid focus onChange={e => this.props.typingNewSuggestion(e.target.value)} onKeyPress={e => this.onKeyPress(e)}
                    action={{ color: 'red', icon: 'plus square outline', onClick:() => this.createSuggestion() }}
                    actionPosition='right'
                    placeholder='Type your killer suggestion here.'/>
                    {(remainingChar > 295)
                    ?
                    <p className='encouragement'>You have {remainingChar} characters to convince us to institute Mocha-Frappe-Latte Fridays, every day of the week.</p>
                    :
                    (remainingChar > 250)
                    ?
                    <p className='encouragement'>Keep going.  All of our Mocha-Frappe dreams are riding on this.</p>
                    :
                    (remainingChar > 225)
                    ?
                    <p className='encouragement'>You are a wizard of words, my friend.</p>
                    :
                    (remainingChar > 10)
                    ?
                    <p className='encouragement'>It's official.  You have made the world a better place.</p>
                    :
                    <p className='encouragement'>You've got {remainingChar} more characters. Make 'em count.</p>
                    }
                </Modal.Content>
                </Modal>;
        }
        return <span>{renderedComponent}</span>;
    }

}

function mapStateToProps(state) {
    return {
        modalConfiguration: state.modalProps,
        newSuggestion: state.newSuggestion, 
        user: state.user
    };
}

export default connect(mapStateToProps, { closeModal, typingNewSuggestion, getSuggestions, getUser })(ModalManager);