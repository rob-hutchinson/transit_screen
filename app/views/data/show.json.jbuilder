if type == rail
  @data["Trains"].each do
    json.(@data, :car, :destination, :destinationcode, :destinationname, :group, :line, :locationcode, :locationname, :min)
  end
end

if type == bus
  @data["Predictions"].each do
    json.(@data, :directionnum, :directiontext, :minutes, :routeid, :tripid, :vehicleid)
  end
end

if type == bikeshare
  json.(@data, :id, :name, :terminalname, :lastcommwithserver, :lat, :long, :installed, :locked, :installdate, :removaldate, :temporary, :public, :nbbikes, :nbemptydocs, :latestupdatetime)
end

