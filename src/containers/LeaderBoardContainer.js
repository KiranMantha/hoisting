import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { CONFIG } from './../config';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Mario from "./game/mario/code/setup.js";

class LeaderBoardContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { oracleID: window.localStorage.getItem('oracleID') };
    this.history = this.props.history;

    this.teamNames = ["Energy Pirates", "Auto Rebels", "Retail Rangers", "Consumer Seals", "Tele Warriors", "COE Snipers", "Travel Ninjas", "Core Battalion", "FIN Mafia"];

  }
  playGame() {
    this.history.push("/play");
  }

  logout() {
    window.localStorage.removeItem('oracleID');
    this.history.push("/");
  }

  loadLeaderBoardReport() {
    axios.get(CONFIG.API_PREFIX + '/leaderBoard', { params: { oracleID: this.state.oracleID } })
      .then(res => {
        if (res.data.status === "SUCCESS") {
          this.setState({ leaderBoardResults: true, leaderBoard: res.data });
        } else {
          this.setState({ err: true });
        }

      }, err => {

        this.setState({ err: true });
      })
  }

  componentDidMount() {
    Mario.StopMusic();
    let alreadyLoggedIn = window.localStorage.getItem('oracleID');
    if (!alreadyLoggedIn) {
      this.history.push('/');
    }

    this.loadLeaderBoardReport();
  }

  renderTeamLeaderBoard() {
    let teamLeaderboard = this.state.leaderBoard.teamLeaderBoard;
    return (

      <div className="card" >
        <div className="card-header">
          <div>Leading Teams</div>
        </div>
        <div className="card-body">
          {

            teamLeaderboard.map((team, index) => {

              return (
                <div className="row team-report" key={'team-' + index}>
                  <div className="col-sm-6 col-12">
                    <div className="team-name">
                      <img className="team-logo" src={"/images/battleground/" + team.teamName.toLowerCase().replace(" ", "-") + ".png"} alt="{team.teamName}" />
                    </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    {
                      // <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" /> 
                    }<br />
                    Total Score ::
                    {team.totalScore}

                  </div>
                  <div className="col-sm-12 col-md-6 col-12 fs-85">
                    Players ::
                    {team.totalPlayers}

                  </div>
                  <div className="col-sm-12 col-md-6 col-12 fs-85">
                    Avg ::
                    {team.averageScore}

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
    let rockStars = this.state.leaderBoard.rockStars;
    return (

      <div className="card">
        <div className="card-header">
          <div>Top 10 Players</div>
        </div>
        <div className="card-body">
          {

            rockStars.map((person, index) => {
              let pstyle = { backgroundImage: "url()" };
              return (
                <div className="row people-board" key={'person-' + index} style={pstyle}>
                  <img className="team-logo" src={"/images/battleground/" + person.teamName.toLowerCase().replace(' ', '-') + ".png"} alt={person.teamName} />
                  <div className="col-sm-12">
                    <div className="team-name">{person.name}</div>

                  </div>
                  <div className="col-sm-4 col-12">
                    <br />
                    <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" />
                    {person.totalCoinsCollected}
                  </div>
                  <div className="col-sm-8 col-12">
                    Max World :: {person.highestWorldReached}-{person.highestLevelReached}
                    <br /> <br />
                    Total Score ::  {person.totalScore}

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
    let team = this.state.leaderBoard.teamScore;
    return (
      <div className="team-score-card card">
        <div className="card-header">
          <div>My Team Score Card</div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-12 team-name">
              <img className="team-logo" src={"/images/battleground/" + team.teamName.toLowerCase().replace(' ', '-') + ".png"} alt={team.teamName} />
            </div>
            { /* { <div className="col-sm-4 col-12">
          <br/>
               
         <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" /> 
              
    </div>  */
            }

            <div className="col-sm col-12">
              Total Score :: {team.totalScore} <br /> <br />

              Players :: {team.totalPlayers}

            </div>

          </div>
        </div>
      </div>
    );
  }

  renderMyScorecard() {
    var myscore = this.state.leaderBoard.individualScore;
    return (
      <div className="myscore card">
        <div className="card-header">
          <div>My Score Card</div>
        </div>
        <div className="card-body">

          <div className="row">
            <div className="col-sm-4 col-12">
              <br />
              <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" />
              {myscore.totalCoinsCollected}
            </div>
            <div className="col-sm-8 col-12">
              Total Score :: {myscore.totalScore} <br /> <br />
              Max World :: {myscore.highestWorldReached}-{myscore.highestLevelReached}

            </div>

          </div>

        </div>
      </div>

    );
  }

  render() {

    return (

      <section className="leaderboard-container">
        {this.state.leaderBoardResults ?
          <section className="container" >
            <section className="greeting">
              <div className="user-info">
                <img src="/logo192.png" className="logo" alt="Lets play Mario"/>
                {this.state.leaderBoard.individualScore.name}<br />

              </div>

              <div className="play-info">
                <button className="btn btn-success" onClick={() => this.playGame()}> <i className="fa fa-send" /> Play</button>
                <button className="btn btn-danger" onClick={() => this.logout()}><i className="fa fa-power-off" /></button>
              </div>
            </section>

            <section>
              <Tabs className="leaderboard-tabs" defaultActiveKey="myscore" id="battleground-mario-leaderboard" >
                <Tab eventKey="myscore" title="Me & My Team">
                  {this.renderMyScorecard()}
                  {this.renderMyTeamScorecard()}
                </Tab>

                <Tab eventKey="peopleboardscore" title="Top 10 Rock Stars" >
                  {this.renderPeopleBoard()}
                </Tab>
                <Tab eventKey="leaderboardscore" title="LeaderBoard" >
                  {this.renderTeamLeaderBoard()}
                </Tab>
              </Tabs>
              <footer> <div><i className="fa fa-code"></i> with <i className="fa fa-heart"></i> from XT & Rogers Team </div></footer>
            </section>
          </section>
          : (this.state.err ? (<div className="loading"> <div className="error">Sorry!! <br /> Seems something is on fire. Rescue is on its way. </div></div>) : (<div className="loading">Loading .. .. ..</div>))}
      </section>
    );
  }
}
export default withRouter(LeaderBoardContainer);