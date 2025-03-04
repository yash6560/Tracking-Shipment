const axios = require("axios");

const getCoordinatesLive = async(location) => {
    try {
                const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
                  params: {
                    format: "json",
                    q: location,
                  },
                  timeout: 5000,
                });
        
                if (response.data.length > 0) {
                  return [parseFloat(response.data[0].lat), parseFloat(response.data[0].lon)];
                }
                return null;
              } catch (error) {
                console.log(`Coordinates Fetch Error for ${location}:`, error.message);
                return null;
              }
}

module.exports = getCoordinatesLive;