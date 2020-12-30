class ArticlesController < ApplicationController
    before_action :authenticate_user!

    def index
        @articles = Article.all
    end

    def show
        @article = Article.find(params[:id])
        @comments = @article.comments
    end

    def new
        @article = current_user.articles.build 
    end

    def create
        @article = current_user.articles.build(article_params)
        if @article.save
          redirect_to root_path, notice: 'Successfully Saved.'
        else
          flash.now[:error] = 'Faild.'
          render :new
        end
    end

    private
    def article_params
        params.require(:article).permit(:content, images: []).merge(user_id: current_user.id)
    end

end
