
import React, { Component } from "react";
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from "react-redux";
import { Modal, Input, Grid, Icon, Button, Transition } from "semantic-ui-react";

import { closeModal, typingNewSuggestion, getSuggestions } from "../ducks/reducer";

export class ModalManager extends Component {
    constructor() {
        super();

        this.state = {
            toggle: false
        }
    }


    createSuggestion() {
        let body = { suggestion: this.props.newSuggestion, date: '12/12/12', user_id: 1, votes: 0, assigned_id: 1, completed: false };
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
            closeIcon: true,
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
                    <p>Your inbox is getting full, would you like us to enable automatic archiving of old messages?</p>
                    <div>
                    <Input fluid focus onChange={e => this.props.typingNewSuggestion(e.target.value)} onKeyPress={e => this.onKeyPress(e)}/>
                    <Button labelPosition='left' icon onClick={() => this.createSuggestion()}><Icon name='plus square outline' /> Submit</Button>
                    </div>
                    <p>you have {remainingChar} characters remaining</p>
                </Modal.Content>
                </Modal>;
        }
        return <span>{renderedComponent}</span>;
    }

}

function mapStateToProps(state) {
    return {
        modalConfiguration: state.modalProps,
        newSuggestion: state.newSuggestion
    };
}

export default connect(mapStateToProps, { closeModal, typingNewSuggestion, getSuggestions })(ModalManager);