const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageShowOne = document.querySelector('#mes-1')
const messageShowTwo = document.querySelector('#mes-2')

function getWeatherData(input){

    fetch('/weather?address=' + input).then((res) => {
        res.json().then((data) => {
            if (data.errorMessage) {
                return messageShowOne.textContent = data.errorMessage
            }

            messageShowOne.textContent = data.location
            messageShowTwo.textContent = data.forecast
        })
    })

}

searchInput.addEventListener('click', () => {
    if(searchInput.value != ''){
        searchInput.value = ''
    }
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageShowOne.textContent = 'Loading..'
    messageShowTwo.textContent = ''

    getWeatherData(searchInput.value)
})
const getLocation = () => {
    searchInput.value = 'Current location'
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition)
    } else {
        console.log("Geolocation is not supported by this browser.")
    }
}

const showPosition = (position) => {
    const lat = position.coords.latitude
    const long = position.coords.longitude
    
    messageShowOne.textContent = 'Loading..'
    messageShowTwo.textContent = ''
    getWeatherData(lat + ',' + long)
}