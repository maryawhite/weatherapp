"use strict"

$("#searchform").click(function (e) {
    e.preventDefault();
    let query = $("#search").val();
    console.log(query);

    geocode(query, mapboxApiKey).then(function (geoResult) {
        console.log(geoResult);
        let lon = geoResult[0];
        let lat = geoResult[1];

        $.get("https://api.openweathermap.org/data/2.5/onecall", {
            APPID: openWeatherAppRedo,
            lat: lat,
            lon: lon,
            units: "imperial",
            exclude: "minutely,hourly",
        }).done(function (data) {
            console.log(data);
            var todaysDate = data.current.dt;
            $("#current-heading").html(`<h1>Current Conditions</h1>`);
            $("#todayis").html(`<h3>${convertDate(todaysDate)}</h3>`);
            $("#current-temp").html(`<p> Current Temp: ${data.current.temp}&#176;F</p>`);
            $("#current-humidity").html(`<p> Current Humidity: ${data.current.humidity}&#37;</p>`);
            $("#coordinates").html(`<p>Coordinates Lat: ${data.lat} Lon: ${data.lon}</p>`);

            reverseGeocodeRef(data.lat, data.lon, mapboxApiKey).then(function (res) {
                console.log(res);
                $("#current-location").html(`Location: ${res}`)
            }); //end of reverseGeocodeRef

            $("#current-sunrise-sunset").html(`<p><i class="fas fa-sunrise"></i> Sunrise: ${convertTime(data.current.sunrise)} <i class="fas fa-sunset"></i>  Sunset: ${convertTime(data.current.sunset)} </p>`)
            $("#weather-icon").html(`<img class="icon" src=http://openweathermap.org/img/w/${data.current.weather[0].icon}.png>`)
            $("#weather-desc").html(`<p>${data.current.weather[0].main}</p>`)
            $("#wind").html(`<p>Wind Gusts: ${data.current.wind_gust} mph Wind Speed: ${data.current.wind_speed} mph</p>`)

            //start daily forecast
            let forecast = "";
            for(let i = 0; i < data.daily.length; i++){
                forecast += `<div class="daily-div"><h4>${convertDate(data.daily[i].dt)}</h4><p>Low/High <br>${data.daily[i].temp.min}&#176;F / ${data.daily[i].temp.max}&#176;F</p><p>Humidity: ${data.daily[i].humidity}&#37;</p><p>Wind Speed: ${data.daily[i].wind_speed}</p><p>Wind Gusts: ${data.daily[i].wind_gust}</p></div>`
            }
            $("#daily-forecast").html(forecast);
            $("#daily-heading").html(`<h2>Daily Forecast</h2>`)

        }); //end of .done
    }); //end of geocode

}); //end of search form


function convertDate(dtNum) {
    const unixTimestamp = dtNum
    const milliseconds = unixTimestamp * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric"
    }) //2019-12-9 10:30:15
    return humanDateFormat;
}

function convertTime(time) {
    var time = new Date(time * 1000).toLocaleTimeString("en-US")
    return time;
}



