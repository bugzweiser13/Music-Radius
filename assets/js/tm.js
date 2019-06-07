var limit = 20;

$("#submission").on('click', function() {
    var genreInput = $("#genre").val();
    $.ajax({
        type: "GET",
        //global url
        //url: "https://app.ticketmaster.com/discovery/v2/events.json?size=" + limit + "&apikey=Gtk77jcaAuFCC19bpqEWrINnFUHvix20&genreId=" + genreInput + "",

        //la area link
        //url: "https://app.ticketmaster.com/discovery/v2/events.json?classificationName=music&dmaId=324&apikey=Gtk77jcaAuFCC19bpqEWrINnFUHvix20&classificationName=" + genreInput + "",

        //US link
        url: "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=Gtk77jcaAuFCC19bpqEWrINnFUHvix20&classificationName=" + genreInput + "",
        dataType: "json",
        success: function(json) {
            console.log(json);
            console.log("Genre Requested: " + genreInput);
            console.log(" ");

            for (i = 0; i < limit; i++) {
                //main search variable
                //var search = (json._embedded.events[i]);

                //date formats
                var showDateRtn = moment(showDate).format("MM/DD/YYYY");
                var saleDateRtn = moment.utc(saleDate).local().format("MM/DD/YYYY"); // @ HH:MM");

                //search variables
                var name = (json._embedded.events[i].name)
                var showDate = (json._embedded.events[i].dates.start.localDate);
                var venue = (json._embedded.events[i]._embedded.venues[0].name);
                var saleDate = (json._embedded.events[i].sales.public.startDateTime);
                var ticketLink = (json._embedded.events[i]._embedded.attractions[0].url);

                // var ticketUrl = ("<a href='" + ticketLink + "' target='_blank'>" + ticketLink + "</a>");
                var ticketUrl = `<a href=${ticketLink} target='_blank'>${ticketLink}</a>`;

                var myObj = {
                    bob: [{
                        event: 'something',
                        time: '800'
                    }]
                }

                console.log(myObj.bob[0].time);



                //table population"
                // $("#event_info").append("<tr><td> " + name + " </td><td> " + showDateRtn + " </td><td> " + venue + " </td><td>" + saleDateRtn + " </td><td class='click'><a href='" + ticketLink + "' target='_blank'>" + ticketLink + "</a></td><tr>");

                var row = $("<tr>");
                var tName = $("<td>").append(name);
                var tShowDate = $("<td>").append(showDateRtn);
                var tVenue = $("<td>").append(venue);
                var tSaleDate = $("<td>").append(saleDateRtn);
                var tLink = $("<td>").append(ticketUrl);
                row.append(tName, tShowDate, tVenue, tSaleDate, tLink);
                $("#event_info").append(row);

                //$("#event_info").append("<td>");
                //$("#event_info").append(name);
                //$("#event_info").append("<td>");
                //$("#event_info").append(showDateRtn);
                //$("#event_info").append("<td>");
                //$("#event_info").append(venue);
                // $("#event_info").append("<td>");
                //$("#evnt_info").append(saleDateRtn);
                //$("#event_info").append("<td>");
                //$("#event_info").append("<a href='" + ticketLink + "' target='_blank'>" + ticketLink + "</a>");

                //console log / debugging
                //console.log(search);
                console.log("------start of info #" + [i] + "------");
                console.log("Artist: " + name);
                console.log("Event Date: " + showDateRtn);
                console.log("Venue: " + venue);
                console.log("Public Sale Date: " + saleDateRtn);
                console.log("Tickets: " + ticketLink);
                console.log("-------end of info #" + [i] + "--------");
                console.log(" ");

            }
        },
        error: function(xhr, status, err) {
            // This time, we do not end up here!
        }
    });
    return false;
});