Routes = Rack::Builder.new do
  use Rack::Session::Cookie, key: ENV['SESSION_KEY'],
                             expire_after: 24*60*60, # 1 day in seconds
                             secret: ENV['SESSION_SECRET']

  map '/api' do
    run App::Api
  end

  # Example of how to mount subapplications in rack builder. You'll want to
  # replace this with a more useful rack app :)
  if ENV['RACK_ENV'] == 'development' || ENV['RACK_ENV'] == 'test' then
    require 'rack/contrib/try_static'
    use Rack::TryStatic,
    :root => File.expand_path('../public', File.dirname(__FILE__)),
    :urls => %w[/],
    :try => ['.html', 'index.html', '/index.html']
  end

  run proc { [404, {'Content-Type' => 'text/html'}, ['whoops! Not Found']]}

end
