var weatherForm = document.getElementById("weather-form").onsubmit = getWeather;
var resultsDiv = document.getElementById("results");
const API_KEY = "974cf989f33a668473fd4d704c86c5e8";

function getWeather() {
  var city = document.getElementById("input-city").value;
  var paragraph = document.createElement("p");
  var txtInfo = document.createTextNode(city + " - AJAX call...");
  paragraph.appendChild(txtInfo);
  resultsDiv.appendChild(paragraph);
  ajaxCall(city);
  return false;
}

var clearBtn = document.getElementById("clear-btn").onclick = clearResults;
function clearResults() {
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.firstChild);
  }
}

function ajaxCall(city) {

  const API_URL = "http://api.openweathermap.org/data/2.5/";
  var weatherType = "weather";
  var URL = API_URL + weatherType + "?q=" + city + "&APPID=" + API_KEY;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      console.log(xhttp.responseText);
    }
  };
  xhttp.open("GET", URL, true);
  xhttp.send();
}
