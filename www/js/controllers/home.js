'use strict';

app.controller("HomeCtrl",function(Auth){

// some kind of algorithom to display random food near by current location base on setting / fitler  
// test git 
  
  var home = this;
  home.profiles = Auth.getProfiles();

});