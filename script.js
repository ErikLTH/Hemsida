document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('fetchWeatherButton').addEventListener('click', function() {
        const city = document.getElementById('city').value; // Hämta värdet från inputfältet
        fetchWeather(city);
    });

    fetchWeather('Lund'); // Initialt anrop för Lund vid sidans laddning
});

function fetchWeather(city) {
    const apiKey; //Secreeett
    const encodedCity = encodeURIComponent(city); // Säkerställ korrekt URL-kodning
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodedCity}&aqi=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const temp = data.current.temp_c;
            const condition = data.current.condition.text;
            const uvIndex = data.current.uv;
            document.getElementById('weather').innerHTML = `Vädret i ${city}: ${temp}°C, ${condition}`;
            document.getElementById('uv').innerHTML = `UV-index: ${uvIndex}`;
        })
        .catch(error => {
            console.error('Error fetching data: ', error);
            document.getElementById('weather').innerHTML = 'Could not load weather data.';
            document.getElementById('uv').innerHTML = 'Could not load UV index.';
        });
}
function showDropdown() {
    var dropdown = document.getElementById("dropdown");
    dropdown.style.display = "block";
}

function hideDropdown() {
    var dropdown = document.getElementById("dropdown");
    // Använd en timeout för att förhindra att menyn försvinner innan länken hinner aktiveras
    setTimeout(function() {
        dropdown.style.display = "none";
    }, 200); // Justera tiden vid behov
}

function selectCity(city) {
    document.getElementById("city").value = city;
    document.getElementById("dropdown").style.display = "none";
}

