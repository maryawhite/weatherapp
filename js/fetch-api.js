"use strict"
$(document).ready(function(){
    var widthv = 40;
    function moveProgressBar(){
        var intervalId = setInterval(frame, 5000);
        function frame(){
            if(widthv >= 100){
                clearInterval(intervalId);
            } else {
                widthv = widthv + 60;
                $(".progress-bar").css(`width, ${widthv}%`)
            }
        }
    }
    moveProgressBar();

const API_URL = "https://developing-darkened-sceptre.glitch.me/movies";
function getMovies(){
    return fetch(API_URL)
        .then((response) => response.json())
        .then((resultsObject) => {
            console.log(resultsObject);
        })
}

function getMoviesNoArrow(){
    var html = "";
    return fetch(API_URL)
        .then(function(response){
            return response.json()
        })
        .then(function(resultsObject){
            console.log(resultsObject)
            resultsObject.forEach(function(movie, index, array) {
                console.log(movie.title + ": " + movie.actors + ", " + movie.director)
                $("#loadingbar").removeClass("d-flex").addClass("d-none");

                html += `<div><h2>${movie.title}</h2><p>${movie.year}, ${movie.genre}</p><p>${movie.actors}</p></div>`
                $("#movie-div").html(html);
            })
        })
}
    var title = $("#title");
    var rating = $("#rating");
    $("#add-movie").click(function(e){
        e.preventDefault();
        checkInputs();
    });
    function checkInputs(){
        var titleValue = title.val().trim();
        var ratingValue = rating.val().trim();
        if(titleValue === ""){
            setErrorFor(title, "title cannot be blank");
        } else {
            setSuccessFor(title);
        }
        if(ratingValue === ""){
            setErrorFor(rating, "rating cannot be blank");
        } else {
            setSuccessFor(rating);
        }
    }
    function setErrorFor(input, message){
        $("small").text(message).attr("class", "visible");
        $(input).parent().attr("class", "form-control error");
        $("i.fa-exclamation-circle").attr("class", "visible");
    }
    function setSuccessFor(input){
        $(input).parent().attr("class", "form-control success");
        $("i.fa-check-circle").attr("class", "visible");
    }

getMoviesNoArrow(); //calling the function here runs the function once the page loads

}); //end of document.ready function

// movie.actors
// movie.director
// movie.genre
// movie.plot
// movie.poster
// movie.rating
// movie.title
// movie.year




//*** Notes from Fridays lecture ***
//const API_URL = "https://vagabond-glacier-verse.glitch.me/dogs";

// function getDogs(){
//     return fetch(API_URL)
//         .then((response) => response.json());
// }
//
// function getDog(id){
//     return fetch(`${API_URL}/${id}`)
//         .then((response)=> response.json())
// }
//in the console, the user would type getDog(11).then((dog)=>console.log(dog))

//Edit dog by ID
// function editDog(dog) {
//     let options = {
//         method: 'PUT',       //use put to edit the dog, we are not creating a new one
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dog)    //what is body. body is referring to the body of the request
//     }
//     return fetch(`${API_URL}/${dog.id}`, options)
//         .then((response)=>response.json())
// }
// let piper = {
//     name: 'Piper',
//     isGoodDog: false,
//     id: 11,
//     age: 8
// }

//editDog(piper).then((data)=>console.log(data))

// function deleteDog(id){
//     let options = {
//         method: 'DELETE',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     }
//     fetch(`${API_URL}/${id}, options`)
//         .then((response) => console.log("deleted dog"))
// }

//Create dog
// function createDog(dog) {
//     let options = {
//         method: 'POST',       //use put to edit the dog, we are not creating a new one
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(dog)
//     }
//     return fetch(API_URL, options)
//         .then((response)=>response.json())
// }
// let charlie = {
//     name: 'Charlie',
//     isGoodDog: false,
//     age: 8
// }
//createDog(charlie).then((newDog)=>console.log(newdog));