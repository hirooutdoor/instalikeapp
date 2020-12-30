class Api::CommentsController < Api::ApplicationController

    def index
        article = Article.find(params[:article_id])
        comments = article.comments
        user_id = comments.pluck(:user_id)
        @user = User.where(id: user_id)

        render json: comments
    end

    def create
        article = Article.find(params[:article_id])
        @comment = article.comments.build(comment_params)
        @comment.save!

        render json: @comment, include: {user: [ :profile]}
    end

    private
    def comment_params
        params.require(:comment).permit(:content).merge(user_id: current_user.id)
    end
end