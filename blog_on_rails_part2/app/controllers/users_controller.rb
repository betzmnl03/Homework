class UsersController < ApplicationController
    before_action :authenticated_user!, only: [:edit, :show]
  
    def new
        @user=User.new
    end
    def create
        @user=User.new user_params
        if @user.save
            session[:user_id]=@user.id
            redirect_to root_path, notice: "Logged in!"
        else
            render :new
        end
        puts @user
    end

    def edit
        @flag=true
        @user = User.find_by_id params[:id]
        
    end


    def update
        @user = User.find_by_id params[:id]
        if @user.update user_params_details
            redirect_to root_path, notice: "Profile details updated"
        else
            render :edit
        end
    end

    def change_password
        @user = User.find_by_id params[:user_id]
        @current_password = params[:current_password]
        @new_password = params[:password]
        @new_password_confirmation = params[:password_confirmation]
        #checking whether password_digest in db is same as current_password
        if @user && @user.authenticate(@current_password)
            if((@current_password != @new_password)&& (@new_password == @new_password_confirmation))
                password_digest = params.permit(:new_password)
                @user.update password_params
                redirect_to root_path, notice: "Password changed"
            elsif ((@current_password == @new_password))
                flash[:alert]="New password should be different"
            elsif((@current_password != @new_password) &&(@new_password != @new_password_confirmation))
                flash[:alert] ="New passwords do not match"
            end
        end
        
    end
    private
    def user_params
        params.require(:user).permit(:name, :email, :password, :password_confirmation)
    end
    def user_params_details
        params.require(:user).permit(:name, :email)
    end

    def password_params
        params.permit(:password, :password_confirmation)
    end


end
