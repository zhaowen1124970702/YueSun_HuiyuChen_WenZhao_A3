import React from 'react';
import Comment from './Comment';
import Axios from 'axios';
import Navbar from './Navbar';
import "./Post.css";


export default class Post extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            idForQuery : props.query,
            loginUser: null,
            currentPost : null,
            allComments : [],
            newComment : "",
            editing: false,
            message:"",
            title:"",
            URL:"",
            content:""
        }
    }

    getParams(location) {
        const searchParams = new URLSearchParams(location.search);
        return {
          query: searchParams.get("query") || ""
        };
      }

    
    componentWillMount(){
        Axios.get('/api/post/' + this.state.idForQuery)
            .then((response) => {
                if(!response.data._id){
                    window.location.href = "/";
                }
                })
            .catch(error => console.error(error));

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

        Axios.get('/api/post/' + this.state.idForQuery)
            .then((response) => {
                this.setState({
                    currentPost: response.data,
                    title: response.data.title,
                    username: response.data.username,
                    URL: response.data.URL,
                    content: response.data.content
            })})
            .catch(error => console.error(error));

        Axios.get('/api/comment/' + this.state.idForQuery)
        .then(
            (response) => {
                this.setState({
                    allComments: response.data
                })})
        .catch(error => {
            console.error(error);
            this.setState({
                allComments: []
            })    
        });

    }

    componentDidUpdate() {
    }

    
    submitDelete(){
        Axios.delete('/api/post/' + this.state.currentPost._id)
            .catch((error) => {
                this.setState( {
                    message: "Fail to delete post"
                })
            })
        
        Axios.delete('/api/comment/' + this.state.currentPost._id)
            .then((response) => {
                window.location.href ="/";
            })
            .catch((error) => {
                this.setState( {
                    message: "Fail to delete all comments"
                })
            })
        
    }

    showEditandDelete(){
        if(this.state.loginUser === this.state.currentPost.username){
            return(
                <div className="editDeleyeDetail">
                    <div className="editStyle" onClick={() => this.changeToEditingMode()}>
                        Edit
                    </div>
                    <div className="deleteStyle" onClick={() => this.submitDelete()}>
                        Delete
                    </div>
                </div>
            
            )
        }
    }

    jump2Post(){
        if(this.state.URL){
            window.location.href = this.state.URL
        }
    }

    showPost(){
        if(!this.state.editing){
            return(
                <div className="container">
                    <div className="titleStyle">Title: {this.state.currentPost.title}</div>
                    <div className="postInforStyle">
                        <div className="editorStyle">{this.state.currentPost.username}</div>
                        <div className="timeStyle">{this.state.currentPost.postTime.slice(0,10) + " " + this.state.currentPost.postTime.slice(11,19) }</div>
                        <div className="timeStyle">{this.state.allComments.length} comments</div>
                        <div >{this.showEditandDelete()}</div>
                    </div>
                    <div className="titleStyle">URL:</div>
                    <div className="URLStyle" onClick={() => this.jump2Post()}>{this.state.currentPost.URL}</div>
                    <div className="titleStyle">OR</div>
                    <div className="titleStyle">Content:</div>
                    <div className="inputStyle2">{this.state.currentPost.content}</div>
                    {this.displayErrorMessage()}
                    {this.showAddSubmit()}
                    {this.showComments()}
                </div>
            )
        }else{
            return(
                <div className="container">
                    <label className="titleStyle">Title:</label>
                    <div className="postInforStyle2">
                        <div className="editorStyle"></div>{this.state.currentPost.username}
                        <div className="timeStyle"> {this.state.currentPost.postTime.slice(0,10) + " " + this.state.currentPost.postTime.slice(11,19) } </div>
                    </div>
                    <textarea className="inputStyle" type="text" value={this.state.title} onChange={e => this.setState({title: e.target.value})}></textarea>

                    <label className="titleStyle">URL:</label>
                    <textarea className="inputStyle" type="text" value={this.state.URL} onChange={e => this.setState({URL: e.target.value})}></textarea>
                    
                    <div className="titleStyle">OR</div>
                    
                    <label className="titleStyle">Content:</label>
                    <textarea className="contentStyle" type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></textarea>
                    
                    <div className="createButton" onClick={() => this.submitEdit()}>Submit Edit</div>
                    
                    {this.showAddSubmit()}
                    {this.displayErrorMessage()}
                    {this.showComments()}
                </div>
            )
        }
    }

    submitEdit(){
        const newPost ={}
        newPost._id = this.state.currentPost._id;
        newPost.title = this.state.title;
        newPost.URL = this.state.URL;
        newPost.content = this.state.content;

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

        Axios.put('/api/post', newPost)
        .then((response) => {
            const postID = response.data._id;
            window.location.href = "post?id=" + postID;
        })
        .catch((error) => {
            this.setState( {
                message: "Fail to update Post"
            })
        })
    }

    changeToEditingMode(){
        this.setState( {
            editing:true
        })
    }


    submitAddNewComment(){
        const newComment = {
            editorUsername:this.state.loginUser,
            postID:this.state.idForQuery,
            content : this.state.newComment
        }
        if(this.state.newComment){
            Axios.post('/api/comment', newComment)
            .then((response) => {
                window.location.href = "post?id=" + this.state.idForQuery;
            })
            .catch((error) => {
                this.setState( {
                    message: "Fail to add new comment!  Please try log in / sign up!"
                })
            })
        }
    }

    showAddSubmit(){
        return(
            <div >
                <textarea className="inputStyle" type="text" value={this.state.newComment} onChange={e => this.setState({newComment: e.target.value})}></textarea>
                <div className="createButton" onClick={() => this.submitAddNewComment()}>Add Comments</div>
            </div>
        )
    }

    displayErrorMessage(){
        if(this.state.message){
            return (
                <div className="messageStyle">{this.state.message}</div>
            )
        }  
    }

    showComments(){
        return (
            <div >
                {this.state.allComments.reverse().map((singleComment, index)=><Comment key ={index} comment ={singleComment} loginUser = {this.state.loginUser}></Comment>)}
            </div>
        )
    }

    render() {
        if(!this.state.currentPost){
            return null;
        }
        return (
            <div>
                <Navbar></Navbar>
                {this.showPost()}
            </div>
        )
    }
}