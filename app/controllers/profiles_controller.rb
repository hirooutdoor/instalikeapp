class ProfilesController < ApplicationController

    before_action :authenticate_user!

    def show
    end

    # def create
    #     user = User.create!(user_params)
    #     session[:user_id] = user.id
    #     redirect_to root_path
    # end

    private
    def user_params
      params.require(:user).permit(:email, :password, :account_name, :avatar)
    end

end
