App.Views.Station = Backbone.View.extend({

  events: {
    "click .close": "deleteStation"
  },

  initialize: function(model) {
    this.model = model

    this.listenTo(this.model, "change", this.render)

    this.render()
  },

  deleteStation: function() {
    delete App.stationData[this.model.complexName()]
    this.model.destroy()
    this.remove()
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