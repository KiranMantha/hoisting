import React, { Component } from 'react';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
import { withRouter } from 'react-router-dom';
import Mario from "./mario/code/setup.js";
import axios from 'axios';
import { CONFIG } from './../../config';

class GameContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { oracleID: window.localStorage.getItem('oracleID'), disableButton:true, loading:true,music:true };
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
            Mario.runMarioRun(); 
            this.setState({disableButton:false, loading:false})}, 2000);
    }

    componentDidMount() {

        let alreadyLoggedIn = window.localStorage.getItem('oracleID');
        if (!alreadyLoggedIn) {
            this.history.push('/');
        }

        window.addEventListener('orientationchange',  this.onOrientationChange);
        if (window.screen.orientation.type.indexOf('landscape') === 0) {
          //  window.rMR = {};
           this.validateGameWorld();
        }else{
            this.setState({disableButton:false});
        }

    }
    onOrientationChange(e) {
        // console.log(e);
        if (e) {
            if (e.target.screen.orientation.type.indexOf('landscape') === 0) {
               
                setTimeout( ()=>{Mario.runMarioRun();  }, 2000);
            } else {
                Mario.StopMusic();
                if(Mario.playBgMusic){
                    Mario.PauseBG();
                    }
               
            }
        }
    }
    goBack(){
        window.rMR = null;
        Mario.StopMusic();
        if(Mario.playBgMusic){
        Mario.PauseBG();
        }
        this.setState({loading:true});
        //document.querySelector(".game-container").innerHTML ="";
        //document.querySelector('body').removeAttribute('class');
         window.location.href ="/leaderboard";
        // this.history.push('/leaderboard');
    }

    stopMusic(){
        this.setState({music:!this.state.music},()=>{
            Mario.PauseBG();
        });
        
    }

    componentWillUnmount() {
        window.rMR = null;
        if(Mario.playBgMusic){
            Mario.PauseBG();
            }
        document.querySelector('body').removeAttribute('class');
    }
    render() {
        window.screen.orientation.onchange = this.onOrientationChange();
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

export default withRouter(GameContainer);