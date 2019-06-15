const request=require('request')

const forecast = (latitude, longitude, callback)=>{

const url='https://api.darksky.net/forecast/cb0add6f3e5fa186d069a90ff95fd5c5/'+latitude+','+longitude+'?units=si'

request({url: url, json: true},(error, {body})=>{

    if(error)
    {
        callback('Unable to connect to the server', undefined)
    }
    else if(body.error)
    {
        callback('Unable to find the location . Try another location for Search', undefined)
    } else{

            callback(undefined, {

                summary:body.daily.data[0].summary,
                temprature:body.currently.temperature,
                precipitation:body.currently.precipProbability
            })
    }

})

}

module.exports = forecast 