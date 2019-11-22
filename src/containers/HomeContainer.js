import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Mario from "./game/mario/code/setup.js";

class HomeContainer extends Component {

  constructor(props) {
    super(props);
    this.state = { oracleID: '' };
    this.history = this.props.history;
  }

  componentDidMount() {
    Mario.StopMusic();
    let alreadyLoggedIn = window.localStorage.getItem('oracleID');
    if (alreadyLoggedIn > 0) {
      this.history.push('/leaderboard');
    }
  }

  doLogin() {
    window.localStorage.setItem('oracleID', this.state.oracleID);
    this.history.push('/leaderboard');
  }

  render() {
    let template = '';
    
    if (!window.localStorage.getItem('timeup')) {
      template = <form className="form-signin" onSubmit={() => this.doLogin()}>

        <div className="form-label-group">
          <label htmlFor="oracleID">Enter your OracleID</label>
          <input type="text" id="oracleID" className="form-control" placeholder="e.g. 128687" required="" autoFocus="" onChange={(e) => this.setState({ oracleID: e.target.value })} />

        </div>

        <button className="btn btn-lg btn-success btn-block" type="submit" >Login</button>

      </form>;
    } else {

      template = <div className="sorry "><h2 className="text-danger">bye bye..</h2>  <div class='small'>They say its Timeout!! </div></div>
    }

    return (
      <section className="home-container container">
        <section className="login-div">
          {template}
        </section>
      </section>
    );
  }
}

export default withRouter(HomeContainer);
