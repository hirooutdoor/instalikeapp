class ProfileSerializer < ActiveModel::Serializer
    attributes :id, :avatar, :user
    
    belongs_to :user
end