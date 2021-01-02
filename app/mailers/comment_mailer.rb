class CommentMailer < ApplicationMailer
    def new_comment(user, article)
      @user = user
      @article = article
      mail to: user.email, subject: 'コメントに返信がありました'
    end
end