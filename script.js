const apiKey = "0765d126b0f6a7eb158764d733ae5823";
let cityName = "Toronto";

$(document).ready(function () {


    function currentWeather() {
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

        $.get(`${queryURL}`, function (response) {
            console.log(response);
            var d = new Date(response.dt * 1000);
            var iconCode = (response.weather[0].icon);
            var iconUrl = `"http://openweathermap.org/img/wn/${iconCode}@2x.png"`
            // var windDeg = response.wind.deg;
            // var windString;
            // console.log(response.wind.deg);
            // function degToCompass(num) {
            //     var val = Math.floor((num / 22.5) + 0.5);
            //     var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
            //     console.log( arr[(val % 16)] );
            //     windString =  arr[(val % 16)] ;
            // }
            // degToCompass(windDeg);
            // <h4>${d.getDay()}/${d.getMonth() + 1}/${d.getFullYear()}</h4>
            // <h1 class="card-title">${response.name}</h1>
            $(".currentName").html(response.name);
            $(".weatherContainer").prepend(`
            <div class="currentBlock flex-item">
            <table class="table table-sm">
                <thead>
                    <tr>
                    <td>Currently: <img src=${iconUrl} class="" alt="..."style=""><td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Temp: ${response.main.temp}&deg;c</td>
                    </tr>
                    <tr>
                        <td>Humidity: ${response.main.humidity}%</td>
                    </tr>
                    <tr>
                        <td>Wind: ${response.wind.speed} m/s</td>
                    </tr>
                    <tr>
                        <td id="uvIndex">UV: </td>
                    </tr>
                </tbody>
            </table>
            </div>
            `);
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var uvIndexUrl = `http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon} `;
            $.get(`${uvIndexUrl}`, function (response) {
                console.log(`UV Value was: ${response.value}`);
                $("#uvIndex").html(`
                    UV: ${response.value}
                `);
            });

        });
    }

    currentWeather();

    function forecastWeather() {
        let queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${apiKey}`;

        $.get(`${queryURL}`, function (response) {
            console.log(response);

            for (var i = 0, l = `${response.list.length}`; i < l; i++) {
                var obj = response.list[i];
                if (response.list[i].dt_txt.includes("12:00:00")) {
                    var iconCode = (response.list[i].weather[0].icon);
                    var iconUrl = `"http://openweathermap.org/img/wn/${iconCode}@2x.png"`
                    var d = new Date(response.list[i].dt * 1000);
                    var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    var dayNum = d.getDay();
                    var dayName = days[dayNum];
                    $("#forecastDeck").append(` 
                    <div class="card    ">
                        <img src=${iconUrl} class="card-img-top" alt="...">
                        <div class="card-body">
                            <h3 class="card-title">${dayName}</h3>
                            <p class="card-text">
                            <p>${d.getDay()}/${d.getMonth() + 1}/${d.getFullYear()}<p>
                            <p>Temp: ${response.list[i].main.temp}&deg;c</p>
                            <p>Humidex: ${response.list[i].main.humidity}%</p>
                        </div>
                    </div>
                 `);
                }
            }
        })
    };

    forecastWeather();

    $(".searchButton").click(function () {
        event.preventDefault();
        console.log("Search Button Clicked");
        cityName = $(".searchTxt").val();
        console.log(cityName);
        $(".weatherContainer").empty();
        currentWeather(cityName);
        $("#forecastDeck").empty();
        forecastWeather(cityName);
        $(".searchTxt").val("");
    });

})