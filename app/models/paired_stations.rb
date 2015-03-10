class Paired_Stations
  
  attr_reader :pairs

  def initialize
    @pairs = { "c01" => "a01", "e06" => "b06", 
      "f01" => "b01", "f03" => "d03" }
  end

  def find id
    if @pairs.has_key?(id)
      extra_request = @pairs.fetch(id)
    else
      extra_request = @pairs.invert.fetch(id)
    end 
  end

end