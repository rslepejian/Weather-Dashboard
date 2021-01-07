# Weather-Dashboard

## Description
This site uses openweathermap to allow users to enter a city and see a five day forecast for the cities temperature and humidity. If the user inputs another city the first city will be stored for their visit and they can click on the corresponding button to look at it again without having to type it out again.

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML)
* [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
* [Git]
* [Github](https://github.com/)
* [Javascript](https://www.javascript.com/)
* [OpenWeatherMap](https://openweathermap.org/)

## Deployed Link

* [See Live Site](https://rslepejian.github.io/Weather-Dashboard/)

## Preview of Working Site

![Image](/assets/preview.png)


## Code Snippet
This code snippet shows how after one api call was used to get the lattitude and longitude of a city, a second api call was used to get the uv index of the city at those coordinates. This code snippet was included because api calls were the most important and operative elements in making this application to fetch and display weather data.

```javascript
   // temporary variables for the lattitude and longitude found in the first api call to be used in the second
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
```

## Authors

* **Raffi Lepejian** 

## Contact Information

- [Link to Portfolio Site](#)
- [Link to Github](https://github.com/rslepejian)
- [Link to LinkedIn](https://linkedin.com/in/raffi-lepejian-071876153)