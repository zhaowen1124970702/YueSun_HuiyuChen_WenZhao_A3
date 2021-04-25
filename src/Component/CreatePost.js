import Navbar from "./Navbar";
import React from 'react';
import Axios from 'axios';

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
            <div>
                <Navbar></Navbar>
                <h1>Create New Post</h1>
                <form>
                <label >Title</label>
                <input type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})}></input>
                <label >URL</label>
                <input type="text" value={this.state.URL} onChange={e => this.setState({URL: e.target.value})}></input>
                <h4>OR</h4>
                <label >content</label>
                <input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input>
                <div onClick={() => this.onSubmit()}>Create</div>
                </form>
                <div>{this.displayErrorMessage()}</div>

            </div>

        )
    }
}