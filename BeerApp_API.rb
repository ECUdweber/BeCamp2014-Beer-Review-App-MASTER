require 'grape'
require 'json'
require 'rack/jsonp'

class Review < ActiveRecord::Base
  
end

ActiveRecord::Base.include_root_in_json = false

class BeerApp_API < Grape::API
  prefix 'api'
  version 'v1', :using => :param, :parameter => "v"
  use Rack::JSONP
  format :json
  
  resource :reviews do
    get '/' do
	  Review.all
	  #{:hello => 'world'}
    end	
	
    get ':id' do
		review = Review.find(params[:id])
      	review
    end	
	
    post do
      review = Review.new
      review.beer_name = params[:beer_name]
      review.maker = params[:maker]
	  review.drink_again = params[:drink_again]
	  review.rating = params[:rating]
      review.comments = params[:comments]
      review.save!

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

      status 202
    end	
	
    delete '/:id' do
      review = Review.find(params[:id])
      return status 404 if review.nil?
      review.delete	      
	  
      status 202	  	 
    end	
		
  end

end
