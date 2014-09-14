desc 'API Routes'
task routes: :environment do
  App::Api.routes.each do |api|
    method = api.route_method.ljust(10)
    path = api.route_path
    puts "     #{method} #{path}"
  end
end
