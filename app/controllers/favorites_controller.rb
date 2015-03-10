class FavoritesController < ApplicationController
  def create
    @fav = Favorite.create(params[:favorite])
    @fav.save!
    render json: @fav.to_json
  end

  def delete
    @userFavs =  user_group
    @userFavs.where("fav_type = ? AND fav_id = ?", params[:fav_type], params[:fav_id])
    # return success/failure
  end

  def list
    @favs = user_group
    render json: @favs.to_json
  end

  def user_group
    current_user.favorites
  end
end
