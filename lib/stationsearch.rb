class Stationsearch

  def self.rail lat, long, range
    stations = HTTParty.get("https://api.wmata.com/Rail.svc/json/jStationEntrances?Lat=#{lat}&Lon=#{long}&Radius=#{range}&api_key=#{ENV["WMATA_KEY"]}")    
#     y = []
#     binding.pry
#     stations["Entrances"].each do |x|
#       unless y.each {|y| y.has_value?(x["StationCode1"])}
# binding.pry
#         y << x
#       end
#     end
  end

  def self.bus lat, long, range
    stations = HTTParty.get("https://api.wmata.com/Bus.svc/json/jStops?Lat=#{lat}&Lon=#{long}&Radius=#{range}&api_key=#{ENV["WMATA_KEY"]}")
  end
end