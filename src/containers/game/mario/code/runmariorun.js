

import Enjine from './../Enjine/core.js';
import Mario from './setup.js';
import {CONFIG} from './../../../../config';

import $ from "jquery";

Mario.runMarioRun = function(){

  $(document).off();
  
   var shotEntered =false, shotExit =false;
    var isBtnClicked = false;
      var hasTouch =  !!('ontouchstart' in window);
      if(hasTouch) {
          $('#mobile-controls').show();
      } else {
          $('#mobile-controls').hide();
      }            

      $(document).on('enterTitleState', function() {
          $('#control-collection').hide();
      });
      $(document).on('enterAttempt', function(){

       //  console.log("Attempt Count Increased");
        window.localStorage.setItem('coins',0);

       });

      $(document).on('enterGame', function(){
         // console.log("Game::  Entering Game --  Increase Attemp count");
          $('#control-collection').show();
          $('#btnTop').show();
          $('#btnBottom').show();
      });

      $(document).on('muteGameSound', function(){
        console.log("Game::  Mute BG Sound");
        Mario.StopMusic();
     });

      $(document).on('enterLevel', function(e, params) {
       var debounce = 500;
        
        if(!shotEntered){
        $.ajax( {url: CONFIG.API_PREFIX+'/attempts?oracleId='+window.localStorage.getItem('oracleID'), contentType:"application/json", type:"PUT"});
        shotEntered=true;
        setTimeout(function(){shotEntered=false;}, debounce);
        }

        // console.log("Game::  Entering Level ", e, params);
        console.log("Game::  Entering Level ");
          $('#btnTop').hide();
          $('#btnBottom').hide();

      });

      $(document).on('exitLevel', function(e, params) {
        // Mario.StopMusic();
        // console.log("Game::  Exiting Level --  Increase Level count", e, params);
        console.log("Game::  Exiting Level");
        var coins = 0;
        var coinsStorage = window.localStorage.getItem('coins');
        if( coinsStorage ===0){
          coins = params.coins
        } else{
          coins = params.coins - coinsStorage;
          
        }
        
        window.localStorage.setItem('coins', parseInt(params.coins));
        console.log("Coins Collected in this level are ", coins);
        var debounce = 500;
        
        if(!shotExit){
          $.ajax( {url: CONFIG.API_PREFIX+'/score?oracleId='+window.localStorage.getItem('oracleID'), type:"PUT", contentType:"application/json; charset=utf-8", data: JSON.stringify({coinsCollected: coins, level: params.level })});
          console.log("Total Coins Collected in this attempt is ", window.localStorage.getItem('coins'));
          shotExit=true;
         setTimeout(function(){shotExit=false;}, debounce);
        }
         
      });

       $(document).ready(function () {
       
        window.rMR =  new Enjine.Application(hasTouch).Initialize(new Mario.LoadingState(hasTouch), 320, 240);                
          $('#control-collection').hide();
      });
  }
