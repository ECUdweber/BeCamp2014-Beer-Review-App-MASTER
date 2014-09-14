class Review < ActiveRecord::Base
  attr_accessible :beer_name,:maker,:drink_again,:rating,:comments,:date_added

  class Entity < Grape::Entity
    expose :id,:beer_name,:maker,:drink_again,:rating,:comments,:date_added
  end
end
