class V1 < Grape::API
    format :json
    version 'v1'

    desc "Returns the current API version, v1."
	
    get do
		{ version: 'v1' }
    end		

    mount Reviews
end
