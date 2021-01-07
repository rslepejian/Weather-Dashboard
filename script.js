// List of tasks

// when the user presses the search button
//      perform the ajax search using the input city name
//          get the current weather for that city:
//              date, temp, wind speed, uv index, weather icon
//              store all of this in object to minimize api calls
//          for the next five days get the 6 AM weather for that city
//              date, temp, humidity, weather icon
//              store all of that in an object to minimize api calls
//      add a button in the search column with the name of the city user typed in the search bar
//      
//      empty what is currently in the div current cast and 5 day cast
//      display current weather of that city in top row in main content
//      display 5 day forecast in cards in second row of main content

// when the user presses one of the citynamed buttons in the search column
//      load from that city's object
//      empty what is currently in the div current cast and 5 day cast
//      display the current weather of that city in top row in main content
//      display 5 day forecast in cards in second row of main content


$(document).ready(function () {
    // saved apikey for use
    var key = "56af92a752af22d5775d0b10555f3f87";
    var queryUrl = "api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + key; 



});