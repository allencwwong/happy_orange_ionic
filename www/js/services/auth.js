'use strict';

app.factory('Auth', function($firebaseAuth,$firebaseObject,$state, $firebaseArray){


  
   var ref = firebase.database().ref();
   var auth = $firebaseAuth();
   var fbprovider = new firebase.auth.FacebookAuthProvider();
   var isCurrentUser,currentUser;
   var token;
   var uid;


   var Auth = {

    auth: $firebaseAuth(),

    createProfile: function (uid,currentUser){
      var profile = {
        name: currentUser.name,
        email: currentUser.email,
        avatar: currentUser.photoUrl,
      };

      return ref.child('profiles').child(uid).set(profile);
    },

    getProfile: function(uid){
      console.log('getProfile');
      return $firebaseObject(ref.child('profiles').child(uid));
    },

    login: function(){
      
      return firebase.auth().signInWithPopup(fbprovider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      token = result.credential.accessToken;
      uid = result.user.uid;

      var isCurrentUser = firebase.auth().currentUser;

      if(isCurrentUser != null) {
        currentUser = {
          name: isCurrentUser.displayName,
          email: isCurrentUser.email,
          photoUrl: isCurrentUser.photoURL 
        };
        console.log(currentUser);
      }

      uid = result.user.uid;

      var user = Auth.getProfile(result.user.uid).$loaded();

      user.then(function(profile){
        console.log('after getProfile');
        if(profile.name == undefined){
          console.log('insert new user');
          Auth.createProfile(result.user.uid,currentUser)
        }
      });

      }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });

    
   },

   logout: function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    }, function(error) {
      console.log(error);
    });
   },

   getProfiles: function(){
    return $firebaseArray(ref.child('stores'));
   }


   };

  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log('Logged in!');
    
  } else {
    $state.go('login');
    console.log('You need to login.');
  }
  });

  
  
  return Auth;

});