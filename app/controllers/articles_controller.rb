class ArticlesController < ApplicationController
    before_action :set_article, only: [:show]
    before_action :authenticate_user!

    def index
        @articles = Article.all
    end

    def show
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
        params.require(:article).permit(:content).merge(user_id: current_user.id)
    end

    def set_article
        @article = Article.find(params[:id])
    end
end
