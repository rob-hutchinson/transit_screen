require 'stationsearch'

class StationsController < ApplicationController

  def index
    lat = params[:latitude]
    long = params[:longitude]
    type = params[:type]
    range = params[:range] || 300

    if ["rail", "bus", "bikeshare"].include? (type)
      @stations = Stationsearch.send type, lat, long, range
    end
   
    render json: @stations.to_json

  end

end