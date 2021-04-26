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

    enterSinglePost = (post) => {
        if(post.URL) {
            window.location.href = post.URL;
        }
        else{
            window.location.href = "post?id=" + post._id;
        } 
    }

    redirectToCreatePost(){
        window.location.href = '/CreatePost';
    }

    showCreatePost(){
        if(this.state.loginUser){
            return(
                <div className="createButton" onClick = {()=>this.redirectToCreatePost()} >
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
                <Navbar></Navbar>
                {this.showCreatePost()}
                <div className="container">
                      {this.state.postList.map((singlePost,index)=>
                      <div className="postBlock">
                        <h3 className="title" key={index} onClick={() => this.enterSinglePost(singlePost)}>{singlePost.title}</h3>
                        <div className="titleDetail">
                            <div className="timeStyle2">{singlePost.postTime.slice(0,10) + " " +singlePost.postTime.slice(11,19) }</div>
                            <div className="commentsStyle" onClick = {()=>this.directToComment(singlePost)}> |  Comments</div>
                        </div>

                      </div>)}
                </div>
            </div>

        )
    }
}