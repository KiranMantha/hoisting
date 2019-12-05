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
Mario.playBgMusic = true;
Mario.lastPlayed ='';

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
	// console.log("Playing only MP3 files")
};

Mario.PlayTitleMusic = function() {
	Mario.lastPlayed ='title';
	// Mario.PlayMusic("title");
	if ( Mario.playBgMusic){
	Enjine.Resources.PauseAll();
	Enjine.Resources.PlaySound('title');
	
	}
};

Mario.PlayMapMusic = function() {
	Mario.lastPlayed ='mapmusic';
	// Mario.PlayMusic("map");
	if ( Mario.playBgMusic){
	Enjine.Resources.PauseAll();
	Enjine.Resources.PlaySound('mapmusic',true);
	
	}
};

Mario.PlayOvergroundMusic = function() {
	Mario.lastPlayed ='background';
	if ( Mario.playBgMusic){
	Enjine.Resources.PauseAll();
	// Mario.PlayMusic("background");
	Enjine.Resources.PlaySound('background');
	
	}
};

Mario.PlayUndergroundMusic = function() {
	Mario.lastPlayed ='underground';
	if ( Mario.playBgMusic){
	// Mario.PlayMusic("underground");
	Enjine.Resources.PauseAll();
	Enjine.Resources.PlaySound('underground');
	
	}
};

Mario.PlayCastleMusic = function() {
	Mario.lastPlayed ='castle';
	// Mario.PlayMusic("castle");
	if ( Mario.playBgMusic){
	Enjine.Resources.PauseAll();
	Enjine.Resources.PlaySound('castle');

	}
};

Mario.StopMusic = function() {
	// console.log("stopping Music");
	//Enjine.Resources.PauseAll();
	// MIDIjs.stop();
};

Mario.PauseBG = function(pause) {
	// console.log("stopping Music");
	//Enjine.Resources.PauseAll();
	// MIDIjs.stop();
	// Enjine.Resources.RemoveSound(Mario.lastPlayed);
	// Enjine.Resources.AddSound(Mario.lastPlayed);
	Mario.playBgMusic = !pause;
	if ( !Mario.playBgMusic){

	Enjine.Resources.PauseSound('castle');
	Enjine.Resources.PauseSound('title');
	Enjine.Resources.PauseSound('mapmusic');
	Enjine.Resources.PauseSound('underground');
	Enjine.Resources.PauseSound('background');
	}else{
		
		Enjine.Resources.PlaySound(Mario.lastPlayed);
	}
};
