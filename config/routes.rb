Rails.application.routes.draw do
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
  devise_for :users
  root to: "articles#index"

  resources :articles

  resource :profile

  namespace :api, defaults: {format: :json} do
    scope '/articles/:article_id' do
      resource :like, only: [:show, :create, :destroy]
      resources :comments, only: [:index, :create, :destroy]
    end
  end
end
