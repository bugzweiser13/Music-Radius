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
    //debugging
    console.log(dataRef);

    dataRef.ref().on("child_added", function(snapshot) {

        // debugging
        // console.log("User Name: " + snapshot.val().userName);
        // console.log("User Name: " + snapshot.val().password);


        $("#sign-in").on('click', function() {
            event.preventDefault();

            var dbUserName = snapshot.val().userName;
            var dbPassword = snapshot.val().password;

            var signInName = $("#userName").val().trim();
            var signInPw = $("#password").val().trim();

            // debugging
            // console.log("User Submitted: " + signInName);
            // console.log("User Submitted: " + signInPw);

            if (signInName === dbUserName && signInPw === dbPassword) {
                //console.log("true");
                var myUrl = "main_page.html?userName=" + snapshot.val().userName + "&areaCode=" + snapshot.val().areaCode;
                window.open(myUrl, "_blank"); //?&areaCode=' + areaCode + '&userName=' + userName + '');
            } else {
                //console.log("false");
                location.reload();
            }
        });
    });



});