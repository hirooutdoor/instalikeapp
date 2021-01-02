class UserSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers
  
    attributes :profile, :avatar_image, :account_name,  :comment_avatar_image
    has_many :comments
    has_one :profile

    def comment_avatar_image
        rails_blob_path(object.avatar_image) if object.avatar_image.attached?
    end

end