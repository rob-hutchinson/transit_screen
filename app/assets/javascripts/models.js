App.Models.Station = Backbone.Model.extend({

  initialize: function(attributes) {
    this.idCode = attributes.id
    this.type = attributes.type
  },

  update: function() {
    App.Ajax.getStationData((function(data){
      this.set(data)
    }).bind(this), this.type, this.idCode)
  },

  display: function() {
    var attributes = this.toJSON()

    switch(this.type) {
      case "bikeshare":
        
        return {
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
  }

})