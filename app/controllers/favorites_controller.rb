class FavoritesController < ApplicationController
  def create
    unless user_group.any? && user_group.pluck(:fav_id).include?(params[:id])  
      @fav = Favorite.create(fav_type: params[:type], fav_id: params[:id])
      @fav.update user_id: current_user.id
      @fav.save!
      render json: @fav.to_json
    end
  end

  def delete
    @userFavs =  user_group
    # target = @userFavs.where("fav_type = ? AND fav_id = ?", params[:fav_type], params[:fav_id])
    @userFavs.find_by(fav_type: params[:type], fav_id: params[:id]).delete
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
