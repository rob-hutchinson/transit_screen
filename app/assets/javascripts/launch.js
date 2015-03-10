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
  nearbyStationData: {},
  layoutViews: {},
  stationViews: {},
  coordinates: null,
  interval: null
}


var getNearbyStations = function() {

  App.Ajax.getNearbyStations(function(data){
    App.nearbyStationData.bikeshare.load(data)
  }, "bikeshare", App.coordinates.latitude, App.coordinates.longitude, 500)

  App.Ajax.getNearbyStations(function(data){
    App.nearbyStationData.rail.load(data)
  }, "rail", App.coordinates.latitude, App.coordinates.longitude, 1500)

  App.Ajax.getNearbyStations(function(data){
    App.nearbyStationData.bus.load(data.Stops)
  }, "bus", App.coordinates.latitude, App.coordinates.longitude, 300)

}

// Callback function for the geolocation API
var geolocationHandler = function(geoposition){

  App.coordinates = {
    latitude: geoposition.coords.latitude,
    longitude: geoposition.coords.longitude
  }

  getNearbyStations()

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

var addLayoutViews = function() {
  App.layoutViews.header = new App.Views.HeaderView({
    el: $("#header-container")[0]
  })
  
  App.layoutViews.overlay = new App.Views.OverlayView({
    el: $("#overlay-container")[0]
  })
}

$(document).on("ready", function(){

  // HTML5 Geolocation API
  navigator.geolocation.getCurrentPosition( geolocationHandler )

  App.Templates = {
    bikeshare: Handlebars.compile( $("#bikeshare-template").text() ),
    rail: Handlebars.compile( $("#metrorail-template").text() ),
    bus: Handlebars.compile( $("#metrobus-template").text() ),
    header: Handlebars.compile( $("#header-template").text() ),
    overlay: Handlebars.compile( $("#overlay-template").text() ),
    stationList: Handlebars.compile( $("#station-list-template").text() )
  }

  // Obviously this needs to change and not be static
  var favoriteStations = [
    { type: "rail", id: "A01" },
    { type: "bus", id: "4001062" },
    { type: "bus", id: "6001231" },
    { type: "bus", id: "1000543" },
    { type: "bikeshare", id: "31002" }
  ]

  App.nearbyStationData = {
    bikeshare: new App.Collections.Stations(),
    rail: new App.Collections.Stations(),
    bus: new App.Collections.Stations()
  }

  addLayoutViews()

  App.stationData = new App.Collections.Stations(favoriteStations)
  App.stationData.each(addView)
  App.stationData.update()

  App.interval = setInterval(function(){
    App.stationData.update()
  }, 60000)

});