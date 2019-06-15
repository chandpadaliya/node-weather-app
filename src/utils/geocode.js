const request = require('request')
const geocode =(address, callback)=>{

    
    const geocodeURL='https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiY2hhbmQtMTIzIiwiYSI6ImNqd3N1dGVqZjA1ZGg0OXF4amVoeDFmbHIifQ.UPaH6x73L3wKqaVeD-6zLg'+'&limit=1'


    request({url: geocodeURL,json: true},(error,{body})=>{

            if(error){
        
                callback('Unable to connect the server', undefined)
            }
            else if(body.features.length === 0)
            {
                callback('Unable to find the location . Try another Search', undefined)
            }
            else
            {
                callback(undefined, {

                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name

                })
                 
            }
    })

}

module.exports = geocode