//API Linking
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

//Timezone plugins 
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//Elements & Global Vars
var cityInput = document.querySelector('#city-input') //input field when searching
var historyContainer = document.querySelector('#history') //search history list
var todayContainer = document.querySelector('#today') //big container for todays weather
var searchHistory = [];
var searchBox = document.querySelector("#citySearch");


//Function to pull history from user lcl storage
function getHistory() {
    var storedHistory = localStorage.getItem('searchHistory')
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }

    printHistory();
}

function addHistory(input) {

    if (searchHistory.indexOf(input) == -1) {
        return;
    }
    searchHistory.push(input);

    localStorage.setItem('history', JSON.stringify(searchHistory));
    printHistory(); 
}

//incomplete
function printHistory() {
    historyContainer.innerHTML = ''; //clear it out before printing so no doubles
    //end to start of list, create button with city names 
    for (var i = searchHistory.length - 1; i >= 0; i--) {
        var historyItem = document.createElement('button');
        historyItem.textContent = searchHistory[i];
        historyContainer.append(historyItem);
    }

}





function fetchLoc(fixedInput) {
    var requestURL = `${weatherApiRootUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${weatherApiKey}`;
    fetch(requestURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (data[0] = null) {
                alert('City not found');
            }
            else {
                addHistory(fixedInput)
                fetchWeather(data[0]);
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

function fetchWeather(loc){
var {lat} = loc;
var {lon} = loc;
var {name} = loc;

var requestURL = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

fetch(requestURL)
.then(function(res){
    return res.json;
})
.then(function (data){
    //print everything function here bc all data is achieved
})
.catch(function(err){
    console.error(err);

});
}



function historySearch(e){
    if (!e.target.matches('.inHistory')){
        return;
    }

    var hist = e.target;
    var histChosen = hist.getAttribute('data-search');
    fetchLoc(histChosen);

}

function searchCity(e) {

    if (cityInput = null) {
        return;
    }
    e.preventDefault();
    var fixedInput = cityInput.value.trim();
    fetchLoc(fixedInput);
    cityInput.value = '';
}

getHistory();
searchBox.addEventListener('submit', searchCity)
historyContainer.addEventListener('click', historySearch)

