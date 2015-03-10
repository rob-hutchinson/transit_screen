class FavoritesController < ApplicationController
  def new
    # binding.pry
    @fav = Favorite.create (fav_type: "BUS", fav_id: "23B", user_id: current_user)
  end

  def delete
  end
end
