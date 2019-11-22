import React, { Component  } from 'react';
import { withRouter } from 'react-router-dom';
 class HomeContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {oracleID: ''};
    this.history  = this.props.history;
  }

  componentDidMount() {
    window.Mario.StopMusic();
    let alreadyLoggedIn =  window.localStorage.getItem('oracleID');
    if (alreadyLoggedIn>0){
     this.history.push('/leaderboard');
    }
  }

  doLogin(){
 console.log(this.state);
 window.localStorage.setItem('oracleID', this.state.oracleID);
 this.history.push('/leaderboard');
  }
  render() {

    return (
      <section className="home-container container">
        <section className="login-div">
        <form className="form-signin" onSubmit={()=>this.doLogin()}>
         
          <div className="form-label-group">
          <label htmlFor="oracleID">Enter your OracleID</label>
            <input type="text" id="oracleID" className="form-control" placeholder="e.g. 128687" required="" autoFocus="" onChange = {(e) => this.setState({oracleID:e.target.value})} />
           
          </div>

          <button className="btn btn-lg btn-primary btn-block" type="button" >Login</button>
          
        </form>
        </section>
      </section>
    );
  }
}

export default withRouter(HomeContainer);
