class CommentsController < ApplicationController
    before_action :find_post
    before_action :authenticated_user!

    def create
        @comment =Comment.new comment_params
        @comment.post=@post
        @comment.user = current_user
        if @comment.save
            redirect_to post_path(@post), notice: "Comment created"   
        else
            @comments = @post.comments.order(created_at: :DESC)
            render "/posts/show" 
        end      
    end

    def destroy
        @comment = Comment.find params[:id]
        if (can? :crud, @comment) || (can? :crud, @post)
            @comment.destroy
            redirect_to post_path(@post), notice: "Comment deleted"  
        else
            redirect_to post_path(@post), alert: "Not authorized to delete comment"
        end
    end


    private
    def find_post
        @post = @post = Post.find_by_id params[:post_id]
    end

    def comment_params
        params.require(:comment).permit(:body)
    end
end
