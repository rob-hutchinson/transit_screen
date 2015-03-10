Rails.application.routes.draw do

  get 'favorites/new'

  get 'favorites/delete'

  devise_for :users

  root to: "application#home"

end
