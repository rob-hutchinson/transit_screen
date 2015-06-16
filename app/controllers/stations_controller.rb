require 'stationsearch'

class StationsController < ApplicationController

  def index
    # lat = params[:latitude]
    # long = params[:longitude]
    lat = 38.897816
    long = -77.0404246
    type = params[:type]
    range = params[:range] || 3000

    if ["rail", "bus", "bikeshare"].include? (type)
      @stations = Stationsearch.send type, lat, long, range
    end
   
    render json: @stations.to_json

  end

end