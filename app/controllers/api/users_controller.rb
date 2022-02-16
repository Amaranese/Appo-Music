class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      UserSettings.create(user_id: @user.id)
      login!(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end
  
  private
  
  def selected_user
    User.find(params[:id])
  end
  
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
