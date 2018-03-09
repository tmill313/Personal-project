import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Login.css'
import suggestionLogo from './sugg-logo-2.svg'

export default class Login extends Component {








    render() {
        return (
            <div className="login-background">
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
            <div className="main-body-container">
                <section className="section">
                <div className="section-1-main">
                    <h1 className="login-h">Be Heard.</h1>
                    <h5 className="login-h">Suggestionbox - the easiest<br />
                    way to empower the talent<br />
                    you’ve worked so hard to hire.</h5>
                <a href={process.env.REACT_APP_LOGIN}><button className="login-button">Get Started</button></a>
                </div>
                </section>
                <section className="section"></section>
                <section className="section"></section>
                <section className="section"></section>
                <section className="section"></section>
            </div>
            </div>
        )
    }
}