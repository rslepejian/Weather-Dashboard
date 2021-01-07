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
                    temps: [response.list[0].main.temp, response.list[7].main.temp, response.list[15].main.temp,response.list[23].main.temp,response.list[31].main.temp,response.list[39].main.temp],
                    // windspeed
                    winds: [response.list[0].wind.speed, response.list[7].wind.speed, response.list[15].wind.speed,response.list[23].wind.speed,response.list[31].wind.speed,response.list[39].wind.speed],
                    // icons
                    icons: [response.list[0].weather[0].icon, response.list[7].weather[0].icon, response.list[15].weather[0].icon,response.list[23].weather[0].icon,response.list[31].weather[0].icon,response.list[39].weather[0].icon],
                    // humidity
                    humiditys: [response.list[0].main.humidity, response.list[7].main.humidity, response.list[15].main.humidity,response.list[23].main.humidity,response.list[31].main.humidity,response.list[39].main.humidity],
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
                        // render, it's here to make sure it doesn't render before we have got the uv value
                        renderWeather(weatherObjects[weatherObjects.length-1]);
                    });
                // create button and add it to search column in #button-div
                var newBtn = $("<button>");
                newBtn.attr("type", "button");
                newBtn.attr("class", "btn btn-outline-secondary city-button");
                newBtn.attr("id", weatherObjects.length-1);
                newBtn.text(weatherObjects[weatherObjects.length-1].name);
                $("#button-div").append(newBtn);
            });


    });


    // when a city name button is clicked
    $(document).on("click", ".city-button", function (event) {
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

        var iconURL = "http://openweathermap.org/img/w/" + weatherElem.icons[0] + ".png";

        // add content to current cast
        // header contains city name, date and an icon
        var tempDate = "";
        // reformatting the date
        for (var i = 0; i < 10; i++){
            if (weatherElem.dates[0][i] == "-") {
                tempDate += "/";
            }
            else {
                tempDate += weatherElem.dates[0][i];
            }
        }
        // creating header element
        var header = $("<h3>");
        // adding name and date
        header.text(weatherElem.name + " (" + tempDate + ")" );

        // creating img element
        var icon = $("<img>");
        // making it inline with text
        icon.attr("class", "inline");
        // adding icon img source
        icon.attr("src", iconURL);
        // adding css styling
        icon.addClass("icon");
        // putting it into the header
        header.append(icon);

        // adding header to page
        $("#current-cast").append(header);

        //  display temperature
        var tempText = $("<h6>");
        tempText.text("Temperature: " + weatherElem.temps[0] + "°F");
        $("#current-cast").append(tempText);

        //  display humidity
        var humiText = $("<h6>");
        humiText.text("Humidity: " + weatherElem.humiditys[0] + "%");
        $("#current-cast").append(humiText);

        // display windspeed
        var windText = $("<h6>");
        windText.text("Windspeed: " + weatherElem.winds[0] + "MPH");
        $("#current-cast").append(windText);

        // display uv index
        // make a div with two separate h6 tags so that we can make only the number have a colored background
        // I had a hard time trying to get the two separate elements on the same level, worked around using bootstrap columns
        var uvText = $("<div>");
        uvText.attr("class", "row");
        var col1 = $("<div>");
        var col2 = $("<div>");
        col1.attr("class", "col-auto");
        col2.attr("class", "col-auto");
        var uvCat = $("<h6>");
        var uvNum = $("<h6>");
        col1.append(uvCat);
        col2.append(uvNum);
        uvText.append(col1);
        uvText.append(col2);
        uvCat.text("UV Index: ");
        uvNum.text(weatherElem.uv);
        console.log(weatherElem.uv);
        col2.attr("id", ("uv" + Math.floor(weatherElem.uv/2)));
        $("#current-cast").append(uvText);

        var fiveDayHeader = $("<h2>");
        fiveDayHeader.text("5 Day Forecast:");
        $("#five-day-cast").append(fiveDayHeader);

        // add weather cards to 5daycast
        // starting at 1 because the 0th index object is displayed above differently
        for (var i = 1; i < 6; i++){
            // making a new column in our 5daycast row
            var newCol = $("<div>");
            newCol.attr("class", "col-2");

            // add a bootstrap card to the column
            var newCard = $("<div>");
            newCard.attr("class", "card");

            // add it to the column
            newCol.append(newCard);
           
            // each card contains date, icon, temp, humidity
            var dateLi = $("<h5>");
            var tempDate = "";
            // reformatting the date
            for (var j = 0; j < 10; j++) {
                if (weatherElem.dates[i][j] == "-") {
                    tempDate += "/";
                }
                else {
                    tempDate += weatherElem.dates[i][j];
                }
            }
            // add the date to the card
            dateLi.text(tempDate);
            newCard.append(dateLi);
            
            // add the icon
            var iconLi = $("<img>");
            iconLi.attr("class", "icon");
            var iconURL = "http://openweathermap.org/img/w/" + weatherElem.icons[i] + ".png";
            iconLi.attr("src", iconURL);
            newCard.append(iconLi);

            // add the temp
            var tempLi = $("<p>");
            tempLi.text("Temperature: " + weatherElem.temps[0] + "°F");
            newCard.append(tempLi);

            // add the humidity
            var humiLi = $("<p>");
            humiLi.text("Humidity: " + weatherElem.humiditys[0] + "%");
            newCard.append(humiLi);
            

            // add the column to the 5daycast row
            $("#five-day-cast").append(newCol);

        }





    }

});