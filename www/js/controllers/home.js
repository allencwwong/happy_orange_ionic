'use strict';

app.controller("HomeCtrl",function(Auth){

// some kind of algorithom to display random food near by current location base on setting / fitler   
  
  var home = this;
  home.profiles = Auth.getProfiles();

});