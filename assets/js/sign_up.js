<<<<<<< HEAD
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

var name = $('#name').val().trim();
var email = $('#email').val().trim();
var userName = $('#user').val().trim();
var password = $('#pass').val().trim();
var zip = $('#zip').val().trim();
var genre1 = $('#genre1').val().trim();
var genre2 = $('#genre2').val().trim();
var genere3 = $('#genre3').val().trim();



console.log(email);

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
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
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#pass').value;
    var userName = document.querySelector('#user').value;
    var zip = document.querySelector('#zip').value;
    var genre1 = document.querySelector('#genre1').value;
    var genre2 = document.querySelector('#genre').value;
    var genre3 = document.querySelector("#genre3").value;
    var credential = firebase.auth.EmailAuthProvider.credential(email, password);
    var auth = firebase.auth();
    var currentUser = auth.currentUser;
});
=======
 var config = {
     apiKey: "AIzaSyD1f2GXVMmAeKefcgxLGolC_gcCHqzan2I",
     authDomain: "schoolproject1-551be.firebaseapp.com",
     databaseURL: "https://schoolproject1-551be.firebaseio.com",
     projectId: "schoolproject1-551be",
     storageBucket: "schoolproject1-551be.appspot.com",
     messagingSenderId: "405996084610",
     appId: "1:405996084610:web:b42201322c399745"
 };

 firebase.initializeApp(config);
 var dataRef = firebase.database();

 // Initial Values
 var name = "";
 var email = "";
 var userName = "";
 var password = "";
 var zip = "";
 var genre1 = "";
 var genre2 = "";
 var genere3 = "";

 // Capture Button Click
 $("#submitbtn").on("click", function(event) {
     event.preventDefault();

     //get information from user sign up input
     var name = $('#name').val().trim();
     var email = $('#email').val().trim();
     var userName = $('#user').val().trim();
     var password = $('#pass').val().trim();
     var zip = $('#zip').val().trim();
     var genre1 = $('#genre1').val().trim();
     var genre2 = $('#genre2').val().trim();
     var genre3 = $('#genre3').val().trim();

     // Code for the push
     dataRef.ref().push({
         name: name,
         email: email,
         userName: userName,
         password: password,
         zip: zip,
         genre1: genre1,
         genre2: genre2,
         genre3: genre3
     });
 });
 // Firebase watcher + initial loader HINT: .on("value")
 dataRef.ref().on("child_added", function(snapshot) {

     //debugging
     console.log(snapshot.val());
     console.log(snapshot.val().name);
     console.log(snapshot.val().email);
     console.log(snapshot.val().userName);
     console.log(snapshot.val().password);
     console.log(snapshot.val().genre1);
     console.log(snapshot.val().genre2);
     console.log(snapshot.val().genre3);

     // Handle the errors
 }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
 });
















 // // Initialize Firebase
 // firebase.initializeApp(firebaseConfig);

 // var database = firebase.database();

 // var name = $('#name').val().trim();
 // var email = $('#email').val().trim();
 // var userName = $('#user').val().trim();
 // var password = $('#pass').val().trim();
 // var zip = $('#zip').val().trim();
 // var genre1 = $('#genre1').val().trim();
 // var genre2 = $('#genre2').val().trim();
 // var genere3 = $('#genre3').val().trim();

 // console.log(email);

 // firebase.auth().onAuthStateChanged(function(user) {
 //     window.user = user;
 // });

 // document.querySelector('#submitbtn').addEventListener('click', function(e) {
 //     e.preventDefault();
 //     e.stopPropagation();
 //     var name = document.querySelector('#name').value;
 //     var email = document.querySelector('#email').value;
 //     var password = document.querySelector('#pass').value;
 //     var userName = document.querySelector('#user').value;
 //     var zip = document.querySelector('#zip').value;
 //     var genre1 = document.querySelector('#genre1').value;
 //     var genre2 = document.querySelector('#genre').value;
 //     var genre3 = document.querySelector("#genre3").value;
 //     var credential = firebase.auth.EmailAuthProvider.credential(email, password);
 //     var auth = firebase.auth();
 //     var currentUser = auth.currentUser;
 // });
>>>>>>> 7fdace744169b7625e6b552c02619e3c6794464f
