class DataController < ApplicationController

  def show
    id = []
    id << params[:id]
    type = params[:type]
    overlapping_stations = Paired_Stations.new
    @data = []

    if overlapping_stations.pairs.has_key?(id.first) || overlapping_stations.pairs.has_value?(id.first)
      id << overlapping_stations.find(id.first)
    end

    if ["rail", "bus", "bikeshare"].include? (type)
      if type == "rail"
        id.each do |id|
          Datarequest.send(type, id).each do |x|
            @data.concat x[1]
          end
        end
      else
        @data = Datarequest.send(type, id.first)
      end
    end
    
    render json: @data.to_json

  end

end