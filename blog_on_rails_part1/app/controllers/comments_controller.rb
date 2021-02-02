class CommentsController < ApplicationController
    before_action :find_post

    def create
        @comment =Comment.new comment_params
        @comment.post=@post
        @comment.save
        puts "**************************"
        puts "#{@comment.post}"
        redirect_to post_path(@post), notice: "Comment created"          
    end

    def destroy
        @comment = Comment.find params[:id]
        @comment.destroy
        redirect_to post_path(@post), notice: "Comment deleted"  
    end


    private
    def find_post
        @post = @post = Post.find_by_id params[:post_id]
    end

    def comment_params
        params.require(:comment).permit(:body)
    end
end
