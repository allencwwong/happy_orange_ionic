'use strict';

app.controller('SettingCtrl',function(Auth, $ionicPopup) {
  var sett = this;

  sett.maxAge = window.localStorage.getItem('maxAge') || 25;
  sett.men = JSON.parse(window.localStorage.getItem('men'));
  sett.men = sett.men === null? true : sett.men;

  sett.changeMaxAge = function(){
    window.localStorage.setItem('maxAge', sett.maxAge);
  }

  sett.selectMen = function(){
    window.localStorage.setItem('men', sett.men);
  }
  
  sett.logout = function(){
    $ionicPopup.confirm({
      title: 'Logout',
      template: 'Do you want to logout?'
    })
    .then(function(res){
      if(res){
        Auth.logout();
      }
    });
  };

});