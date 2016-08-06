'use strict';

app.controller("HomeCtrl",function(Auth,$scope){

// some kind of algorithom to display random food near by current location base on setting / fitler  
// test git 

  var home = this;
  home.currentIndex = null;


function init(){
  home.profiles = [];
  //retrieve all profiles 
  Auth.getProfiles().$loaded().then(function(data){

    for(var i=0;i<data.length;i++){
      var item = data[i];
    //insert data to home.profiles
      home.profiles.push(item);
    //setup filter function here
    }
      
    if (home.profiles.length > 0){
      home.currentIndex = home.profiles.length -1;
    }
    

  });
};

  $scope.$on('$ionicView.enter',function(e){
    init();
  });


  home.nope = function(index){
    home.cardRemoved(index);
    console.log("nope "+index);
  }

  home.like = function(index){
    home.cardRemoved(index);
    console.log("like "+index);
  }  

  home.cardRemoved = function(index){
    home.profiles.splice(index,1);
    
    if (home.profiles.length > 0){
      home.currentIndex = home.profiles.length -1;
    }
  }

});