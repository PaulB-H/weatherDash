const apiKey = "0765d126b0f6a7eb158764d733ae5823";
let cityName = "Toronto";


function currentWeather() {
    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

    $.get(`${queryURL}`, function(response) {
        console.log(response);
        console.log(response.dt*1000); 
        console.log(response.name);
        console.log(response.main.humidity);
        console.log(response.main.temp);
        console.log(response.wind.deg);
        console.log(response.wind.speed); // in meters / second   
    });
}

currentWeather();

