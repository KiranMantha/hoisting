import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Mario from "./game/mario/code/setup.js";

class LeaderBoardContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { oracleID: window.localStorage.getItem('oracleID') };
    this.history = this.props.history;

    this.teamNames = ["Energy Pirates", "Auto Rebeles", "Retail Rangers", "Consumer Seals", "Tele Warriors", "COE Snipers", "Travel Ninjas", "Core Battalion", "FIN Mafia"];

  }
  playGame() {
    this.history.push("/play");
  }

  componentDidMount() {
    Mario.StopMusic();
    let alreadyLoggedIn = window.localStorage.getItem('oracleID');
    if (!alreadyLoggedIn) {
      this.history.push('/');
    }
  }

  renderTeamLeaderBoard() {

    return (

      <div className="card" >
        <div className="card-header">
          <div>Leading Teams</div>
        </div>
        <div className="card-body">
          {

            this.teamNames.map((team, index) => {

              return (
                <div className="row" key={'team-' + index}>
                  <div className="col-sm-12">
                    <div className="team-name">{team}</div>
                  </div>
                  <div className="col-sm">
                    Attempts<br />
                    725
    </div>
                  <div className="col-sm">
                    Highest Level<br />
                    7

    </div>
                  <div className="col-sm">
                    <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" /> <br />
                    17856
    </div>
                </div>
              );

            })

          }

        </div>
      </div>
    );
  }

  renderPeopleBoard() {

    return (

      <div className="card">
        <div className="card-header">
          <div>Top 10 Players</div>
        </div>
        <div className="card-body">
          {

            this.teamNames.map((team, index) => {

              return (
                <div className="row" key={'people-' + index}>
                  <div className="col-sm-12">
                    <div className="team-name">{team}</div>

                  </div>
                  <div className="col-sm">
                    Attempts<br />
                    725
    </div>
                  <div className="col-sm">
                    Highest Level<br />
                    7

    </div>
                  <div className="col-sm">
                    <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" /> <br />
                    17856
    </div>
                </div>
              );

            })

          }

        </div>
      </div>
    );
  }

  renderMyTeamScorecard() {
    return (
      <div className="card">
        <div className="card-header">
          <div>My Team Score Card</div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-sm">
              Attempts<br />
              725
    </div>
            <div className="col-sm">
              Highest Level<br />
              7

    </div>
            <div className="col-sm">
              <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" /> <br />
              17856
    </div>
          </div>
        </div>
      </div>
    );
  }

  renderMyScorecard() {

    return (
      <div className="myscore card">
        <div className="card-header">
          <div>My Score Card</div>
        </div>
        <div className="card-body">

          <div className="row">
            <div className="col-sm">
              Attempts<br />
              125
    </div>
            <div className="col-sm">
              Highest Level<br />
              5

    </div>
            <div className="col-sm">
              <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" /> <br />
              1200
    </div>
          </div>

        </div>
      </div>

    );
  }

  render() {

    return (
      <section className="leaderboard-container container">
        <section className="greeting">
          <div className="user-info">
            Howdy Abhishek
       </div>

          <div className="play-info">
            <button className="btn btn-success" onClick={() => this.playGame()}>Play Now</button>
          </div>
        </section>

        <Tabs className="leaderboard-tabs" defaultActiveKey="myscore" id="battleground-mario-leaderboard">
          <Tab eventKey="myscore" title="Me & My Team">
            {this.renderMyScorecard()}
            {this.renderMyTeamScorecard()}
          </Tab>
        
          <Tab eventKey="peopleboardscore" title="Rock Stars" >
            {this.renderPeopleBoard()}
          </Tab>
          <Tab eventKey="leaderboardscore" title="LeaderBoard" >
            {this.renderTeamLeaderBoard()}
          </Tab>
        </Tabs>

      </section>
    );
  }
}
export default withRouter(LeaderBoardContainer);