const request = require('request')

const geocode = (address, callback) => {
    var isnum = /-?[0-9]{1,3}[.][0-9]+/.test(address);
    if( !isnum ){
        const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmVsbHlicmF0YSIsImEiOiJja2E2aDJ2bG0wOG1iMzBtbjI1eDI1b3hjIn0.jhSzuE9lnF9N5mYLX2flMQ&limit=1'

        request( {url, json:true}, (err, {body} = {}) => {
            if(err){
                callback('Unable to connect !', undefined)
            }else if( body.features.length === 0){
                callback('Unable to find the address. Try another location.', undefined)
            }else{
                callback(undefined, {
                    lat: body.features[0].center[1],
                    long:body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        })
    }else{
        const location = address.split(",")
            
        callback(undefined, {
            lat: location[0],
            long: location[1],
            location: undefined
        })
    }
}

module.exports = geocode