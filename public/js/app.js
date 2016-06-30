var weatherForm = document.getElementById("weather-form").onsubmit = getWeather;
var resultsDiv = document.getElementById("results");

function getWeather() {
  var city = document.getElementById("input-city").value;
  var paragraph = document.createElement("p");
  var txtInfo = document.createTextNode(city + " - AJAX call...");
  paragraph.appendChild(txtInfo);
  resultsDiv.appendChild(paragraph);
  
  return false;
}

var clearBtn = document.getElementById("clear-btn").onclick = clearResults;
function clearResults() {
  while (resultsDiv.firstChild) {
    resultsDiv.removeChild(resultsDiv.firstChild);
  }
}
