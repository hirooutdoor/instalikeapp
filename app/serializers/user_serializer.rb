class UserSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers
  
    attributes :profile, :avatar_image, :account_name
    has_many :comments
    has_one :profile

end