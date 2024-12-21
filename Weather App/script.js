document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById('city-input');
    const btn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temp = document.getElementById('temperature');
    const desc = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    const API_KEY = "not_shown_for_privacy_reasons";

    btn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (!city) return;

        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }
    });

    async function fetchWeatherData(city) {


        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        const { name, main, weather } = data;
        cityName.textContent = name;
        console.log(name); // Log city name
        temp.textContent = `Temperature: ${(main.temp - 273.15).toFixed(2)}°C`; // Convert Kelvin to Celsius
        desc.textContent = `Weather: ${weather[0].description}`;

        // Show weather info and hide error message
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

    function showError() {
        weatherInfo.classList.add('hidden'); // Hide weather info
        errorMessage.classList.remove('hidden'); // Show error message
    }
});