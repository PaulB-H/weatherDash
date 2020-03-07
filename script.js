const apiKey = "0765d126b0f6a7eb158764d733ae5823";
let cityName = "Toronto";

$(document).ready(function () {


    function currentWeather() {
        let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

        $.get(`${queryURL}`, function (response) {

            console.log(response);

            const options = {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
            };

            const dateTime = new Intl.DateTimeFormat('en-US', options);
            var d = new Date();
            console.log(dateTime.format(d));

            var iconCode = (response.weather[0].icon);
            var iconUrl = `"http://openweathermap.org/img/wn/${iconCode}@2x.png"`

            $(".currentName").html(`Results For: ${response.name} <br /> <small>${dateTime.format(d)}</small>`);

            $(".currentContainer").prepend(`
            <div class="currentBlock flex-item">
            <table class="table table-sm">
                <thead>
                    <tr>
                    <td><h5 style="float: left; margin-top: 15px;">Today</h5></td><td><img src=${iconUrl} class="card-img-top" alt="..." style="float: right;"></td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Temp: ${response.main.temp}&deg;c</td>
                        <td>Humid: ${response.main.humidity}%</td>
                    </tr>
                    <tr>
                        <td>Wind: ${response.wind.speed} m/s</td>
                        <td id="uvIndex" style="text-align: right;">UV: </td>
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
                    $(".forecastContainer").append(`
                    <div class="forecastBlock flex-item">
                    <table class="table table-sm">
                        <thead>
                            <tr>
                                <th scope="col"><h5 style="float: left; margin-top: 15px;">${dayName}</h5><img src=${iconUrl} class="card-img-top" alt="..." style="float: right;"></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Temp: ${response.list[i].main.temp}&deg;c</td>
                            </tr>
                            <tr>
                                <td>Humid: ${response.list[i].main.humidity}%</td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    `);
                }
            }
        })
    };

    forecastWeather();

    $(".searchButton").click(function () {
        event.preventDefault();
        if ($(".searchTxt").val() == false) {
            console.log("Nothing entered!")
            return;
        };
        console.log("Search Button Clicked");
        cityName = $(".searchTxt").val();
        console.log(cityName);

        $(".currentContainer, .forecastContainer").empty();
        currentWeather(cityName);

        $("#forecastDeck").empty();
        forecastWeather(cityName);

        $(".searchTxt").val("");
    });

})