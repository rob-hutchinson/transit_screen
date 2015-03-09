App.Views.Station = Backbone.View.extend({

  events: {
    "click .close": "deleteStation"
  },

  initialize: function(model) {
    this.model = model

    this.listenTo(this.model, "change", this.render)

    this.render()
  },

  render: function() {
    // no-operation
  },

  deleteStation: function() {
    // TODO
  }

})

App.Views.BikeshareStation = App.Views.Station.extend({

  render: function() {
    this.$el.html( App.Templates.bikeshare(this.model) )
  }

})

App.Views.RailStation = App.Views.Station.extend({
  
  render: function() {
    this.$el.html( App.Templates.rail(this.model) )
  }

})

App.Views.BusStation = App.Views.Station.extend({
  
  render: function() {
    this.$el.html( App.Templates.bus(this.model) )
  }

})