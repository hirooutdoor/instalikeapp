Rails.application.routes.draw do
  devise_for :users
  root to: "articles#index"

  resources :articles

  resource :profile

  namespace :api, defaults: {format: :json} do
    scope '/articles/:article_id' do
      resource :like, only: [:show, :create, :destroy]
    end
  end
end
