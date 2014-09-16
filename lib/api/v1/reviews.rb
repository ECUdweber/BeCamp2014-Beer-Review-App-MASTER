class Review < ActiveRecord::Base
  attr_accessible :beer_name,:maker,:drink_again,:rating,:comments,:date_added

  class Entity < Grape::Entity
    expose :id,:beer_name,:maker,:drink_again,:rating,:comments,:date_added
  end
end

ActiveRecord::Base.include_root_in_json = false

class Reviews < Grape::API  
  format :json

  resource :reviews do
    params do
      optional :name, type: String
    end
	  
    get do
	  Review.all
    end	
	
    get ':id' do
	  Review.find(params[:id])
    end	
	
    post do
      review = Review.new
      review.beer_name = params[:beer_name]
      review.maker = params[:maker]
	  review.drink_again = params[:drink_again]
	  review.rating = params[:rating]
      review.comments = params[:comments]
      review.save!

	  # Return appropriate status code for created
      status 201
    end	
	
    # Update Review
    put '/:id' do
      review = Review.find(params[:id])
      review.beer_name = params[:beer_name]
      review.maker = params[:maker]
	  review.drink_again = params[:drink_again]
	  review.rating = params[:rating]
      review.comments = params[:comments]
      review.save!

      status 200
    end	
	
    delete '/:id' do
      review = Review.find(params[:id])
      return status 404 if review.nil?
      review.delete	      
	  
      status 200	  	 
    end	
		
  end

end
