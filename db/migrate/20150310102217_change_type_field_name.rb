class ChangeTypeFieldName < ActiveRecord::Migration
  change_table :favorites do |t|
    t.rename :type, :fav_type
  end
end
