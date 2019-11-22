import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import './App.scss';
import { Mario, Enjine } from "./containers/game/mario/gameinclude.js";

import LeaderBoardContainer from './containers/LeaderBoardContainer';
import HomeContainer from './containers/HomeContainer';
import GameContainer from './containers/game/GameContainer';
import {CONFIG} from './config';

class App extends Component {

  constructor(props) {
    super(props);
    }

  componentDidMount() {
   
    let timer = setInterval(()=> checkTimeout(), 5000);
    checkTimeout();  
    function checkTimeout() {
      let dt = new Date();
      
      let endTime = new Date(CONFIG.endTime);
  
      if (dt.getTime() > endTime.getTime()) {
        window.localStorage.removeItem('oracleID');
        window.localStorage.setItem('timeup', true);
        clearInterval(timer);
        if ( window.location.pathname !== '/'){
         window.location.href='/'
        
        }
      } else {
        window.localStorage.removeItem('timeup');
      }
    }

  }

  render() {
    return (
      <Router>
        <section className="app-container d-flex">
          {/* 
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/leaderboard">LeaderBoard</Link>
          </li>
          <li>
            <Link to="/game">Game</Link>
          </li>
        </ul>
      </nav> */
          }

          {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/leaderboard">
              <LeaderBoardContainer />
            </Route>
            <Route path="/play">
              <GameContainer />
            </Route>
            <Route path="/">
              <HomeContainer />
            </Route>
          </Switch>
        </section>
      </Router>
    );
  }

}

export default  App;
