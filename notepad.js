// ALEX API KEY
// 0765d126b0f6a7eb158764d733ae5823

// MINE - NO LONGER WORKING
// 805f5aa56bdf1e5b6377bd0fc2dc580f

/*

Current Weather
https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`

Current Weather Example 
https://api.openweathermap.org/data/2.5/weather?q=Toronto&units=metric&APPID=0765d126b0f6a7eb158764d733ae5823

Forecast 
https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&APPID=${apiKey}`

Forecast Example
https://api.openweathermap.org/data/2.5/forecast?q=Toronto&units=metric&APPID=0765d126b0f6a7eb158764d733ae5823

UV Index By geographic coordinates
http://api.openweathermap.org/data/2.5/uvi?appid=${apiKey}&lat=${lat}&lon=${lon}

UV Index Example
http://api.openweathermap.org/data/2.5/uvi?appid=0765d126b0f6a7eb158764d733ae5823&lat=43.65&lon=-79.39

COLOUR - RISK - UV INDEX
GREEN   LOW         0-2
Yellow  Moderate    3-5
Orange  High        6-7
Red     Very High   8-10
Fuschia Extreme     >=11
*/


$.get( "queryURL", function() {
  console.log();
});





// looping through response.list and returning only data if dt_txt includes 12:00:00

for (var i = 0, l = `${response.list.length}`; i < l; i++) {
  var obj = response.list[i];
   if (response.list[i].dt_txt.includes("12:00:00")) {
       console.log("One 12:00:00 Forecast");
   }
}

// need to figure out how to gitignore this file