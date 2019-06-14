$(document).ready(function() {

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
    console.log(dataRef);

    // var name = "";
    // var email = "";
    // var userName = "";
    // var password = "";
    // var areaCode = "";
    // var genre1 = "";
    // var genre2 = "";
    // var genere3 = "";



    dataRef.ref().on("child_added", function(snapshot) {

        console.log("User Name: " + snapshot.val().userName);
        console.log("User Name: " + snapshot.val().password);







        $("#sign-in").on('click', function() {
            event.preventDefault();

            var dbUserName = snapshot.val().userName;
            var dbPassword = snapshot.val().password;

            var signInName = $("#userName").val().trim();
            var signInPw = $("#password").val().trim();

            console.log("User Submitted: " + signInName);
            console.log("User Submitted: " + signInPw);

            if (signInName === dbUserName && signInPw === dbPassword) {
                console.log("true");
                window.open('main_page.html');
            } else {
                console.log("false");

            }


            // var starCountRef = firebase.database().ref(userName);
            // starCountRef.on('value', function(snapshot) {
            //     updateStarCount(postElement, snapshot.val());
            // });

            //return firebase.database().ref(userName).once('value'); //.then(function(snapshot) {
            //     var username = (snapshot.val() && snapshot.val().userName) || 'Anonymous';
            //     console.log(username);
            // })
        });
    });



});