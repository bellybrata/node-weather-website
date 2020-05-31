const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=aac014dc747fac01509356049dc00709&query='+ lat +','+ long +'&units=f'

    request( { url, json: true}, (error, {body} = {}  ) => {
        if(error){
            callback('Unable to connect !', undefined)
        }else if( body.error) {
            callback('Unable to find location', undefined)
        }else{
            const current = body.current
            // callback( undefined, {
            //     weather_description: current.weather_descriptions[0],
            //     current_temp: current.temperature,
            //     feels_temp: current.feelslike
            // })
            callback( undefined, 'Weather : '+ current.weather_descriptions[0] + ', Temp : ' + current.temperature + ', Feels Like : '+ current.feelslike)
        }
    })
}

module.exports = forecast
