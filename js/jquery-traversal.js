"use strict"
$(document).ready(function() {
const body = document.body
    // body.append("Hello World", " bye");  //you can append strings

//     const div = document.createElement("div");  //add a div to the doc
//     div.innerText = "Hello InnerText"
//     body.append(div);       //then append that div to the body
//
// div.innerHTML = "<strong>Hello World 2</strong>"
    //difference bw innerText and textContent. In the console, innerText only prints what you can see on the screen,
    // (if something is hidden it won't show on the console
    const spanBye = document.querySelector("#bye");
    const spanHi = document.querySelector(("#hi"));  //remember in DOM you have to do this first
    console.log(spanHi.getAttribute("id"));
    console.log(spanHi.getAttribute("title"));
    spanBye.setAttribute("id", "newID");
    console.log(spanBye.getAttribute(("id")));

    // $("li").each(function (index, element){
    //     alert(index + " : " + $(element).text());
    // });

    // $("li").each(function (index){
    //     if($(this).text() === "UK"){
    //         return false;  //returning false breaks out of the loop
    //     }
    //     alert(index + " : " + $(this).text());  //you can use this instead of element
    // });

    // $("li").each(function (index){
    //     $(this).css("color", "red");  //you don't explicitly need to use each here, you could just use this line to implicity iterate through each element
    //     });

    // $("li").each(function(){
    //     $("#divResult").html($("#divResult").html() + '<br>' + $(this).text()); //from a performance standpoint, this is not good code
    // });

    //find it once, and create a var
    // var divElement = $("#divResult");
    // $("li").each(function(){
    //     divElement.html(divElement.html() + '<br>' + $(this).text()); //from a performance standpoint, this is still not good code
    // });

//create another var of an empty string
//     var divElement = $("#divResult"); //this one is no longer needed
    //the code below produces the same result as the code above, but is better for performance
    // var result = "";
    // $("li").each(function(){
    //     result += '<br>' + $(this).text();
    // });
    // $("#divResult").html(result);


    //Look up which methods require explicit iteration
}); //end of document ready function

