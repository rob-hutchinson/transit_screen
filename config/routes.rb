Rails.application.routes.draw do

  get  '/favorites' => 'favorites#list', as: 'favorites_list'
  post '/favorites' => 'favorites#create', as: 'favorites_create'
  delete '/favorites' => 'favorites#delete', as: 'favorites_delete'
  

  devise_for :users

  root to: "application#home"

  get '/data/:type/:id' => 'data#show', as: 'data'

  get '/nearby/:type' => 'stations#index', as: 'stations'
  
end
