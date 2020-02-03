/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const PythonShell = require('python-shell');
var Promise = require('promise');
var client_id = 'cd3bd3b38b1d43959805bb18b5ceeab9'; // Your client id
var client_secret = '655749a432f045379672eaf06ff2e781'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri
const fs = require('fs');
const spawn = require("child_process").spawn;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {
  var state = generateRandomString(16);
  res.cookie(stateKey, state);
  var scope = 'user-read-private user-read-email';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
      }
    )
  );
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      })
    );
  } 

  else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        var access_token = body.access_token;
            refresh_token = body.refresh_token;
        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          })
        );
      }

      else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          })
        );
      }

  function t(req, res) {
    var songID = req.query.songID;
    var audioanalysis = {
      url:'https://api.spotify.com/v1/audio-analysis/' + songID,
      headers: {'Authorization': 'Bearer ' + access_token},
      json: true
    };

    chords = []
    counter=0
          
    var notes1 = request.get(audioanalysis, 
      function (error, response, body) {
        notes = body.segments.map(function(item) {
          if (item.timbre[0] > 40) {
            for (i=0; i<item.pitches.length; i++) {
              if (item.pitches[i] == 1 || item.pitches[i] >= 0.8 ) {   

                if (i == 0) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('C')
                  }
                  else {
                    chords[counter].push('C')
                  }
                }

                else if (i == 1) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('C#')
                  }
                  else {
                    chords[counter].push('C#')
                  }
                }

                else if (i == 2) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('D')
                  }
                  else {
                    chords[counter].push('D')
                  }
                }

                else if (i == 3) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('D#')
                  }
                  else {
                    chords[counter].push('D#')
                  }
                }
                  
                else if (i == 4) {
                  if (typeof chords[counter] != 'object') {
                      chords[counter] = []
                      chords[counter].push('E')
                    }
                  else {
                    chords[counter].push('E')
                  }
                }

                else if (i == 5) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('F')
                  }
                  else {
                    chords[counter].push('F')
                  }
                }

                else if (i == 6) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('F#')
                  }
                  else {
                    chords[counter].push('F#')
                  }
                }

                else if (i == 7) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('G')
                  }
                  else {
                    chords[counter].push('G')
                  }
                }

                else if (i == 8) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('G#')
                  }
                  else {
                    chords[counter].push('G#')
                  }
                }
                  
                else if (i == 9) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('A')
                  }
                  else {
                    chords[counter].push('A')
                  }
                }

                else if (i == 10) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('A#')
                  }
                  else {
                    chords[counter].push('A#')
                  }
                }
                  
                else if (i==11) {
                  if (typeof chords[counter] != 'object') {
                    chords[counter] = []
                    chords[counter].push('B')
                  }
                  else {
                    chords[counter].push('B')
                  }
                }
              
              }
            }

          chords[counter].push(item.start);
          counter = counter+1;
            
          }
        });
      r();
    });
  };

function r(t) {
  var chordfile = fs.writeFile("log.json", JSON.stringify(chords), function(err) {
    if (err) {
      return console.log(err);
    }
  });   
  q();
};

function q(r) {
  const PythonShell = require('python-shell');
  PythonShell.PythonShell.run('image_generator.py', {pyPath: '/Users/vishrutig/Applications/Xcode.app/Contents/Developer/usr/bin/python3'}, function(err, results) {
    if (err) {
      return console.log(err);
    }
  });
};
 
app.get('/test', t);

});
}
});

app.get('/refresh_token', function(req, res) {
  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});
 
app.listen(8888);