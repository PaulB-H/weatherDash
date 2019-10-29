const apiKey = "0765d126b0f6a7eb158764d733ae5823";
let cityName = "Toronto";

function currentWeather() {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

    $.get(`${queryURL}`, function(response) {
        console.log(response);
        console.log(response.dt*1000); // *1000 because its UNIX Time
        console.log(response.name);
        console.log(response.main.humidity);
        console.log(response.main.temp);
        // console.log(response.wind.deg); // Could calculate to N,S,E,W
        console.log(response.wind.speed); // meters/second
        var lat = response.coord.lat;
        var lon = response.coord.lon;

        var uvIndexUrl =` http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon} `;
        $.get(`${uvIndexUrl}`, function(response) {
            console.log(response.value);
        });
        
    });
}

currentWeather();

