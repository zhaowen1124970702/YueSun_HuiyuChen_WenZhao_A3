import React from 'react';
import Axios from 'axios';

export default class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            username1: '',
            password1: '',
            username2: '',
            password2: '',
            message: ''
        }
    }

    // componentDidMount() {
    //     Axios.get('/api/login')
    //         .then((response) => {
    //             this.setState({
    //                 users: response.data,
    //         })})
    //         .catch(error => console.error(error));
    // }

    // componentDidUpdate() {
    // }

    onSubmit() {
        const newPerson = { 
            "username": this.state.username1,
            "password": this.state.password1
        };

        if(!newPerson.username || !newPerson.password){
            this.setState({
                message: "Must have username and password"
            })
            return
        }

        Axios.post('/api/login/register', newPerson)
            .then((response) => {
                window.location.href = '/';
            })
            .catch((error) => {
                this.setState( {
                    message: "Try another name"
                })
            })
    }

    onClick() {
        const person = { 
            "username": this.state.username2,
            "password": this.state.password2
        };

        if(!person.username || !person.password){
            this.setState({
                message: "Must have username and password"
            })
            return
        }

        Axios.post('/api/login/verify', person)
            .then( (response) => {
                window.location.href = '/';
            })
            .catch((error) => {
                this.setState( {
                    message: "Fail login"
                })
            })
    }

    displayErrorMessage(){
        if(this.state.message){
            return this.state.message
        }else{
            return ""
        }
    }

    redirectToHomePage(){
        window.location.href = '/';
    }

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                <div onClick={() => this.redirectToHomePage()}>Home</div>

                <h2>Register</h2>
                <label >Username:</label>
                <input type="text" value={this.state.username1} onChange={e => this.setState({username1: e.target.value})}></input>
                <label >Password:</label>
                <input type="password" value={this.state.password1} onChange={e => this.setState({password1: e.target.value})}></input>
                <div onClick={() => this.onSubmit()}>Register</div>

                <h2>Login</h2>
                <label >Username:</label>
                <input type="text" value={this.state.username2} onChange={e => this.setState({username2: e.target.value})}></input>
                <label >Password:</label>
                <input type="password" value={this.state.password2} onChange={e => this.setState({password2: e.target.value})}></input>
                <div onClick={() => this.onClick()}>Login</div>

                <div>{this.displayErrorMessage()}</div>
            </div>

        )
    }
}