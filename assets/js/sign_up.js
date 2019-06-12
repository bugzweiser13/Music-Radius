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