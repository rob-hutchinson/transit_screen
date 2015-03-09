class Datarequest

  # include httparty

  def self.rail id
    HTTParty.get("https://api.wmata.com/StationPrediction.svc/json/GetPrediction/#{id}?api_key=#{ENV["WMATA_KEY"]}")
  end

  def self.bus id
    HTTParty.get("https://api.wmata.com/NextBusService.svc/json/jPredictions?StopID=#{id}&api_key=#{ENV["WMATA_KEY"]}")
  end

  def self.bikeshare id
    data = HTTParty.get("http://www.capitalbikeshare.com/data/stations/bikeStations.xml")
    terminal_index = data["stations"]["station"].find_index {|x| x["terminalName"] == "#{id}"}
    data = data["stations"]["station"][terminal_index]
  end
end