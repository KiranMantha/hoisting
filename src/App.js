import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
// import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  //Link
} from "react-router-dom";

import './App.scss';

import LeaderBoardContainer from './containers/LeaderBoardContainer';
import HomeContainer from './containers/HomeContainer';
import GameContainer from './containers/game/GameContainer';

function App() {

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

export default App;
