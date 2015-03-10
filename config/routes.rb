Rails.application.routes.draw do

  get 'favorites/new'

  get 'favorites/delete'

  devise_for :users

  root to: "application#home"

  get '/data/:type/:id' => 'data#show', as: 'data'

  get '/nearby/:type' => 'stations#index', as: 'stations'
  
end
