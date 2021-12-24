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
    $("#current-temp").html("<p> Current Temp: " + data.current.temp + "</p>");
    $("#current-humidity").html(`<p> Current Humidity: ${data.current.humidity} </p>`);

    // reverseGeocode(coordinates, token){
    //     var baseUrl = 'https://api.mapbox.com';
    //     var endPoint = '/geocoding/v5/mapbox.places/';
    //     return fetch(baseUrl + endPoint + data.lon + "," + data.lat + '.json' + '?' + 'access_token=' + mapboxApiKey)
    //         .then(function(res){
    //             return res.json();
    //         })
    //         .then(function(mapdata){
    //             console.log(mapdata);
    //             return mapdata.features[2].place_name;
    //         });
    // }

    reverseGeocode({lat: data.lat, lng: data.lon}, mapboxApiKey).then(function(results){
        console.log(results);
        $("#current-location").html(`Current Location: ${results}`)

    }); //end of reverseGeoCode

    $("#current-sunrise-sunset").html(`<p>${convertTimeStamptoTime()}</p>`)
    function convertTimeStamptoTime(){
        var unixTimestamp = data.current.sunrise;
        var dateObj = new Date(unixTimestamp * 1000);
        var utcString = dateObj.toUTCString();
        var time = utcString.slice(-11, -4);

        return time;
    }
}); //end of .done

function convertDate(dtNum){
    const unixTimestamp = dtNum
    const milliseconds = unixTimestamp * 1000
    const dateObject = new Date(milliseconds)
    const humanDateFormat = dateObject.toLocaleString("en-US", {weekday: "short", month: "short", day: "numeric", year: "numeric"}) //2019-12-9 10:30:15
    return humanDateFormat;
}



