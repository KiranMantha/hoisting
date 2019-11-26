

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

      $(document).on('enterGame', function(){
          console.log("Game::  Entering Game --  Increase Attemp count");
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
         
      });

       $(document).ready(function () {
       
        window.rMR =  new Enjine.Application(hasTouch).Initialize(new Mario.LoadingState(hasTouch), 320, 240);                
          $('#control-collection').hide();
      });
  }
