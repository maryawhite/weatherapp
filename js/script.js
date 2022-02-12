"use strict"

$("#searchform").click(function (e) {
    e.preventDefault();
    let query = $("#search").val();
    // console.log(query);

    geocode(query, "pk.eyJ1IjoibWNoaW5kd2hpdGUiLCJhIjoiY2t1Y3p4Y3ZzMDB1MjJvcGM2NjA5bDcxaSJ9.TIeeLpxLA-Nb9WIjGcWiQw").then(function (geoResult) {
        // console.log(geoResult);
        let lon = geoResult[0];
        let lat = geoResult[1];

        $.get("https://api.openweathermap.org/data/2.5/onecall", {
            APPID: "88818f073f2def19b2c43033775a8cc5",
            lat: lat,
            lon: lon,
            units: "imperial",
            exclude: "minutely,hourly",
        }).done(function (data) {
            // console.log(data);
            $(".current-border").css("visibility", "visible");
            let todaysDate = data.current.dt;
            $("#current-heading").html(`<h1>Current Conditions</h1>`);
            $("#todayis").html(`<h3>${convertDate(todaysDate)}</h3>`);
            $("#current-temp").html(`<h3> Current Temperature: ${Math.round(data.current.temp)}&#176;F</h3>`);
            $("#current-humidity").html(`<p> Current Humidity: ${data.current.humidity}&#37;</p>`);
            $("#coordinates").html(`<p>Coordinates: Lat: ${data.lat} Lon: ${data.lon}</p>`);

            reverseGeocodeRef(data.lat, data.lon, "pk.eyJ1IjoibWNoaW5kd2hpdGUiLCJhIjoiY2t1Y3p4Y3ZzMDB1MjJvcGM2NjA5bDcxaSJ9.TIeeLpxLA-Nb9WIjGcWiQw").then(function (res) {
                // console.log(res);
                $("#current-location").html(`Location: ${res}`)
            }); //end of reverseGeocodeRef

            $("#current-sunrise-sunset").html(`<p><i class="fas fa-sunrise"></i> Sunrise: ${convertTime(data.current.sunrise)} <i class="fas fa-sunset"></i>  Sunset: ${convertTime(data.current.sunset)} </p>`)
            $("#weather-icon").html(`<img class="icon" src=http://openweathermap.org/img/w/${data.current.weather[0].icon}.png alt="weather icon">`)
            $("#weather-desc").html(`<h3>${data.current.weather[0].main}</h3>`)

            if(data.current.wind_gust == null){
                $("#wind").html(`<p>Wind Speed: ${data.current.wind_speed} mph / Gusts: NR </p>`)
            } else{
                $("#wind").html(`<p>Wind Speed: ${data.current.wind_speed} mph / Gusts: ${data.current.wind_gust} mph </p>`)
            }

            //start daily forecast
            $("#img-container").css("visibility", "visible");
            $("footer").css("visibility", "visible");

            let forecast = "";
            for(let i = 0; i < data.daily.length; i++){
                forecast += `<div class="daily-div"><h4>${convertDate(data.daily[i].dt)}</h4><img class="daily-icon" src=http://openweathermap.org/img/w/${data.daily[i].weather[0].icon}.png alt="weather icon"><p><strong>${data.daily[i].weather[0].main}</strong></p><p>High/Low <br>${Math.round(data.daily[i].temp.max)}&#176;F / ${Math.round(data.daily[i].temp.min)}&#176;F</p><p>Humidity: ${data.daily[i].humidity}&#37;</p><p>Wind Speed: ${data.daily[i].wind_speed} mph</p><p>Wind Gusts: ${data.daily[i].wind_gust} mph</p></div>`
            }
            $("#daily-heading").html(`<h1>8 Day Forecast</h1>`)
            $("#daily-forecast").html(forecast);

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



