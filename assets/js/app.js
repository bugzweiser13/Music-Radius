    var request = require('request'); // "Request" library

    var client_id = '0a5b270d91654c18b699e5c577421c7d'; // Your client id
    var client_secret = '8318bea258c543538e586b704a29622b'; // Your secret

    // your application requests authorization
    var authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
        },
        form: {
            grant_type: 'client_credentials'
        },
        json: true
    };

    request.post(authOptions, function(error, response, body) {
        if (!error && response.statusCode === 200) {

            // use the access token to access the Spotify Web API
            var token = body.access_token;
            var options = {
                url: 'https://api.spotify.com/v1/users/bugzweiser',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
                json: true
            };
            request.get(options, function(error, response, body) {
                console.log(body);
            });
        }
    });