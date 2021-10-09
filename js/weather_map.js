"use strict"
$(document).ready(function() {

    $.get("https://api.openweathermap.org/data/2.5/onecall", {
        APPID: openWeatherAppKey,
        lat:    29.423017,
        lon:   -98.48527,
        units: "imperial"
    })
        .done(function(data) {
            console.log("data", data);
            var dailyWeather = data.daily;
            console.log("dailyWeather", dailyWeather);
            console.log("dailyWeather0", dailyWeather[0]);
            var currentWeather = data.current;
            console.log("current", currentWeather);

            $("#testdiv").html('<div class="card text-center text-nowrap mb-4"> <p class="card-header w-100 text-wrap">' + convertDt(data.daily[0].dt) + ' </p><div id="card5d" class="card-body w-100 pb-1"><img class="m-auto d-flex flex-column pb-2" src="img/weather-icons/' + data.daily[0].weather[0].icon + '.png"' + '<br> High/Low <br> ' + Math.round(data.daily[0].temp.max) + ' &#176; <span>F</span> / ' + Math.round(data.daily[0].temp.min) + ' &#176; <span>F</span> </div><div class="card-body w-100 pt-0"> ' + data.daily[0].weather[0].main + ' </div></div>');

    //display divs of the forecast
    function createCards(data){
        for(var i = 0; i < 5; i++){ //or use data.daily.length for the 8 day forecast from the data
            var forecast = '<div class="card text-center text-nowrap mb-4"> <p class="card-header w-100 text-wrap">'
                + convertDt(data.daily[i].dt)
                + ' </p><div id="card5d" class="card-body w-100 pb-1"><img class="m-auto d-flex flex-column pb-2" src="img/weather-icons/'
                + data.daily[i].weather[0].icon + '.png"'
                + '<br> High/Low <br> '
                + Math.round(data.daily[i].temp.max)
                + ' &#176; <span>F</span> / '
                + Math.round(data.daily[i].temp.min)
                + ' &#176; <span>F</span> </div><div class="card-body w-100 pt-0"> '
                + data.daily[i].weather[0].main + ' </div></div>'
        }
        console.log(forecast);
        return forecast;
    }
            $("#five-day-forecast").html(createCards(data));



        }); //end of .done

    //date time function to convert dt to a readable format
    function convertDt(dtNum){
        const unixTimestamp = dtNum
        const milliseconds = unixTimestamp * 1000
        const dateObject = new Date(milliseconds)
        const humanDateFormat = dateObject.toLocaleString("en-US", {weekday: "long", month: "long", day: "numeric", year: "numeric"}) //2019-12-9 10:30:15
        return humanDateFormat;
    }

}); //end of document ready function

//mapboxApiKey