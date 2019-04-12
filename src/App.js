import React, { Component } from 'react';
import './App.css';
import firebase from './component/Firebase'
import {BrowserRouter as Router ,Route} from 'react-router-dom';
import Dashboard from "./Dashboard";
import Signin from "./Signin";

class App extends Component {

    constructor(props){
        super(props);

    }
  render() {
    return (
        <div>
          <Router  >
            <Route exact path={"/"} component={Signin}  />
            <Route exact path={"/home"} component={Dashboard}  />
          </Router>
        </div>
    );
  }
}

export default App;
