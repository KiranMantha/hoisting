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

    this.teamNames = ["Energy Pirates", "Auto Rebels", "Retail Rangers", "Consumer Seals", "Tele Warriors", "COE Snipers", "Travel Ninjas", "Core Battalion", "FIN Mafia"];

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
                <div className="row team-report" key={'team-' + index}>
                  <div className="col-sm-6 col-12">
                    <div className="team-name">
                    <img className="team-logo" src={"/images/battleground/"+team.toLowerCase().replace(" ","-")+ ".png"} alt="{team}" />
                      </div>
                  </div>
                  <div className="col-sm-6 col-12">
                    <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" /> 
                    17856
    </div>
                  <div className="col-sm-12 col-md-6 col-12">
                    Attempts :: 
                    725
    </div>
                  <div className="col-sm-12 col-md-6 col-12">
                    Max World :: 
                    7

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
              let pstyle= {backgroundImage : "url()"};
              return (
                <div className="row people-board" key={'people-' + index} style={pstyle}>
                  <img className="team-logo" src={"/images/battleground/"+team.toLowerCase().replace(' ','-') +".png"} alt={team} />
                  <div className="col-sm-12">
                    <div className="team-name">{team}</div>

                  </div>
                  <div className="col-sm-4 col-12">
                  <br/>
                    <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" /> 
                    17856
    </div>
                  <div className="col-sm-8 col-12">
                  Max World :: 7
                   <br/> <br/>
                      Attempts ::  725
                   
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
          <div className="col-sm-4 col-12">
          <br/>
              <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" /> 
              17856
    </div>
            <div className="col-sm col-12">
              Attempts :: 725 <br/> <br/>
    
              Max World :: 7

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
          <div className="col-sm-4 col-12">
          <br/>
              <img src="/images/coin-spinner.gif" width="45" alt="Coins Collected" /> 
              1200
    </div>
            <div className="col-sm-8 col-12">
              Attempts :: 125 <br/> <br/>
              Max World :: 5

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
        <footer> <i class="fa fa-code"></i> Coded with <i class="fa fa-heart"></i> from XT & Rogers Team</footer>
      </section>
    );
  }
}
export default withRouter(LeaderBoardContainer);