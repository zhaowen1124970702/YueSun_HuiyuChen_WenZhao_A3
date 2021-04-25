import './App.css';
import React from 'react';
import Axios from 'axios';

const jwt = require('jsonwebtoken');


export default class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginUser: null
        }
    }


    componentDidMount() {

        Axios.get('/api/login/cookie')
            .then((response) => {
                this.setState({
                    loginUser: response.data
                })
            })
            .catch((error) => {
                this.setState({
                    loginUser: null
                })
        })

    }

    componentDidUpdate() {
    }

    redirectToLogin(){
        window.location.href = '/login';
    }

    logOut(){
        Axios.post('/api/login/logOut')
            .then((response) => {
                this.setState({
                    loginUser: null
                })
            })
            .catch((error) => {
        })
        window.location.href = '/';
    }

    showNavComponent() {
        if(!this.state.loginUser) {
            return(
                <div>
                    <div onClick={() => this.redirectToLogin()}>Log In / Sign Up</div>
                </div>
            )
        } else {
            return(
                <div>
                    <h2>Welcome : {this.state.loginUser}</h2>
                    <div onClick={() => this.logOut()}>Logout</div>
                </div>
            )
        }
    }

    redirectToHomePage(){
        window.location.href = '/';
    }



    render() {
        return (
            <div>
                <div onClick={() => this.redirectToHomePage()}>Home</div>
                {this.showNavComponent()}
            </div>

        )
    }

}