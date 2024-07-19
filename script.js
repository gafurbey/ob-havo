function search() {
    let cityName = document.querySelector("#cityName").value;

    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=a29af7578ca4cd472bc0b509b6acdde7&units=metric`
    )
        .then(function (res) {
            if (!res.ok) {
                throw new Error("Tarmoq javobi yaxshi emas:" + res.statusText);
            }
            return res.json();
        })
        .then(function (val) {
            console.log(val);
            displayWeather(val);
        })
        .catch(function (error) {
            console.error("Muammo yuzaga keldi:", error);
        });
}
function displayWeather(data) {
    const weatherInfo = document.querySelector("#weatherInfo");
    weatherInfo.innerHTML = "";

    for (let i = 0; i < 5; i++) {
        const weather = data.list[i * 8];
        const date = new Date(weather.dt * 1000).toLocaleDateString();
        const sunrise = new Date(data.city.sunrise * 1000).toLocaleTimeString();
        const sunset = new Date(data.city.sunset * 1000).toLocaleTimeString();

        const weatherHtml = `
        <div class="www">
            <h2>${name} ${date}</h2>
            <p>Harorat: ${weather.main.temp} °C</p>
            <p>Namlik: ${weather.main.humidity} %</p>
            <p>Bosim: ${weather.main.pressure}</p>
            <p>Yomg'ir ehtimoli: ${weather.pop * 100} %</p>
            <p>Shamol tezligi: ${weather.wind.speed} km/s</p>
            <p>Quyosh chiqishi: ${sunrise}</p>
            <p>Quyosh botishi: ${sunset}</p>
        </div>
    `;
        weatherInfo.innerHTML += weatherHtml;
    }
}
