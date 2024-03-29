$(document).ready(function() {

    // //Initialize Firebase
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
    // console.log(dataRef);

    dataRef.ref().on("child_added", function(snapshot) {

        //debugging
        // console.log(snapshot.val());
        // console.log(snapshot.val().name);
        // console.log(snapshot.val().email);
        // console.log(snapshot.val().userName);
        // console.log(snapshot.val().password);
        // console.log(snapshot.val().areaCode);
        // console.log(snapshot.val().genre1);
        // console.log(snapshot.val().genre2);
        // console.log(snapshot.val().genre3);

        // Handle the errors
    }, function(errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });

    //globals

    //get userName areaCode from url
    function getUrlParams() {

        var paramMap = {};
        if (location.search.length == 1) {
            return paramMap;
        }
        var parts = location.search.substring(1).split("&");

        for (var i = 0; i < parts.length; i++) {
            var component = parts[i].split("=");
            paramMap[decodeURIComponent(component[0])] = decodeURIComponent(component[1]);
        }
        return paramMap;
    }

    //url variables
    var params = getUrlParams();
    var userName = params['userName'];
    var areaCode = params['areaCode'];
    var genrePop1 = params['_genre1'];
    var genrePop2 = params['_genre2'];
    var genrePop3 = params['_genre3'];
    // var areaCode1 = number(areaCode);
    var mapCenter;
    var areaDisplay;

    //url debugging
    // console.log(areaCode);
    // console.log("Loaded User Name: " + userName);

    //spodify data token (needs to be updated by the hour)
    //need to get token to refresh based on login
    var accessToken = "BQDoBYOCs2NlhiproTmSp1ZBJBD6sfK3lWiA2TkP5u6GL8ltVjqsynv7qP7Nrrvg7t9vSBWZ1zUgrnbYv1jf6OT7YWoJ-qJbx0lpnDegzQm66-0vG4mibuK_YBaZN1W1k196QYepO1YLafQzIcogpyfurPwF8HH3Z2BteFaIegSmugL5a6PGEiLXK05G8Ceqf7cafW57zLlDfPVOrP8mPJ5sk114pQaz7sS0Elr70DZCjlvxHG8GxpISVT33IbGJX5CZjZIwlhdr5uc9Y2TMXR-oHdtnGCsVN7Q";


    //possible spotify login
    // var client_id = '0a5b270d91654c18b699e5c577421c7d'; // Your client id
    // var client_secret = '8318bea258c543538e586b704a29622b'; // Your secret
    // var redirect_uri = 'enter http here'; // Your redirect uri

    //data search limit (performance)
    var searchLimit = 30;

    //google map opening
    //usa center
    // const lat = 37.09024;
    // const lng = -95.712891;

    //la center
    // const lat = 34.0407;
    // const lng = -118.2468;

    //map load variables
    var areaCodePos = [{
            name: "Los Angeles",
            code: "324",
            position: {
                lat: 34.0407,
                lng: -118.2468
            }
        },
        {
            name: "New York",
            code: "345",
            position: {
                lat: 40.7128,
                lng: -74.0060
            }
        },
        {
            name: "Miami",
            code: "334",
            position: {
                lat: 26.1224,
                lng: -80.1373
            }
        },
        {
            name: "Seattle",
            code: "385",
            position: {
                lat: 47.6062,
                lng: -122.3321
            }
        }
    ];

    //debugging
    // console.log(areaCode);
    // console.log(areaCodePos[0].code);

    //map opening load position
    //user search area html load
    if (areaCode === areaCodePos[0].code) {
        mapCenter = areaCodePos[0].position,
            areaDisplay = areaCodePos[0].name
    } else if (areaCode === areaCodePos[1].code) {
        mapCenter = areaCodePos[1].position,
            areaDisplay = areaCodePos[1].name
    } else if (areaCode === areaCodePos[2].code) {
        mapCenter = areaCodePos[2].position,
            areaDisplay = areaCodePos[2].name
    } else if (areaCode === areaCodePos[3].code) {
        mapCenter = areaCodePos[3].position,
            areaDisplay = areaCodePos[3].name
    };

    //debugging
    // console.log(mapCenter);
    // console.log(areaDisplay);
    // console.log("is this? " + genrePop1);


    //user Information / genre radio buttons HTML population
    $("#uNamePop").append(userName + "&nbsp;&nbsp;");
    $("#areaPop").append("&nbsp;&nbsp;" + areaDisplay);
    $("#genLab1").html(genrePop1 + "&nbsp;&nbsp;");
    $("#genre1").attr("value", genrePop1);
    $("#genLab2").html(genrePop2 + "&nbsp;&nbsp;");
    $("#genre2").attr("value", genrePop2);
    $("#genLab3").html(genrePop3 + "&nbsp;&nbsp;");
    $("#genre3").attr("value", genrePop3);

    //area selectable map 
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: mapCenter
    });

    //la area map
    // var map = new google.maps.Map(document.getElementById('map'), {
    //     zoom: 8,
    //     center: { lat, lng }
    // });

    //reset page
    // $("#reset").click(function() {
    //     deleteMarkers();
    // });

    //event search submission
    $("#submission").on('click', function() {

        //table clear with new search
        $("#event_info").empty();

        //search input
        var genreInput = $("input[name='genre']:checked").val().trim();

        console.log("Selected Genre is: " + genreInput);

        //spodify data call
        $.ajax({
            url: "https://api.spotify.com/v1/recommendations?seed_genres=" + genreInput + "",
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(spotify) {
                console.log(spotify);

                //album art display within the img tag
                //cover will cycle thru every 30 seconds
                //cover will match song playing
                (function albumDisplay() {

                    var l = 0

                    function goA() {

                        var albumDisplay = $("<img>");
                        var albumSkip = (spotify.tracks[l].album.images[0].url);
                        if (l++ < 20) {
                            setTimeout(goA, 40000);
                        }

                        albumDisplay.attr("id", "album");
                        albumDisplay.attr("src", albumSkip);
                        albumDisplay.attr("alt", "spotify album_art");
                        $("#album_art").empty();
                        $("#album_art").append(albumDisplay);
                    }
                    goA();
                })();

                //music player display within the iframe
                //song will cycle thru every 30 seconds
                //song playing will match the album art within the img tag
                (function playerDisplay() {

                    var k = 0

                    function goP() {

                        var trackDisplay = $("<iframe>");
                        var trackSkip = (spotify.tracks[k].id);
                        if (k++ < 20) {
                            setTimeout(goP, 40000);
                        }

                        trackDisplay.attr("src", "https://open.spotify.com/embed/track/" + trackSkip + "&autoplay=true");
                        trackDisplay.attr("id", "player_layout")
                            // trackDisplay.attr("type" + "audio/mpeg");
                        $("#player").empty();
                        $("#player").append(trackDisplay);

                        //console.log(trackSkip);
                    }
                    goP();
                })();
            }
        });

        //ticketmaster data call
        $.ajax({
            type: "GET",
            //global url (too vauge)
            //url: "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=Gtk77jcaAuFCC19bpqEWrINnFUHvix20&classificationName=" + genreInput + "",

            //US url with postal code (too specific)
            //url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Gtk77jcaAuFCC19bpqEWrINnFUHvix20&classificationName=" + genreInput + "&postalCode=" + postalCode + "&radius=" + radius + "&unit=miles",

            //la area url (testing)
            //url: "https://app.ticketmaster.com/discovery/v2/events.json?&dmaId=324&apikey=Gtk77jcaAuFCC19bpqEWrINnFUHvix20&classificationName=" + genreInput + "",

            //selectable area (final production)
            url: "https://app.ticketmaster.com/discovery/v2/events.json?&dmaId=" + areaCode + "&apikey=Gtk77jcaAuFCC19bpqEWrINnFUHvix20&classificationName=" + genreInput + "",

            dataType: "json",
            success: function(ticketMaster) {
                console.log(ticketMaster);

                //console.log("Genre Requested: " + genreInput);
                // console.log("Area Code:  " + areaCode);

                for (i = 0; i < searchLimit; i++) {
                    //main search variable
                    //var search = (ticketMaster._embedded.events[i]);

                    //date formats

                    var showDateRtn = moment(showDate).format("MM/DD/YYYY");
                    var saleDateRtn = moment.utc(saleDate).local().format("MM/DD/YYYY"); // @ HH:MM");

                    //tm data search variables
                    var name = (ticketMaster._embedded.events[i].name)
                    var showDate = (ticketMaster._embedded.events[i].dates.start.localDate);
                    var venue = (ticketMaster._embedded.events[i]._embedded.venues[0].name);
                    var saleDate = (ticketMaster._embedded.events[i].sales.public.startDateTime);
                    //artist tickets link
                    //var ticketLink = (ticketMaster._embedded.events[i]._embedded.attractions[0].url); 
                    //direct event ticket link
                    var ticketLink = (ticketMaster._embedded.events[i].url);
                    //ticket link population
                    var ticketUrl = `<a href=${ticketLink} target='_blank'>${ticketLink}</a>`;
                    var postalCode = (ticketMaster._embedded.events[i]._embedded.venues[0].postalCode);
                    localLat = parseFloat(ticketMaster._embedded.events[i]._embedded.venues[0].location.latitude);
                    localLng = parseFloat(ticketMaster._embedded.events[i]._embedded.venues[0].location.longitude);

                    //table population alternative
                    // $("#event_info").append("<tr><td> " + name + " </td><td> " + showDateRtn + " </td><td> " + venue + " </td><td>" + saleDateRtn + " </td><td class='click'><a href='" + ticketLink + "' target='_blank'>" + ticketLink + "</a></td><tr>");

                    //data table population
                    var row = $("<tr>");
                    var tName = $("<td>").append(name);
                    var tShowDate = $("<td>").append(showDateRtn);
                    var tVenue = $("<td>").append(venue);
                    var tSaleDate = $("<td>").append(saleDateRtn);
                    var tLink = $("<td>").append(ticketUrl);

                    //append data to table
                    row.append(tName, tShowDate, tVenue, tSaleDate, tLink);
                    $("#event_info").append(row);

                    //Map Marker Popup info
                    namePop = name;
                    venuePop = venue;
                    showPop = showDateRtn;
                    salePop = saleDateRtn;
                    tktPop = ticketUrl;

                    //push to map function
                    initMap(
                        localLat,
                        localLng,
                        namePop,
                        venuePop,
                        showPop,
                        salePop,
                        tktPop
                    );

                    //console log / debugging
                    // console.log(search);
                    // console.log("------start of info #" + [i] + "------");
                    // console.log("Artist: " + name);
                    // console.log("Name: " + namePop);
                    // console.log("Event Date: " + showDateRtn);
                    // console.log("Venue: " + venue);
                    // console.log("Public Sale Date: " + saleDateRtn);
                    // console.log("Tickets: " + ticketLink);
                    // console.log("Event Postal Code: " + postalCode);
                    // console.log("Event longitude: " + localLng);
                    // console.log("Event latitude: " + localLat);
                    // console.log("lat type", (typeof parseInt(localLat)));
                    // console.log("-------end of info #" + [i] + "--------");
                    // console.log(" ");

                }
            },
            error: function(xhr, status, err) {
                // This time, we do not end up here!
            }
        });
        return false;
    });

    //Google Map Marker Population, based on Ticketmaster Data
    function initMap() {

        //marker location placement
        var eventMarker = {
            lat: localLat,
            lng: localLng,
        };

        //marker popup data display
        var contentString = '<div id=popUp>' +
            '<div id="title">Title: ' + namePop + '</div>' +
            '<div id="venue">Venue: ' + venuePop + '</div>' +
            '<div id="showDte">Show Date: ' + showPop + '</div>' +
            '<div id="saleDte">On Sale: ' + salePop + '</div>' +
            '<div id="tickets">Tickets: ' + tktPop + '</div>' +
            '</div>';

        //marker popup window command
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        //marker popup creation / placement (from ticketmaster api data population)
        var marker = new google.maps.Marker({
            position: eventMarker,
            map: map
        });

        //click listener to populate the marker information popup
        google.maps.event.addListener(marker, 'click', function() {
            if (!marker.open) {
                infowindow.open(map, marker);
                marker.open = true;
            } else {
                infowindow.close();
                marker.open = false;
            }
            google.maps.event.addListener(map, 'click', function() {
                infowindow.close();
                marker.open = false;
            });
        });
    }

    //toggle between map and table view for events (div hide)
    $("#toggle").on('click', function() {
        var $div1 = $('#mapContainer'),
            $div2 = $('#table')

        if ($div1.is(':visible')) {
            $div1.hide();
            $div2.show();
        } else if ($div1.is(':visible') && $div2.is(':hidden')) {
            $div2.show();
        } else {
            $div1.show();
            $div2.hide();
        }
    });
});