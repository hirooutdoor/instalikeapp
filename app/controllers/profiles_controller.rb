class ProfilesController < ApplicationController

    before_action :authenticate_user!

    def show
        @profile = current_user.profile
    end

    def edit
        @profile = current_user.prepare_profile
    end

    def update
        @profile = current_user.prepare_profile
        @profile.assign_attributes(profile_params)
        @profile.save!

        render :show
    end

    private
    def profile_params
      params.(:profile).permit(:avatar)
    end

end
