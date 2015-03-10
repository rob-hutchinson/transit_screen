class Stationsearch

  def self.rail lat, long, range
    stations = HTTParty.get("https://api.wmata.com/Rail.svc/json/jStationEntrances?Lat=#{lat}&Lon=#{long}&Radius=#{range}&api_key=#{ENV["WMATA_KEY"]}")    
    stations["Entrances"].uniq {|station| station["StationCode1"]}
  end

  def self.bus lat, long, range
    stations = HTTParty.get("https://api.wmata.com/Bus.svc/json/jStops?Lat=#{lat}&Lon=#{long}&Radius=#{range}&api_key=#{ENV["WMATA_KEY"]}")
  end
end