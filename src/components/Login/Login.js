import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import suggestionLogo from './new-white-logo.svg'
import exampleImage from './example-image.svg'
import {Visibility} from 'semantic-ui-react';

export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            calculations: {
                pixelsPassed: 0
            }
        }
    }


    handleUpdate = (e, { calculations }) => this.setState({ calculations })





    render() {
        return (
            <div className="login-background">
            {this.state.calculations.pixelsPassed < 680
            ?
            <header className="login-header">
                        <div className="header-logo">
            <img src={suggestionLogo} alt="logo" />
            </div>
                <ul className="header-list">
                    <li className="flex-item">About</li>
                    <li className="flex-item">Pricing</li>
                    <a href={process.env.REACT_APP_LOGIN}><button className="header-login">Sign in</button></a>
                </ul>
            </header>
            :
            <header className="toggled-login-header">
            <div className="header-logo">
            <img src={suggestionLogo} alt="logo" />
            </div>
                <ul className="header-list">
                    <li className="flex-item">About</li>
                    <li className="flex-item">Pricing</li>
                    <a href={process.env.REACT_APP_LOGIN}><button className="header-login">Sign in</button></a>
                </ul>
            </header>}
            {/* <div className="main-body-container"> */}
            <Visibility className="main-body-container" onUpdate={this.handleUpdate}>
                <section className="section">
                <div className="section-1-main">
                    <h1 className="login-h">Be Heard.</h1>
                    <h5 className="login-h">Suggestionbox - the easiest<br />
                    way to empower the talent<br />
                    you’ve worked so hard to hire.</h5>
                <a href={process.env.REACT_APP_LOGIN}><button className="login-button">Get Started</button></a>
                </div>
                </section>
                <section className="section">
                <img className='example-image' src={exampleImage} alt="ex image" />
                <div className='middle-text'>
                    <h3>Improve your business from the inside out.
                        <br />
                        <br />
                        Get insight from the experts,
                        <br />
                        who just happen to be your employees.
                    </h3>
                </div>
                </section>
                <section className="section"></section>
                <section className="section"></section>
                <section className="section"></section>
                </Visibility>
                {/* </div> */}
            </div>
        )
    }
}