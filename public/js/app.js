const API_URL = "http://api.openweathermap.org/data/2.5/";
const APPID = "974cf989f33a668473fd4d704c86c5e8";

var weatherForm = document.getElementById("weather-form");
weatherForm.onsubmit = showWeather;

var clearBtn = document.getElementById("clear-btn");
clearBtn.onclick = clearResults;

var resultsDiv = document.getElementById("results");
var inputCityField = document.getElementById("input-city");

function showWeather() {
  var params = {
    q: inputCityField.value,
    units: "metric",
    APPID: APPID
  };
  var dataType = "weather";
  var URI = API_URL + dataType + "?" + encodeQueryData(params);

  getWeatherInfo(URI).then(function (data) {
    if (data.cod == 200) {
      var weatherInfo = {
        city: data.name,
        country: data.sys.country,
        temperature: data.main.temp,
        description: data.weather[0].description
      };
      appendParagraph(weatherInfo, resultsDiv);
    } else {
      alert(data.message)
    }
  }).catch(function (error) {
    console.log(error);
  });
  return false;
}

function getWeatherInfo(URI) {
  var promise = new Promise(function(resolve, reject) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (xhttp.readyState == 4) {
        if (xhttp.status == 200) {
          resolve(JSON.parse(xhttp.responseText));
        } else {
          reject("Error! xhttp.status=" + xhttp.status);
        }
      }
    };
    xhttp.open("GET", URI, true);
    xhttp.send();
  });
  return promise;
}

function appendParagraph(data, target) {
  var paragraph = document.createElement("P");

  var citySpan = document.createElement("SPAN");
  var cityTxt = document.createTextNode(data.city + ', ');
  citySpan.appendChild(cityTxt);
  citySpan.className = "city-span";
  paragraph.appendChild(citySpan);

  var countryTempSpan = document.createElement("SPAN");
  var countryTempTxt = document.createTextNode(data.country + ": " 
    + data.temperature + "°C, ");
  countryTempSpan.appendChild(countryTempTxt);
  countryTempSpan.className = "country-temp-span";
  paragraph.appendChild(countryTempSpan);

  var descSpan = document.createElement("SPAN");
  var descTxt = document.createTextNode(data.description);
  descSpan.appendChild(descTxt);
  descSpan.className = "desc-span";
  paragraph.appendChild(descSpan);

  target.appendChild(paragraph);
};

function clearResults() {
  weatherForm.reset();
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.firstChild);
  }
}

function encodeQueryData(data) {
  var res = [];
  for (var d in data){
    res.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
  }
  return res.join("&");
}
