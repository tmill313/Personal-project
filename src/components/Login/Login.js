import React, { Component } from 'react';
import {Link} from 'react-router-dom';

export default class Login extends Component {








    render() {
        return (
            <div>
                <h1>Login landing page</h1>
                <a href={ process.env.REACT_APP_LOGIN }><button>Login</button></a>
            </div>
        )
    }
}