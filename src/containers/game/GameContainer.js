import React, { Component } from 'react';
import DeviceOrientation, { Orientation } from 'react-screen-orientation';
import { withRouter } from 'react-router-dom';
import Mario from "./mario/code/setup.js";

class GameContainer extends Component {

    constructor(props) {
        super(props);
        this.state = { oracleID: window.localStorage.getItem('oracleID') };
        this.history = this.props.history;
        if (window.screen.orientation.type.indexOf('landscape') === 0) {
            document.querySelector('body').setAttribute('class', 'black-bg');
        }

    }

    componentDidMount() {

        let alreadyLoggedIn = window.localStorage.getItem('oracleID');
        if (!alreadyLoggedIn) {
            this.history.push('/');
        }

        window.addEventListener('orientationchange', this.onOrientationChange);
        if (window.screen.orientation.type.indexOf('landscape') === 0) {
          //  window.rMR = {};
            setTimeout( function(){Mario.runMarioRun()}, 2000);
        }

    }
    onOrientationChange(e) {
        console.log(e);
        if (e) {
            if (e.target.screen.orientation.type.indexOf('landscape') === 0) {
                document.querySelector('body').setAttribute('class', 'black-bg');
                setTimeout( function(){Mario.runMarioRun()}, 2000);
            } else {
                Mario.StopMusic();
                document.querySelector('body').removeAttribute('class');
            }
        }
    }

    componentWillUnmount() {
        window.rMR = null;
        Mario.StopMusic();
        document.querySelector('body').removeAttribute('class');
    }
    render() {
        window.screen.orientation.onchange = this.onOrientationChange();
        return (
            <section className="mario-game">
                <button className="btn btn-secondary btn-sm go-back" onClick={() => this.history.push('/')}><i className="fa fa-chevron-left"></i> Back</button>
                <DeviceOrientation lockOrientation={'landscape'}>
                    <Orientation orientation='landscape' alwaysRender={false}>

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