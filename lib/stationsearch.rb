require 'haversine'

class Stationsearch

  def self.rail lat, long, range
    stations = HTTParty.get("https://api.wmata.com/Rail.svc/json/jStationEntrances?Lat=#{lat}&Lon=#{long}&Radius=#{range}&api_key=#{ENV["WMATA_KEY"]}")    
    stations["Entrances"].uniq {|station| station["StationCode1"]}
  end

  def self.bus lat, long, range
    stations = HTTParty.get("https://api.wmata.com/Bus.svc/json/jStops?Lat=#{lat}&Lon=#{long}&Radius=#{range}&api_key=#{ENV["WMATA_KEY"]}")
  end

  def self.bikeshare lat, long, range
    near_stations = []
    all_stations = HTTParty.get("http://www.capitalbikeshare.com/data/stations/bikeStations.xml")

    all_stations["stations"]["station"].each do |x|
      if Haversine.distance( x["lat"].to_f, x["long"].to_f, lat.to_f, long.to_f)*1000 < range.to_f
        near_stations << x
      end
    end
    
    near_stations 
  end

end