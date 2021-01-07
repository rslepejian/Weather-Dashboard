// List of tasks

// when the user presses the search button
//      perform the ajax search using the input city name
//          get the current weather for that city:
//              date, temp, wind speed, uv index, weather icon, humidity
//              store all of this in object to minimize api calls
//          for the next five days get the 6 AM weather for that city
//              date, temp, humidity, weather icon
//              store all of that in an object to minimize api calls
//      add a button in the search column with the name of the city user typed in the search bar
//

// This should be it's own function
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
    var queryURL = "";
    // array to contain storage objects
    var weatherObjects = [];

    $("#search").on("click", function(event){
        event.preventDefault();
        // gets the city name the user searched
        var cityName = $("#search-box").val();
        // 5 day forecast api call with input city and key
        queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&units=imperial&appid=" + key;
        console.log(queryURL);
        // temp variables for longitude and latitude for use in uv get
        var longitude = 0;
        var latitude = 0;

        $.ajax({
            url: queryURL,
            method: "GET"
          })
            //upon api response
            .then(function(response) {
                // store relevant variables in an object and push it to weatherObjects
                var cityWeather = { 
                    // name
                    name: response.city.name, 
                    // dates
                    dates: [response.list[0]["dt_txt"], response.list[7]["dt_txt"], response.list[15]["dt_txt"],response.list[23]["dt_txt"],response.list[31]["dt_txt"],response.list[39]["dt_txt"]],
                    // temps
                    temps: [],
                    // windspeed
                    winds: [],
                    // icons
                    icons: [],
                    // humidity
                    humiditys: [],
                    // uv
                    uv : 0
                };

                longitude = response.city.coord.lon;
                latitude = response.city.coord.lat;

                weatherObjects.push(cityWeather);
                // api call to get uv index using longitude and latitude obtained from previous api call
                queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latitude + "&lon=" + longitude + "&exclude=minutely,hourly,daily,alerts&appid=" + key;
                // this must be executed after the first api call is done, that is why it is in this "then"
                $.ajax({
                    url: queryURL,
                    method: "GET"
                })
                    //upon api response
                    .then(function (response) {
                        // set uv in the last object in weatherObjects to uv from api call
                        weatherObjects[weatherObjects.length - 1].uv = response.current.uvi;
                    });
                console.log(weatherObjects[weatherObjects.length-1]);
                // render
                renderWeather(weatherObjects[weatherObjects.length-1]);
                // create button and add it to search column in #button-div
                var newBtn = $("<button>");
                newBtn.attr("type", "button");
                newBtn.attr("class", "btn btn-outline-secondary");
                newBtn.attr("id", weatherObjects[weatherObjects.length-1]);
                newBtn.text(weatherObjects[weatherObjects.length-1].name);
                $("#button-div").append(newBtn);
            });


    });

    // when a city name button is clicked
    $(".btn-outline-secondary").on("click", function (event) {
        event.preventDefault();
        // stores the buttons numeric id in a temp variable
        var tempId = $(this).attr("id");
        // renders the weather from the object with an index in the array equal to the buttons id
        renderWeather(weatherObjects[tempId]);
    });

    // function to render info for a city
    function renderWeather(weatherElem){
        // empty currentcast and 5daycast
        $("#current-cast").empty();
        $("#five-day-cast").empty();

        

    }

});