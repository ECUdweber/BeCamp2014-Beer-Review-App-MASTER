$:.unshift "./app"

require 'active_record'
require 'logger'
require 'BeerApp_API.rb'
require 'rack/contrib'
require 'yaml'
require 'rack/cors'

# Need this since we our api still responds to port 9393 and our app port 8000
use Rack::Cors do
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => [:get, :post, :delete, :put, :options]
  end
end

dbconfig = YAML::load(File.open('config/database.yml'))
ActiveRecord::Base.establish_connection(dbconfig)

# We are serving the public file in vagrant
#use Rack::TryStatic,
#    :root => File.expand_path('../public', __FILE__),
#    :urls => %w[/], 
# 	 :try => ['.html', 'index.html', '/index.html']

require './config/environment'
    
run BeerApp_API