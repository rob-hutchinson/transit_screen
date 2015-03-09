// Globally-scoped, application-specific namespace object
var App = {
  Coordinates: {},
  Views: {},
  Models: {},
  Ajax: {}
}

// Callback function for the geolocation API
var geolocationHandler = function(geoposition){

  App.Coordinates = {
    latitude: geoposition.coords.latitude,
    longitude: geoposition.coords.longitude
  }

}

$(document).on("ready", function(){

  // HTML5 Geolocation API
  navigator.geolocation.getCurrentPosition( geolocationHandler )

});