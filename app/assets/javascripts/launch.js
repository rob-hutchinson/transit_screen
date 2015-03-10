// Globally-scoped, application-specific namespace object
var App = {
  // Definitions
  Views: {},
  Models: {},
  Collections: {},
  Ajax: {},
  Templates: {},

  // Instance data
  stationData: {},
  stationViews: {},
  coordinates: null,
  interval: null
}

// Callback function for the geolocation API
var geolocationHandler = function(geoposition){

  App.coordinates = {
    latitude: geoposition.coords.latitude,
    longitude: geoposition.coords.longitude
  }

}

var createView = function(model) {
  switch (model.type) {
    case "bikeshare":
      return new App.Views.BikeshareStation(model)
    case "bus":
      return new App.Views.BusStation(model)
    case "rail":
      return new App.Views.RailStation(model)
  }
}

var addView = function(model) {
  var view = createView(model)

  $("#view-container").append(view.$el)

  App.stationViews[model.complexName()] = view
}

$(document).on("ready", function(){

  // HTML5 Geolocation API
  navigator.geolocation.getCurrentPosition( geolocationHandler )

  App.Templates = {
    bikeshare: Handlebars.compile( $("#bikeshare-template").text() ),
    rail: Handlebars.compile( $("#metrorail-template").text() ),
    bus: Handlebars.compile( $("#metrobus-template").text() ),
  }

  // Obviously this needs to change and not be static
  var favoriteStations = [
    { type: "rail", id: "A01" },
    { type: "bus", id: "4001062" },
    { type: "bus", id: "6001231" },
    { type: "bus", id: "1000543" },
    { type: "bikeshare", id: "31002" }
  ]

  App.stationData = new App.Collections.Stations(favoriteStations)
  
  App.stationData.each(addView)

  App.stationData.update()

  App.interval = setInterval(function(){
    App.stationData.update()
  }, 60000)

});