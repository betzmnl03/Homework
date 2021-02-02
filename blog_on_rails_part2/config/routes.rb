Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "posts#index"
  resources :posts do
    resources :comments
  end

  resources :users do
    get('password', {to: "users#change_password"})
    post('password', {to: "users#change_password"})
  end

 

  resource :session, only:[:new, :create, :destroy]
end
