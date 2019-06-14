
var firebaseConfig = {
  apiKey: "AIzaSyD1f2GXVMmAeKefcgxLGolC_gcCHqzan2I",
  authDomain: "schoolproject1-551be.firebaseapp.com",
  databaseURL: "https://schoolproject1-551be.firebaseio.com",
  projectId: "schoolproject1-551be",
  storageBucket: "schoolproject1-551be.appspot.com",
  messagingSenderId: "405996084610",
  appId: "1:405996084610:web:b42201322c399745"
 };
 // Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
 

var email = $('#email').val().trim();

var password = $('#pass').val().trim();



console.log(email);
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

firebase.auth().onAuthStateChanged(function(user) {
    window.user = user;
});

document.querySelector('#submitbtn').addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    var email = document.querySelector('#email').value;
    var password = document.querySelector('#pass').value;

    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    var auth = firebase.auth();
    var currentUser = auth.currentUser;
});