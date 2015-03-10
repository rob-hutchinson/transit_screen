App.Ajax = {

  getFavoriteStations: function(callback) {

    $.ajax({
      url: "/favorites",
      method: "GET",
      success: callback
    })

  },

  // Get a specific station's data  
  getStationData: function(callback, type, stationId) {

    $.ajax({
      url: "/data/" + type + "/" + stationId,
      method: "GET",
      success: callback
    })

  },

  // Get the nearby stations for a type, passing in lat/long
  getNearbyStations: function(callback, type, latitude, longitude, range) {

    $.ajax({
      url: "/nearby/" + type,
      data: {
        latitude: latitude,
        longitude: longitude,
        range: range
      },
      method: "GET",
      success: callback
    })

  },

  // Add a stations to a user's favorites
  addStation: function(callback, type, stationId) {

    $.ajax({
      url: "/favorites",
      method: "POST",
      data: {
        type: type,
        id: stationId
      },
      success: callback
    })

  },

  // Delete a station from a user's favorites
  deleteStation: function(callback, type, stationId) {

    $.ajax({
      url: "/favorites",
      method: "DELETE",
      data: {
        type: type,
        id: stationId
      },
      success: callback
    })

  }

};