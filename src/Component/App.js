import './App.css';
import React from 'react';
import Axios from 'axios';
import Navbar from './Navbar';

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            postList: [],
            loginUser: null

        }
    }

    navbarDisplay() {
        if(this.state.loginUser){
            return (
                <div className="navBar">
                    <h1>Home Page</h1>
                    <div>{this.state.loginUser}</div>
                    <div>Create New Post</div>
                    <button>Logout</button>
                </div>
            )
        }else{
            return (
                <div className="navBar">
                    <h1>Home Page</h1>
                    <button>Login</button>
                </div>
            )
        }
    }

    componentDidMount() {
        Axios.get('/api/post')
            .then((response) => {
                this.setState({
                    postList: response.data.reverse(),
            })})
            .catch(error => console.error(error));

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


    enterSinglePost = (post) => {
        if(post.URL) {
            window.location.href = post.URL;
        }
        else{
            // window.location.href = "post.aspx?id=" + post._id;
            window.location.href = "post?id=" + post._id;
        } 
    }

    redirectToCreatePost(){
        window.location.href = '/CreatePost';
    }

    showCreatePost(){
        if(this.state.loginUser){
            return(
                <div onClick = {()=>this.redirectToCreatePost()} >
                    Create New Post
                </div>
            )
        }else{
            return(
                <div></div>
            )
        }
    }

    directToComment(post){
        return window.location.href = "post?id=" + post._id;
    }

    render() {
        return (
            <div>
                <h2>Home Page</h2>
                <Navbar></Navbar>
                {this.showCreatePost()}
                <div className="container">
                      {this.state.postList.map((singlePost,index)=>
                      <div>
                        <h3 className="title" key={index} onClick={() => this.enterSinglePost(singlePost)}>{singlePost.title}</h3>
                        <h4>{singlePost.postTime.slice(0,10) + " " +singlePost.postTime.slice(11,19) }</h4>
                        <div className="commentsStyle" onClick = {()=>this.directToComment(singlePost)}>Comments</div>
                      </div>)}
                </div>
            </div>

        )
    }
}