"use strict"
$(document).ready(function() {

    $.get("http://api.openweathermap.org/data/2.5/weather", {
        APPID: openWeatherAppKey,
        q:     "San Antonio, US"
    }).done(function(data) {
        console.log(data);
    });

}); //end of document ready function