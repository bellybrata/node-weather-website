const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const messageShowOne = document.querySelector('#mes-1')
const messageShowTwo = document.querySelector('#mes-2')

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageShowOne.textContent = 'Loading..'
    messageShowTwo.textContent = ''

    fetch('http://localhost:3000/weather?address=' + searchInput.value).then( (res ) => {
        res.json().then( (data) => {
            if( data.errorMessage ){
                return messageShowOne.textContent = data.errorMessage
            }

            messageShowOne.textContent = data.location
            messageShowTwo.textContent = data.forecast
        })
    })

})