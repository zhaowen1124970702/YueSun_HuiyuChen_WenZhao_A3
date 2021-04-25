import './App.css';
import React from 'react';
import Axios from 'axios';

export default class Comment extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loginUser: this.props.loginUser,
            content: this.props.comment.content,
            comment:this.props.comment,
            editing: false,
            message:''
        }
    }

    submitEdit(){
        if(!this.state.content){
            return this.setState({
                message: "Comment cant be empty!"
            })    
        }
        const newComment = this.state.comment
        newComment.content = this.state.content
        Axios.put('/api/comment', newComment)
            .then((response) => {
                window.location.href = "post?id=" + this.state.comment.postID;
            })
            .catch((error) => {
                this.setState( {
                    message: "Fail to edit comment"
                })
            })
    

    }

    submitDelete(){
        Axios.delete('/api/comment/single/' + this.state.comment._id)
            .then((response) => {
                window.location.href ="/post?id=" + this.state.comment.postID;
            })
            .catch((error) => {
                this.setState( {
                    message: "Fail to delete comment"
                })
            })
    }

    changeToEditingMode(){
        this.setState( {
            editing:true
        })

    }

    showEditandDelete(){
        if(this.state.loginUser === this.state.comment.editorUsername){
            return(
                <div>
                    <div onClick={() => this.changeToEditingMode()}>
                        Edit
                    </div>
                    <div onClick={() => this.submitDelete()}>
                        Delete
                    </div>
                </div>
            
            )
        }
    }


    showContent(){
        if(!this.state.editing){
            return(
                <div>
                    {this.state.comment.content}
                </div>
            )
        }else{
            return(
                <div>
                    <h2>editingNow</h2>
                    <input type="text" value={this.state.content} onChange={e => this.setState({content: e.target.value})}></input>
                    <div onClick={() => this.submitEdit()}>Submit</div>

                </div>
            )
        }
    }

    displayErrorMessage(){
        if(this.state.message){
            return this.state.message
        }  
    }

    render() {
        return (
            <div>
                <h2>{JSON.stringify(this.state.editing)}</h2>
                <div>{this.state.comment.editorUsername}</div>
                <div>Comment Time: {this.state.comment.postTime.slice(0,10) + " " + this.state.comment.postTime.slice(11,19)}</div>
                {this.showContent()}
                {this.showEditandDelete()}
                {this.displayErrorMessage()}
            </div>

        )
    }
}