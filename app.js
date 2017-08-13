// Problem: look at a user's badge count and points
// Solution: use Node.js to connect to Treehouse's API to get profile information to print out
const https = require('https');
const http = require('http');
//Function to print message to console

// print error messages
function printError(error) {
  console.error(error.message);
}

function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
  console.log(message);
}

function getProfile(username) {
  try {
    // connect to api url(https://teamtreehouse.com/devonmoubry.json)
    const request = https.get('https://teamtreehouse.com/' + username + '.json', response => {
      if (response.statusCode === 200) {
        let body = "";
        // read the data
        response.on('data', (data) => {
          body += data.toString();
        })
        response.on('end', () => {
          try {
            // parse the data
            const profile = JSON.parse(body);
            // print the data
            printMessage(username, profile.badges.length, profile.points.JavaScript)
          } catch (e) {
            printError(e);
          }
        })
      } else {
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    })
    request.on('error', printError)
  } catch (e) {
    printError(e);
  }
}
const users = process.argv.slice(2);
users.forEach(getProfile);
