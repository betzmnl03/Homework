class PostsController < ApplicationController

    before_action :find_post, only:[:show, :edit, :update, :destroy]
    def new
        @post = Post.new
    end


    def create
        @post = Post.new post_params

        if @post.save
            flash[:notice]="Post created successfully"
            redirect_to post_path(@post.id)
        else
            render :new
        end
    end


    def index
        @posts = Post.all.order(created_at: :desc)
        
    end

    def show
        @comments = @post.comments.order(created_at: :DESC)
        @comment = Comment.new
    end

    def edit
     
    end

    def update
            if @post.update post_params
                redirect_to post_path(@post.id), notice: "Post edited"
            else
                render :edit
            end
    end

    def destroy
        if @post.destroy
            flash[:notice] = "Post Deleted"
            redirect_to posts_path
        else
            render :show
        end
    end


    private
    def post_params
        params.require(:post).permit(:title, :body)
    end

    def find_post
        @post = Post.find_by_id params[:id]
    end


end

