require 'datarequest'

class DataController < ApplicationController

  def show
    id = params[:id]
    type = params[:type]
    
    if ["rail", "bus", "bikeshare"].include? (type)
      @data = Datarequest.send type, id
    end
    render json: @data.to_json
  end

end