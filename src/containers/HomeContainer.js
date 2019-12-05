import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Mario from "./game/mario/code/setup.js";
import axios from 'axios';
import {CONFIG} from './../config';

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

  setErrorState(){
    let super1 = this;
    this.setState({ err:true, oracleID:'', loading:false });
    
    setTimeout(()=>{this.setState({err:false})} , 5000);
  }

  doLogin(event) {
    event.preventDefault();
    this.setState({loading:true});
    axios.get(CONFIG.API_PREFIX+'/login', {params:{oracleId: this.state.oracleID }})
        .then(res => {
         
          if (res.data.status==="SUCCESS"){
          window.localStorage.setItem('oracleID', this.state.oracleID);
          this.history.push('/leaderboard');
          }else{
           this.setErrorState();
          }
        }, err=> {
          this.setErrorState();
        })
   
  }

  render() {
    let template = '';
    
    if (!window.localStorage.getItem('timeup')) {
      template = <form className="form-signin" onSubmit={(e) => this.doLogin(e)}>
        {
      ( this.state.err===true) ?  <div className="error"> <i className="fa fa-warning" /> Invalid Oracle ID</div> : ''
        }
        <div className="form-label-group">
          <label htmlFor="oracleID">Enter your OracleID</label>
          <input type="text" id="oracleID" className="form-control" placeholder="e.g. 128687" required="" autoFocus="" value={this.state.oracleID} onChange={(e) => this.setState({ oracleID: e.target.value })} />

        </div>

        <button className="btn btn-lg btn-success btn-block" type="submit" disabled = {this.state.loading} >Login</button>

      </form>;
    } else {

      template = <div className="sorry "><h2 className="text-danger">bye bye..</h2>  <div class='small'>They say its Timeout!! </div></div>
    }

    return (
      <section className="home-container container">
        <section className="login-div">
          <img src="/images/logo192.png" alot="Year end Mario" className="logo"/>
          {template}
        </section>
       
      </section>
    );
  }
}

export default withRouter(HomeContainer);
