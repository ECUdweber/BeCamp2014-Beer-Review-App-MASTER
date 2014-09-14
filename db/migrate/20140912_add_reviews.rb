class AddReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :beer_name
      t.string :maker
      t.integer :rating
      t.boolean :drink_again
      t.string :comments
      t.date :review_date
      t.timestamps
    end
  end
end
