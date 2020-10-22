var API_KEY = "3612613b1f3879cb45fa48072460581b";
var city = "";
var pastCitySearches = [];
var containerCheck = false;
citySearchCount = 0;
var citySearchButtonsArray = [];
var day = moment().date();
var month = (moment().month() + 1);
var year = moment().year();
// var secondDay = moment().add(1, 'days');

renderPastSearches();

$('#citySearchBar').submit(function(event) {
    event.preventDefault();
    console.log(day);
    console.log(month);
    console.log(year);
    citySearchCount++;

    if (containerCheck === true) {
      containerCheck = false;
      $('#cityWeatherContainer').empty();
      
      for (var i = 0; i <= 4; i++) {
        $('#temp' + i).empty();
      }

    }
    containerCheck = true;
    city = $('#cityInfo').val();
    // pastCitySearches.push(city);
    // console.log(pastCitySearches);
    // console.log(city);
    localStorage.setItem("pastCitySearches", JSON.stringify(city));
    $('#cityWeatherContainer').attr('style', 'visibility: visible; border: black; border-style: solid;')

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + API_KEY;
    var queryURLFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + API_KEY;
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    
        var temperature = response.main.temp;
        var humidity = response.main.humidity;
        var weatherIcon = response.weather[0].icon;
        var windSpeed = response.wind.speed;
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;
    
        // console.log(longitude);
        // console.log(latitude);
    
        var queryURLThree = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + API_KEY;
        var cityButton = $('<button>');
        var weatherIconIMG = $('<img>');
        var temperatureP = $('<p>');
        var humidityP = $('<p>');
        var windSpeedP = $('<p>');
        var cityHeading = $("<h2>");
        
        cityHeading.attr("id", "city");
        cityButton.text(city);
        cityButton.attr("id", city);
        cityButton.attr("type", "button");
        cityButton.attr("class", "btn btn-primary btn-block");
        cityButton.attr("style", "text-align: left");
        weatherIconIMG.attr('src', "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
        temperatureP.text('Temperature: ' + temperature);
        humidityP.text('Humidity: ' + humidity);
        windSpeedP.text('Wind Speed: ' + windSpeed);
        
        $('#cityWeatherContainer').append(cityHeading);
        cityHeading.text(city + ' ' + month + '/' + day + '/' + year).append(weatherIconIMG);
        $('#citySearchBar').append(cityButton);
        citySearchButtonsArray.push(city);
        localStorage.setItem("citySearchButtonsArray", JSON.stringify(citySearchButtonsArray));
        $('#cityWeatherContainer').append(temperatureP, humidityP, windSpeedP);

      

        $.ajax({
          url: queryURLThree,
          method: "GET"
        }).then(function(response) {
        //   console.log(response);
          var uvIndex = response.value;
          
          console.log(uvIndex);

          var uvIndexP = $('<p>');

          if (uvIndex <= 2) {
            uvIndexP.attr('style', 'color: green;');
            console.log(uvIndex);
          } else if (uvIndex > 2 && uvIndex <= 5) {
            uvIndexP.attr('style', 'color: yellow;');
            console.log(uvIndex);
          } else if (uvIndex > 5 && uvIndex <= 7) {
            uvIndexP.attr('style', 'color: orange;');
            console.log(uvIndex);
          } else if (uvIndex > 7 && uvIndex <= 10) {
            uvIndexP.attr('style', 'color: red;');
          } else {
            uvIndexP.attr('style', 'color: purple;');
          }

          uvIndexP.text('UV Index: ' + uvIndex);

          $('#cityWeatherContainer').append(uvIndexP);
        })
    
        $.ajax({
            url: queryURLFiveDay,
            method: "GET"
        }).then(function(response) {
            console.log(response);
            for (var i = 0; i <= 4; i++) {
              var fiveDayTemp = response.list[i].main.temp;
              var fiveDayHumidity = response.list[i].main.humidity;
              var fiveDayWeatherIcon = response.list[i].weather[0].icon;
              var cardDate = $('<h4>');
              var nextDay = (day + i + 1);

              cardDate.text(month + '/' + nextDay + '/' + year)
              
              var cardIconIMG = $('<img>');
              cardIconIMG.attr('src', "http://openweathermap.org/img/wn/" + fiveDayWeatherIcon + "@2x.png")

              var cardDiv = $("<div>");
              cardDiv.attr('class', 'card');
              cardDiv.attr('style', 'background-color: #add8e6; width: 200px;')

              var cardBodyDiv = $("<div>");
              cardBodyDiv.attr("class", "card-body");

              var cardTempP = $("<p>");
              var cardHumidityP = $("<p>");

              cardTempP.text("Temp: " + fiveDayTemp);
              cardHumidityP.text("Humidity: " + fiveDayHumidity);

              $("#temp" + i).append(cardDiv);
              cardDiv.append(cardBodyDiv);
              cardBodyDiv.append(cardDate, cardIconIMG, cardTempP, cardHumidityP);
            }
        })
    });
    $('#cityInfo').val('');
})

citySearchBar.addEventListener('click', function(event) {
  event.preventDefault();

  var target = event.target;
  console.log(target);
  // if (target != 'button') {
  //   return;
  // }

  if (target.matches('button')) {
    var id = target.getAttribute('id');
    city = id;
    console.log(id);
    console.log(containerCheck);
  }

  if (containerCheck === true) {
    containerCheck = false;
    $('#cityWeatherContainer').empty();
    
    for (var i = 0; i <= 4; i++) {
      $('#temp' + i).empty();
    }
  }

  containerCheck = true;
  // city = $('#cityInfo').val();
  // pastCitySearches.push(city);
  // console.log(pastCitySearches);
  // console.log(city);
  $('#cityWeatherContainer').attr('style', 'visibility: visible; border: black; border-style: solid;')

  var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + API_KEY;
  var queryURLFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + API_KEY;
  

  $.ajax({
      url: queryURL,
      method: "GET"
  }).then(function(response) {
      console.log(response);
  
      var temperature = response.main.temp;
      var humidity = response.main.humidity;
      var weatherIcon = response.weather[0].icon;
      var windSpeed = response.wind.speed;
      var longitude = response.coord.lon;
      var latitude = response.coord.lat;
  
      // console.log(longitude);
      // console.log(latitude);
  
      var queryURLThree = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + API_KEY;
      // var cityButton = $('<button>');
      var weatherIconIMG = $('<img>');
      var temperatureP = $('<p>');
      var humidityP = $('<p>');
      var windSpeedP = $('<p>');
      var cityHeading = $("<h2>");
      
      cityHeading.attr("id", "city");
      // cityButton.text(city);
      // cityButton.attr("id", city);
      // cityButton.attr("type", "button");
      // cityButton.attr("class", "btn btn-primary btn-block");
      // cityButton.attr("style", "text-align: left");
      weatherIconIMG.attr('src', "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
      temperatureP.text('Temperature: ' + temperature);
      humidityP.text('Humidity: ' + humidity);
      windSpeedP.text('Wind Speed: ' + windSpeed);
      
      $('#cityWeatherContainer').append(cityHeading);
      cityHeading.text(city + ' ' + month + '/' + day + '/' + year).append(weatherIconIMG);
      // $('#citySearchBar').append(cityButton);
      $('#cityWeatherContainer').append(temperatureP, humidityP, windSpeedP);

    

      $.ajax({
        url: queryURLThree,
        method: "GET"
      }).then(function(response) {
      //   console.log(response);
        var uvIndex = response.value;
        
        var uvIndexP = $('<p>');

        if (uvIndex <= 2) {
          uvIndexP.attr('style', 'color: green;');
          console.log(uvIndex);
        } else if (uvIndex > 2 && uvIndex <= 5) {
          uvIndexP.attr('style', 'color: yellow;');
          console.log(uvIndex);
        } else if (uvIndex > 5 && uvIndex <= 7) {
          uvIndexP.attr('style', 'color: orange;');
          console.log(uvIndex);
        } else if (uvIndex > 7 && uvIndex <= 10) {
          uvIndexP.attr('style', 'color: red;');
        } else {
          uvIndexP.attr('style', 'color: purple;');
        }

  
        uvIndexP.text('UV Index: ' + uvIndex);
  
        $('#cityWeatherContainer').append(uvIndexP);
      })
  
      $.ajax({
          url: queryURLFiveDay,
          method: "GET"
      }).then(function(response) {
          // console.log(response);
          for (var i = 0; i <= 4; i++) {
            var fiveDayTemp = response.list[i].main.temp;
            var fiveDayHumidity = response.list[i].main.humidity;

            var fiveDayWeatherIcon = response.list[i].weather[0].icon;

            var cardDate = $('<h4>');
            var nextDay = (day + i + 1);

            cardDate.text(month + '/' + nextDay + '/' + year)

            var cardIconIMG = $('<img>');
            cardIconIMG.attr('src', "http://openweathermap.org/img/wn/" + fiveDayWeatherIcon + "@2x.png")

            var cardDiv = $("<div>");
            cardDiv.attr('class', 'card');
            cardDiv.attr('style', 'background-color: #add8e6; width: 200px;')

            var cardBodyDiv = $("<div>");
            cardBodyDiv.attr("class", "card-body");

            var cardTempP = $("<p>");
            var cardHumidityP = $("<p>");

            cardTempP.text("Temp: " + fiveDayTemp);
            cardHumidityP.text("Humidity: " + fiveDayHumidity);

            $("#temp" + i).append(cardDiv);
            cardDiv.append(cardBodyDiv);
            cardBodyDiv.append(cardDate, cardIconIMG, cardTempP, cardHumidityP);
          }
      })
  });
  $('#cityInfo').val('');
})

function renderPastSearches() {
    if (containerCheck === true) {
      containerCheck = false;
      $('#cityWeatherContainer').empty();
      
      for (var i = 0; i <= 4; i++) {
        $('#temp' + i).empty();
      }

    }
    containerCheck = true;
    city = JSON.parse(localStorage.getItem("pastCitySearches"));
    // pastCitySearches.push(city);
    // console.log(pastCitySearches);
    // console.log(city);
    // localStorage.setItem("pastCitySearches", JSON.stringify(city));
    $('#cityWeatherContainer').attr('style', 'visibility: visible; border: black; border-style: solid;')

    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + API_KEY;
    var queryURLFiveDay = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + API_KEY;
    

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
    
        var temperature = response.main.temp;
        var humidity = response.main.humidity;
        var weatherIcon = response.weather[0].icon;
        var windSpeed = response.wind.speed;
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;
    
        // console.log(longitude);
        // console.log(latitude);
    
        var queryURLThree = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + API_KEY;
        
        var weatherIconIMG = $('<img>');
        var temperatureP = $('<p>');
        var humidityP = $('<p>');
        var windSpeedP = $('<p>');
        var cityHeading = $("<h2>");
        
        cityHeading.attr("id", "city");
        
        weatherIconIMG.attr('src', "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
        temperatureP.text('Temperature: ' + temperature);
        humidityP.text('Humidity: ' + humidity);
        windSpeedP.text('Wind Speed: ' + windSpeed);
        
        cityStorage = JSON.parse(localStorage.getItem("citySearchButtonsArray"));
        console.log(cityStorage);
        for (var j = 0; j < cityStorage.length; j++) {
          var cityButton = $('<button>');
          cityButton.text(cityStorage[j]);
          cityButton.attr("id", cityStorage[j]);
          cityButton.attr("type", "button");
          cityButton.attr("class", "btn btn-primary btn-block");
          cityButton.attr("style", "text-align: left");
          $('#citySearchBar').append(cityButton);
        }

        $('#cityWeatherContainer').append(cityHeading);
        cityHeading.text(city + ' ' + month + '/' + day + '/' + year).append(weatherIconIMG);
        $('#cityWeatherContainer').append(temperatureP, humidityP, windSpeedP);

      

        $.ajax({
          url: queryURLThree,
          method: "GET"
        }).then(function(response) {
        //   console.log(response);
          var uvIndex = response.value;
          
          var uvIndexP = $('<p>');

          if (uvIndex <= 2) {
            uvIndexP.attr('style', 'color: green;');
            console.log(uvIndex);
          } else if (uvIndex > 2 && uvIndex <= 5) {
            uvIndexP.attr('style', 'color: yellow;');
            console.log(uvIndex);
          } else if (uvIndex > 5 && uvIndex <= 7) {
            uvIndexP.attr('style', 'color: orange;');
            console.log(uvIndex);
          } else if (uvIndex > 7 && uvIndex <= 10) {
            uvIndexP.attr('style', 'color: red;');
          } else {
            uvIndexP.attr('style', 'color: purple;');
          }
    
          uvIndexP.text('UV Index: ' + uvIndex);
    
          $('#cityWeatherContainer').append(uvIndexP);
        })
    
        $.ajax({
            url: queryURLFiveDay,
            method: "GET"
        }).then(function(response) {
            // console.log(response);
            for (var i = 0; i <= 4; i++) {
              var fiveDayTemp = response.list[i].main.temp;
              var fiveDayHumidity = response.list[i].main.humidity;
              var fiveDayWeatherIcon = response.list[i].weather[0].icon;
              var cardDate = $('<h4>');
              var nextDay = (day + i + 1);

              cardDate.text(month + '/' + nextDay + '/' + year)

              var cardIconIMG = $('<img>');
              cardIconIMG.attr('src', "http://openweathermap.org/img/wn/" + fiveDayWeatherIcon + "@2x.png")

              var cardDiv = $("<div>");
              cardDiv.attr('class', 'card');
              cardDiv.attr('style', 'background-color: #add8e6; width: 200px;')

              var cardBodyDiv = $("<div>");
              cardBodyDiv.attr("class", "card-body");

              var cardTempP = $("<p>");
              var cardHumidityP = $("<p>");

              cardTempP.text("Temp: " + fiveDayTemp);
              cardHumidityP.text("Humidity: " + fiveDayHumidity);

              $("#temp" + i).append(cardDiv);
              cardDiv.append(cardBodyDiv);
              cardBodyDiv.append(cardDate, cardIconIMG, cardTempP, cardHumidityP);
            }
        })
    });
    $('#cityInfo').val('');
}
// $('button').click(function(event) {
//   // event.preventDefault();
//   // event.stopPropagation();
//   var btnInfo = $(this).attr('id');
//   console.log(btnInfo);
// });


// localStorageArray[(localStorageArray.length - 1)]