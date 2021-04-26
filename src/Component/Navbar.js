import './App.css';
import React from 'react';
import Axios from 'axios';
import './Navbar.css';
import {ReactComponent as HomeIcon} from '../homeIcon.svg';

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
                <div className="navbarContainer">
                    <HomeIcon className="icon"/>
                    <div className="websiteName" onClick={() => this.redirectToHomePage()}>Fur Families News</div>
                    <div className="logInButtion" onClick={() => this.redirectToLogin()}>LOGIN / SIGN UP</div>
                    
                </div>
            )
        } else {
            return(
                <div className="navbarContainer">
                    <HomeIcon className="icon"/>
                    <div className="websiteName"  onClick={() => this.redirectToHomePage()}>Fur Families News</div>
                    <div className="userContainer">
                        <div className="userInfo">{this.state.loginUser}</div>
                        <div className="logoutButtion" onClick={() => this.logOut()}>LOGOUT</div>
                    </div>
                </div>
            )
        }
    }

    redirectToHomePage(){
        window.location.href = '/';
    }



    render() {
        return (
            <div >
                {this.showNavComponent()}
            </div>

        )
    }

}