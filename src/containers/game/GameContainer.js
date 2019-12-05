import React, { Component } from 'react';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
import { withRouter } from 'react-router-dom';
import Mario from "./mario/code/setup.js";
import Enjine from './mario/Enjine/core.js';
import axios from 'axios';
import { CONFIG } from './../../config';

class GameContainer extends Component {
   
    constructor(props) {
        super(props);
        this.state = { oracleID: window.localStorage.getItem('oracleID'), disableButton:true, loading:true,music:true,playTill: CONFIG.PLAY_TILL  };
        this.history = this.props.history;
        document.querySelector('body').setAttribute('class', 'black-bg');

    }
    validateGameWorld(){
        axios.get(CONFIG.API_PREFIX + '/leaderBoard', { params: { oracleID: this.state.oracleID } })
        .then(res => {
            if (res.data.status === "SUCCESS") {
              window.localStorage.setItem('wp', res.data.individualScore.highestWorldReached);
              this.startGame();

            }
        } , err => {

                this.setState({ err: true });
                this.history.push('/');
          });
    }

    startGame(){
        setTimeout( ()=>{ 
            
            this.setState({disableButton:false, loading:false},()=>{Mario.runMarioRun(); })}, 2000);
    }

    componentDidMount() {
        let dt  = new Date();
        let till = new Date(this.state.playTill);
        let playOver = dt.getTime() >= till.getTime() ; 
        if ( playOver){
            document.querySelector('body').removeAttribute('class');
        }else{

        let alreadyLoggedIn = window.localStorage.getItem('oracleID');
        if (!alreadyLoggedIn) {
            this.history.push('/');
        }
        var self = this;
        window.addEventListener('orientationchange', (e)=>{ this.onOrientationChange(e, self); });
        if (window.screen.orientation.type.indexOf('landscape') === 0) {
          //  window.rMR = {};
           this.validateGameWorld();
        }else{
            this.setState({disableButton:false,music:false,loading:false});
        }
    }

    }
    onOrientationChange(e,self) {
        // console.log(e);

        window.location.reload();
        // if (e) {
        //     if (e.target.screen.orientation.type.indexOf('landscape') === 0) {
        //         setTimeout( ()=>{ self.setState({loading:false,music:true},()=>{Mario.runMarioRun();  Mario.PauseBG(false);});  }, 2000);
        //     } else {
        //        //  Mario.StopMusic();
        //        self.setState({loading:false,music:false},()=>{ 
        //         Mario.PauseBG(true);
        //         Enjine.Resources.ClearSounds();
        //         });
                
        //     }
        // }
    }
    goBack(){
        window.rMR = null;
        Mario.StopMusic();
        if(Mario.playBgMusic){
        Mario.PauseBG(true);
        }
        this.setState({loading:true});
        //document.querySelector(".game-container").innerHTML ="";
        //document.querySelector('body').removeAttribute('class');
         window.location.href ="/leaderboard";
        // this.history.push('/leaderboard');
    }

    stopMusic(){
        this.setState({music:!this.state.music},()=>{
            Mario.PauseBG(!this.state.music);
        });
        
    }

    componentWillUnmount() {
        window.rMR = null;
        if(Mario.playBgMusic){
            Mario.PauseBG(true);
            }
        document.querySelector('body').removeAttribute('class');
    }
    render() {
        // window.screen.orientation.onchange = this.onOrientationChange();

        let dt  = new Date();
        let till = new Date(this.state.playTill);
        let playOver = dt.getTime() >= till.getTime() ; 
        if ( playOver){
            document.querySelector('body').removeAttribute('class');
        }

        if (playOver){
            return (
                <section className="home-container container">
                <section className="login-div">
                  <img src="/images/logo192.png" alot="Year end Mario" className="logo"/>
                  <div className='cant-play'>Fun Time is Over <br/>
                  <button className="btn btn-secondary btn-sm go-back " onClick={() => this.goBack()}><i className="fa fa-chevron-left"></i> Back</button>
                  </div>
                </section>
               
              </section>
            )
        }else{
        return (
             
            <section className="mario-game ">
                   
                <button className="btn btn-secondary btn-sm go-back " disabled={this.state.disableButton} onClick={() => this.goBack()}><i className="fa fa-chevron-left"></i> Back</button>
                <button className={this.state.music? 'btn music ' : 'btn music  off'} disabled={this.state.disableButton} onClick={() => this.stopMusic()}></button>

             <div className= { this.state.loading===true? 'show':'hidden'}><img src="/images/spinner.gif" alt="Loading ..." /> <br/></div>
        
                <DeviceOrientation lockOrientation={'landscape'}   >
                    <Orientation orientation='landscape' alwaysRender={false} className= { this.state.loading===false? 'game-container show':'game-container hidden'}>
                   
                        <canvas id="canvas" width="640" height="480">
                            <p>Your browser does not support the canvas element.</p>
                        </canvas>
                        <div id="mobile-controls">
                            <div>
                                <div id="control-collection">
                                    <button className="btn btn-success top" id="btnTop" data-type="38"><i className="fa fa-chevron-up" aria-hidden="true"></i></button>
                                    <div>
                                        <button className="btn btn-success" id="btnLeft" data-type="37"><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
                                        <button className="btn btn-success" id="btnRight" data-type="39"><i className="fa fa-chevron-right" aria-hidden="true"></i></button>
                                    </div>
                                    <button className="btn btn-success" id="btnBottom" data-type="40"><i className="fa fa-chevron-down" aria-hidden="true"></i></button>
                                </div>
                            </div>
                            <button className="btn btn-success right-controls" id="btnFire" data-type="65">A</button>
                            <button className="btn btn-success right-controls" id="btnJump" data-type="83">S</button>

                        </div>
                   
                    </Orientation>
                    <Orientation orientation='portrait' alwaysRender={false}>
                        <div className="cant-play">
                            <p>Please rotate your device</p>
                        </div>
                    </Orientation>
                </DeviceOrientation>
            
            </section>
        );
        }
    }
}

export default withRouter(GameContainer);