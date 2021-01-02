class AccountsController < ApplicationController
    def show
        @user = User.find(params[:id])
        if @user == current_user
            redirect_to profile_path
        end
    end

    # def update
    #     @profile = current_user.prepare_profile
    #     @profile.assign_attributes(profile_params)
    #     if @profile.save!
    #       @profile.parse_base64(params[:profile][:avatar])

    #       render json: @profile, status: :created, location: @profile
    #     else
    #       render json: @profile.errors, status: :unprocessable_entity
    #     end
    # end
end