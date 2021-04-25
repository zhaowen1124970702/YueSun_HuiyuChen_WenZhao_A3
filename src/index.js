import React from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App';
import Login from './Component/Login';
import Post from './Component/Post';
import './index.css';
import CreatePost from './Component/CreatePost';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function getParams(location) {
  const searchParams = new URLSearchParams(location.search);
  return searchParams.get("id") || "not found";
}

ReactDOM.render(
        
        <Router>

        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/createPost">
            <CreatePost/>
          </Route>
          <Route path="/post" render = {({location}) => {
            const query = getParams(location);
            return <Post query={query} />;
          }} />
          <Route render={() => <h1>Not found!</h1>} />
        </Switch>
      
    </Router>
        
        , document.getElementById('root'));
