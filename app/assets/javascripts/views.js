App.Views.Station = Backbone.View.extend({

  events: {
    "click .close": "deleteStation",
    "click .star": "addStation"
  },

  initialize: function(model) {
    this.model = model

    this.listenTo(this.model, "change", this.render)

    this.render()
  },

  deleteStation: function() {
    delete App.stationData[this.model.complexName()]
    this.model.unfavorite()
    this.remove()
  },

  addStation: function() {
    App.stationData.add({
      id: this.model.idCode,
      type: this.model.type
    })

    var newModel = App.stationData.last()

    addView(newModel)
    newModel.favorite()
    newModel.update()

    App.layoutViews.overlay.hide()
  }

})

App.Views.BikeshareStation = App.Views.Station.extend({

  className: "bikeshare station",

  render: function() {
    this.$el.html( App.Templates.bikeshare(this.model.display()) )

    this.$(".background").css("width", this.model.getWidth())
  }

})

App.Views.RailStation = App.Views.Station.extend({
  
  className: "rail station",

  render: function() {
    this.$el.html( App.Templates.rail(this.model.display()) )
  }

})

App.Views.BusStation = App.Views.Station.extend({
  
  className: "bus station",

  render: function() {
    this.$el.html( App.Templates.bus(this.model.display()) )
  }

})


/*************/


App.Views.HeaderView = Backbone.View.extend({

  events: {
    "click .add-button": "showOverlay"
  },

  initialize: function() {
    this.render()
  },

  render: function() {
    this.$el.html( App.Templates.header() )
  },

  showOverlay: function() {
    App.layoutViews.overlay.show()
  }

})

App.Views.OverlayView = Backbone.View.extend({

  events: {
    "click .overlay-background": "hide",
    "click .list-item": "clickItem"
  },

  initialize: function() {
    this.render()

    this.listenTo(App.nearbyStationData.rail, "loaded", this.renderRail)
    this.listenTo(App.nearbyStationData.bus, "loaded", this.renderBus)
    this.listenTo(App.nearbyStationData.bikeshare, "loaded", this.renderBikeshare)
  },

  render: function() {
    this.$el.html( App.Templates.overlay() )
  },

  renderRail: function() {
    var stations = App.nearbyStationData.rail.toJSON()
    stations = _.map(stations, function(station){
      return  {
        type: "rail",
        id: station.StationCode1,
        title: station.Description.split(",")[0]
      }
    })

    this.$(".list-rail").html( App.Templates.stationList(stations) )
  },

  renderBus: function() {
    var stations = App.nearbyStationData.bus.toJSON()
    stations = _.map(stations, function(stop){
      return  {
        type: "bus",
        id: stop.StopID,
        title: stop.Name
      }
    })

    this.$(".list-bus").html( App.Templates.stationList(stations) )
  },

  renderBikeshare: function() {
    var stations = App.nearbyStationData.bikeshare.toJSON()
    stations = _.map(stations, function(station){
      return  {
        type: "bikeshare",
        id: station.terminalName,
        title: station.name
      }
    })

    this.$(".list-bikeshare").html( App.Templates.stationList(stations) )
  },

  show: function() {
    this.$el.addClass("display")
  },

  hide: function() {
    this.$el.removeClass("display")
  },

  clickItem: function(evt) {
    var $item = $(evt.target).closest(".list-item")
    var type = $item.attr("data-type")
    var id = $item.attr("data-id")

    this.spotlightModel = new App.Models.Station({
      id: id,
      type: type,
      spotlight: true
    })

    switch(type) {
      case "rail":
        this.spotlightView = new App.Views.RailStation(this.spotlightModel)
        break
      case "bus":
        this.spotlightView = new App.Views.BusStation(this.spotlightModel)
        break
      case "bikeshare":
        this.spotlightView = new App.Views.BikeshareStation(this.spotlightModel)
        break
    }

    this.$(".list-spotlight").html( this.spotlightView.$el )

    this.spotlightModel.update()
  }

})