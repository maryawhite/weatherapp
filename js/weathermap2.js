"use strict"

$.get("https://api.openweathermap.org/data/2.5/onecall", {
    APPID: openWeatherAppRedo,
    lat: 33.7490,
    lon: -84.3880,
    units: "imperial",
    exclude: "minutely,hourly",
}).done(function(data){
    console.log(data);
    var todaysDate = data.current.dt;
    var sunrise = data.current.sunrise;
    $("#todayis").html(`<p>Today's date: ${convertDate(todaysDate)}</p>`)
    $("#coordinates").html(`<p>Coordinates Lat: ${data.lat} Lon: ${data.lon}</p>`)
    $("#current-temp").html(`<p> Current Temp: ${data.current.temp}&#176;F</p>`);
    $("#current-humidity").html(`<p> Current Humidity: ${data.current.humidity}&#37;</p>`);

    // reverseGeocode({lat: data.lat, lng: data.lon}, mapboxApiKey).then(function(results){
    //     console.log(results);
    //     $("#current-location").html(`Location: ${results}`)
    //
    // }); //end of reverseGeoCode

reverseGeocodeRef(data.lat, data.lon, mapboxApiKey).then(function(res){
    console.log(res);
    $("#current-location").html(`Location: ${res}`)
}); //end of reverseGeocodeRef

    $("#current-sunrise-sunset").html(`<p><i class="fas fa-sunrise"></i> Sunrise: ${convertTime(data.current.sunrise)} <i class="fas fa-sunset"></i>  Sunset: ${convertTime(data.current.sunset)} </p>`)
    $("#weather-icon").html(`<img src=http://openweathermap.org/img/w/${data.current.weather[0].icon}.png>`)
    $("#weather-desc").html(`<p>${data.current.weather[0].main}</p>`)
    $("#wind").html(`<p>Wind Gusts: ${data.current.wind_gust} mph Wind Speed: ${data.current.wind_speed} mph</p>`)

    $("#searchform").click(function(e){
        e.preventDefault();
        let query = $("#search").val();
        console.log(query);
    });

}); //end of .done

function convertDate(dtNum){
    const unixTimestamp = dtNum
    const milliseconds = unixTimestamp * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString("en-US", {weekday: "short", month: "short", day: "numeric", year: "numeric"}) //2019-12-9 10:30:15
    return humanDateFormat;
}

function convertTime(time){
    var time = new Date(time * 1000).toLocaleTimeString("en-US")
    return time;
}

//the function below works for time, but the other function works better and is shorter
// function convertTimeStamptoTime(){
//     var unixTimestamp = data.current.sunrise;
//     var dateObj = new Date(unixTimestamp * 1000);
//     var hours = dateObj.getHours();
//     var minutes = "0" + dateObj.getMinutes();
//     var seconds = "0" + dateObj.getSeconds();
//     var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
//
//     return formattedTime;
// }


