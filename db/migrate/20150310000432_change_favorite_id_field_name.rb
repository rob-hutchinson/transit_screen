class ChangeFavoriteIdFieldName < ActiveRecord::Migration
  change_table :favorites do |t|
    t.rename :station_id, :fav_id
  end
end
