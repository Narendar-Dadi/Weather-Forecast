const weather = document.querySelector('.weather')
const cityInput = document.querySelector('.cityInout')
const card = document.querySelector('.card')
const apiKey = "ac39093739e2240523aa5009a540552b"

weather.addEventListener('submit', async event => {
    event.preventDefault()

    const city = cityInput.value;

    if (city) {
        try {
            const getweather = await getWeatherData(city);
            displayWeatherInfo(getweather)
        }
        catch (error) {
            console.error(error)
            errorMessage("Couldn't fetch weather data");
        }
    } else {
        errorMessage("Please enter a city");
    }
})

async function getWeatherData(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const response = await fetch(apiurl);
    if (!response.ok) {
        throw new Error("couldn't fetch weather data");
    }
    return await response.json();

}
function displayWeatherInfo(data) {
    const { name: city,
        main: { temp, humidity},
        weather: [{ description, id }] } = data;

    const cityDisplay = document.createElement('h1');
    const citytemp = document.createElement('p');
    const cityhumidity = document.createElement('p');
    const descContent = document.createElement('p');
    const emojii = document.createElement('p');

    card.textContent = "";
    card.style.display = 'flex';
    cityDisplay.textContent = city;
    citytemp.textContent = `${temp.toFixed(1)}°F`;
    cityhumidity.textContent = `Humidity: ${humidity}%`;
    descContent.textContent=description;
    emojii.textContent=weatherEmoji(id);

    cityDisplay.classList.add("cityDisplay")
    citytemp.classList.add("tempDisplay")
    cityhumidity.classList.add("humidityDisplay")
    descContent.classList.add("descDisplay")
    emojii.classList.add("weatherEmoji")



    card.appendChild(cityDisplay)
    card.appendChild(citytemp)
    card.appendChild(cityhumidity)
    card.appendChild(descContent)
    card.appendChild(emojii)
}

function weatherEmoji(weatherId) {
    // You can implement this as needed
    switch(true){
        case (weatherId>=200 && weatherId<=300):
            return "🌩️"
        case (weatherId>=300 && weatherId<=400):
            return "🌧️"
        case (weatherId>=500 && weatherId<=600):
            return "🌧️"
        case (weatherId>=600 && weatherId<=700):
            return "❄️"
        case (weatherId>=700 && weatherId<=800):
            return "༄"
        case (weatherId===800):
            return "🌞"
        case (weatherId>=801 && weatherId<=810):
            return "☁️"
        default:
            return "❓"
}
}
function errorMessage(message) {
    const errorDisplay = document.createElement('p')
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent = "";
    card.style.display = 'flex';
    card.appendChild(errorDisplay);
}
