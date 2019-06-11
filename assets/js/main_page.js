$(document).ready(function() {

     //spodify data token (needs to be updated by the hour)
     //need to get token to refresh based on login
     var accessToken = "BQDScDuL9lB8M5i33SL0MbF77FcHlE5ZCpgb2XxLyrmglBSLA2QuX9pQ2UqZ6cgeYMXDOVzM35n9f6lSzH3O1hfwB76mw5aXFizVCBFvAZNbnsnAge2SyocdDPrS8Fgaw4gtU9M81Sf2woy6NZ1bpilXhaMacP0vEliQj6AH3k1ma424dQP6XEUwX_QhRpLPt7wLAmhdzkatIQYsgMcL5UtD70IhGlCPTLat3MN4ZQybvCWOQgBpj-e5Nd3bbdUnXVoKOru49u0wlBb00WkI_8JzAp3iUcXukPg";

    //possible spotify login
    // var client_id = '0a5b270d91654c18b699e5c577421c7d'; // Your client id
    // var client_secret = '8318bea258c543538e586b704a29622b'; // Your secret
    // var redirect_uri = 'enter http here'; // Your redirect uri
    
    // url: "https://accounts.spotify.com/authorize?client_id=" + client_id + "&response_type=code&redirect_uri=https%3A%2F%2Fexample.com%2Fcallback&scope=user-read-private%20user-read-email&state=34fFs29kd09",
    // type: GET 

    //globals
    var searchLimit = 20;

    //Google Map
    const lat = 34.0407;
    const lng = -118.2468;

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat, lng }
    });


    // //Initialize Firebase
    // var config = {
    //     apiKey: "AIzaSyBFViyub_erkStzv7HIeYmC7YP1LeisBOc",
    //     authDomain: "music-near-me2.firebaseapp.com",
    //     databaseURL: "https://music-near-me2.firebaseio.com/",
    //     storageBucket: "gs://music-near-me2.appspot.com"
    // };

    // firebase.initializeApp(config);

    // var database = firebase.database();
    // console.log(database);

    //event search submission
    $("#submission").on('click', function() {

        //table clear with new search
        $("#event_info").empty();

        //search input
        // var genreInput = $("#genre").val().trim();
        var genreInput = $("input[name='genre']:checked").val();

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

                for (j = 0; j < searchLimit; j++) {

                    // var track = (spotify.tracks[j].href);
                    // var track = (spotify.tracks[j].uri);
                    var track = (spotify.tracks[j].id);
                    var albumArt = (spotify.tracks[j].album.images[0].url);

                    console.log("Preview Track: " + track);
                    console.log("Album Cover: " + albumArt);

                }
                var albumDisplay = $("<img>");
                albumDisplay.attr("id", "album");
                albumDisplay.attr("src", albumArt);
                albumDisplay.attr("alt", "spotify album_art");
                $("#album_art").empty();
                $("#album_art").append(albumDisplay);

                var trackDisplay = $("<iframe>");
                trackDisplay.attr("src", "https://open.spotify.com/embed/track/" + track);
                trackDisplay.attr("id", "player_layout")
                // trackDisplay.attr("type" + "audio/mpeg");
                $("#player").empty();
                $("#player").append(trackDisplay);
            }
        });

        //ticketmaster data call
        $.ajax({
            type: "GET",
            //global url
            //url: "https://app.ticketmaster.com/discovery/v2/events.json?&apikey=Gtk77jcaAuFCC19bpqEWrINnFUHvix20&classificationName=" + genreInput + "",

            //US url
            //url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Gtk77jcaAuFCC19bpqEWrINnFUHvix20&classificationName=" + genreInput + "",

            //la area url
            url: "https://app.ticketmaster.com/discovery/v2/events.json?&dmaId=324&apikey=Gtk77jcaAuFCC19bpqEWrINnFUHvix20&classificationName=" + genreInput + "",


            dataType: "json",
            success: function(ticketMaster) {
                console.log(ticketMaster);
                //console.log("Genre Requested: " + genreInput);
                //console.log(" ");

                for (i = 0; i < searchLimit; i++) {
                    //main search variable
                    //var search = (json._embedded.events[i]);

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

        //click listener to populate the marker info popup
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
});