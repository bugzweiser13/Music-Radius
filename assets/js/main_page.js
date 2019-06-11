$(document).ready(function() {

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
        var accessToken = "BQDTZRCGeDU9_l0mTq716nSES4QblzbUNCYtQgBZqyEcuqmmylMzNhqbgZYjvHgKwH38SPIqg3A80O-G01mu1FfSacmQs79XoRLahTQASlDclWyHO00ls35P72UI7vixaIfNPra-5clTqt1IiJ_IPKDQkvwhaf6dBw";

        $.ajax({
            url: "https://api.spotify.com/v1/recommendations?seed_genres=" + genreInput + "",
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(spodify) {
                console.log(spodify);

                for (j = 0; j < searchLimit; j++) {

                    var track = (spodify.tracks[j].external_urls.spotify);
                    var albumArt = (spodify.tracks[0].album.images[1].url);

                    console.log("Preview Track: " + track);
                    console.log("Album Cover: " + albumArt);

                }
                var albumDisplay = $("<image>");
                albumDisplay.attr("id", "album_art1");
                albumDisplay.attr("src", albumArt);
                albumDisplay.attr("alt", "spotify album_art");
                $("#album_art").append(albumDisplay);
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