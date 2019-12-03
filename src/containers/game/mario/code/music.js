/*
* using cross platform MIDI library MIDI.js http://www.midijs.net/
*/

import Mario from './setup.js';
import Enjine from './../Enjine/core.js';

// import * as MIDIjs from "MIDIjs";
const MIDIjs =  window.MIDIjs || {};

var midifiles = {
	"title" : "midi/title.mid",
	"map" : "midi/map.mid",
	"background" : "midi/background.mid",
	"overground" : "midi/overground.mid",
	"underground" : "midi/underground.mid",
	"castle" : "midi/castle.mid",
};

Mario.PlayMusic = function(name) {
	// if(name in midifiles)
	// {
	// 	// Currently we stop all playing tracks when playing a new one
	// 	// MIDIjs can't play multiple at one time
	// 	MIDIjs.stop();
	// 	setTimeout(function(){
	// 	try{
	// 	MIDIjs.play(midifiles[name]);
	// 	}catch(ex){};
	// },1000);
	// }else{
	// 	console.error("Cannot play music track " + name + " as i have no data for it.");
	// }
	console.log("Playing only MP3 files")
};

Mario.PlayTitleMusic = function() {
	// Mario.PlayMusic("title");
	Enjine.Resources.PauseAll();
	Enjine.Resources.PlaySound('title');
};

Mario.PlayMapMusic = function() {
	// Mario.PlayMusic("map");
	Enjine.Resources.PauseAll();
	Enjine.Resources.PlaySound('mapmusic',true);
};

Mario.PlayOvergroundMusic = function() {
	Enjine.Resources.PauseAll();
	// Mario.PlayMusic("background");
	Enjine.Resources.PlaySound('background');
};

Mario.PlayUndergroundMusic = function() {
	// Mario.PlayMusic("underground");
	Enjine.Resources.PauseAll();
	Enjine.Resources.PlaySound('underground');
};

Mario.PlayCastleMusic = function() {
	// Mario.PlayMusic("castle");
	Enjine.Resources.PauseAll();
	Enjine.Resources.PlaySound('castle');
};

Mario.StopMusic = function() {
	Enjine.Resources.PauseAll();
	// MIDIjs.stop();
};
