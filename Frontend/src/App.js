import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import CommentsList from './components/CommentsList';

import About from './components/About';

import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login';
import Register from './components/Register';

class App extends Component {
  render() {
    return (
      <Router>

        <div className="container">
          <nav className="navbar navbar-expand-sm bg-light">

            
            <ul className="navbar-nav">
            <li className="nav-item">
            <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              
            </ul>

          </nav>

          <Route path="/" exact component={CommentsList} ></Route>
          
          <Route path="/about" component={About} ></Route>
          <Route path="/login" component={Login} ></Route>
          <Route path="/register" component={Register} ></Route>
        </div >





      </Router>

    );
  }
}

export default App;
