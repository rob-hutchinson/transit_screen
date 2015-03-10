App.Models.Station = Backbone.Model.extend({

  initialize: function(attributes) {
    this.idCode = attributes.id
    this.type = attributes.type
    this.hasData = false
  },

  favorite: function() {
    App.Ajax.addStation((function(){}).bind(this), this.type, this.idCode)
  },

  unfavorite: function() {
    App.Ajax.deleteStation((function(){}).bind(this), this.type, this.idCode)
  },

  update: function() {
    App.Ajax.getStationData((function(data){
      this.hasData = true
      this.set(data)
    }).bind(this), this.type, this.idCode)
  },

  complexName: function() {
    return this.type + "|" + this.idCode
  },

  getWidth: function() {
    if (this.type !== "bikeshare") {
      return 0
    }

    var bikes = (this.get("nbBikes") * 1)
    var docks = (this.get("nbEmptyDocks") * 1)

    if (bikes + docks > 0) {
      return (bikes / (bikes + docks)) * 100 + "%"
    }

    return 0
  },

  display: function() {
    if (this.hasData === false) {
      return {
        loading: true
      }
    }

    var attributes = this.toJSON()

    switch(this.type) {
      case "bikeshare":
        
        return {
          spotlight: !!attributes.spotlight,
          title: attributes.name,
          bikes: attributes.nbBikes,
          docks: attributes.nbEmptyDocks
        }


      case "rail":
        
        if (attributes.Trains.length === 0) {
          return {
            error: "No train data for this station"
          }
        }

        return {
          title: _.first(attributes.Trains).LocationName,
          spotlight: !!attributes.spotlight,
          trains: _.map(attributes.Trains, function(train){
            return {
              line: train.Line,
              destination: train.DestinationName,
              time: train.Min
            }
          })
        }


      case "bus":
        
        if (!attributes.StopName) {
          return {
            error: "No data for this bus stop"
          }
        }

        return {
          title: attributes.StopName,
          spotlight: !!attributes.spotlight,
          buses: _.map(_.first(attributes.Predictions, 6), function(bus){
            return {
              route: bus.RouteID,
              destination: bus.DirectionText,
              time: bus.Minutes
            }
          })
        }

    }
  }

})

App.Collections.Stations = Backbone.Collection.extend({

  model: App.Models.Station,

  update: function() {
    this.each(function(model){
      model.update()
    })
  },

  load: function(data) {
    this.add(data)
    this.trigger("loaded")
  }

})