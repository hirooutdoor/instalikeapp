# == Schema Information
#
# Table name: comments
#
#  id         :bigint           not null, primary key
#  content    :text             not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  article_id :bigint           not null
#  user_id    :bigint           not null
#
# Indexes
#
#  index_comments_on_article_id  (article_id)
#  index_comments_on_user_id     (user_id)
#
class Comment < ApplicationRecord

    validates :content, {presence: true, length: {maximum: 140}}
    
    belongs_to :user
    belongs_to :article

    after_create :send_email

    private
    def send_email
        CommentMailer.new_comment(user, article).deliver_later
    end
end
