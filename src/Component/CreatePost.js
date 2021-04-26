import Navbar from "./Navbar";
import React from 'react';
import Axios from 'axios';
import './CreatePost.css';

export default class CreatePost extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: '',
            URL: '',
            message:''
        }
    }

    onSubmit() {
        const newPost = { 
            "title": this.state.title,
            "content": this.state.content,
            "URL": this.state.URL
        };

        if((!newPost.content && !newPost.URL) || (newPost.content && newPost.URL)){
            this.setState({
                message: "Only need URL or Content"
            })
            return
        }

        if(!newPost.title){
            return this.setState({
                message: "Please input title for the new post"
            })
        }

        Axios.post('/api/post', newPost)
        .then((response) => {
            const postID = response.data._id;
            window.location.href = "post?id=" + postID;
        })
        .catch((error) => {
            this.setState( {
                message: "Fail to create new Post"
            })
        })
    }

    displayErrorMessage(){
        if(this.state.message){
            return this.state.message
        }  
    }

    render() {
        return (
            <div className="outline">
                <Navbar></Navbar>
                <form className="container">
                <div className="headerStyle">Create New Post</div>
                <label className="titleStyle">Title</label>
                <textarea type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})} className="inputStyle"></textarea>
                <label className="titleStyle">URL</label>
                <textarea type="text" value={this.state.URL} onChange={e => this.setState({URL: e.target.value})} className="inputStyle"></textarea>
                <div className="titleStyle">OR</div>
                <label className="titleStyle">Content</label>
                <textarea cols="40" rows="5" value={this.state.content} onChange={e => this.setState({content: e.target.value})} className="contentStyle"></textarea>
                <div onClick={() => this.onSubmit()} className="createButton">Create</div>
                <div className="messageStyle">{this.displayErrorMessage()}</div>
                </form>
            </div>

        )
    }
}