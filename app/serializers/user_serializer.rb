# == Schema Information
#
# Table name: users
#
#  id                     :bigint           not null, primary key
#  account_name           :string           default(""), not null
#  email                  :string           default(""), not null
#  encrypted_password     :string           default(""), not null
#  remember_created_at    :datetime
#  reset_password_sent_at :datetime
#  reset_password_token   :string
#  created_at             :datetime         not null
#  updated_at             :datetime         not null
#
# Indexes
#
#  index_users_on_account_name          (account_name) UNIQUE
#  index_users_on_email                 (email) UNIQUE
#  index_users_on_reset_password_token  (reset_password_token) UNIQUE
#
class UserSerializer < ActiveModel::Serializer
    include Rails.application.routes.url_helpers
  
    attributes :profile, :avatar_image, :account_name,  :comment_avatar_image
    has_many :comments
    has_one :profile

    def comment_avatar_image
        rails_blob_path(object.avatar_image) if object.avatar_image.attached?
    end
end
