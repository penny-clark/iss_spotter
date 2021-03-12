const request = require('request-promise-native');

const fetchMyIP = function() {
  return request('https://api64.ipify.org?format=json');
};

/*
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};


const fetchISSFlyOverTimes = function(body) {
  //example shows that we're supposed to have .data after (body) but this breaks things for me
  //seems to behave fine when written as below
  const { latitude, longitude } = JSON.parse(body);
  const url = `http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`;
  return request(url);
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
    .catch((error) => {
      console.log("It didn't work: ", error.message);
    });
};

module.exports = { nextISSTimesForMyLocation };