

import Enjine from './../Enjine/core.js';
import Mario from './setup.js';

import $ from "jquery";

Mario.runMarioRun = function(){
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

        console.log("Attempt Count Increased");
        window.localStorage.setItem('coins',0);

       });

      $(document).on('enterGame', function(){
         // console.log("Game::  Entering Game --  Increase Attemp count");
          $('#control-collection').show();
          $('#btnTop').show();
          $('#btnBottom').show();
      });

      $(document).on('enterLevel', function(e, params) {

        console.log("Game::  Entering Level --  Increase Level count", e, params);
          $('#btnTop').hide();
          $('#btnBottom').hide();
      });

      $(document).on('exitLevel', function(e, params) {
        Mario.StopMusic();
        console.log("Game::  Exiting Level --  Increase Level count", e, params);
        var coins = 0;
        var coinsStorage = window.localStorage.getItem('coins');
        if( coinsStorage ===0){
          coins = params.coins
        } else{
          coins = params.coins - coinsStorage;
          
        }
        
        window.localStorage.setItem('coins', parseInt(params.coins));
        console.log("Coins Collected in this level are ", coins);

        $.ajax( {url:'/score', type:"PUT", data: {coinsCollected: coins, level: params.level }})
        console.log("Total Coins Collected in this attempt is ", window.localStorage.getItem('coins'));
         
      });

       $(document).ready(function () {
       
        window.rMR =  new Enjine.Application(hasTouch).Initialize(new Mario.LoadingState(hasTouch), 320, 240);                
          $('#control-collection').hide();
      });
  }
