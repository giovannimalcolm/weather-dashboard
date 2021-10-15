//API Linking
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

//Timezone plugins 
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//Elements & Global Vars
var cityInput = document.querySelector('#city-input') //input field when searching
var historyContainer = document.querySelector('#history') //search history list
var todayContainer = document.querySelector('#presentDay') //big container for todays weather
var searchHistory = [];
var searchBox = document.querySelector("#citySearch");


//Function to pull history from user lcl storage
function getHistory() {
    var storedHistory = localStorage.getItem('history')
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }

    printHistory();
}

function addHistory(input) {

    if (searchHistory.indexOf(input) !== -1) {
        return;
    }
    console.log(input)
    searchHistory.push(input);

    localStorage.setItem('history', JSON.stringify(searchHistory));
    printHistory();
}


function printHistory() {
    historyContainer.innerHTML = ''; 
    console.log(searchHistory)
    for (var i = searchHistory.length - 1; i >= 0; i--) {
        var historyItem = document.createElement('button');
        historyItem.textContent = searchHistory[i];
        historyItem.classList.add ('historyItem')
        historyItem.setAttribute('data-search', searchHistory[i]);
        historyItem.setAttribute('aria-controls', 'today')
        historyContainer.append(historyItem);

        
    }


}


function printTodaysWeather(name, weather, timezone) {

    var temp = weather.temp;
    var windspd = weather.wind_speed;
    var humidity = weather.humidity;
    var uvi = weather.uvi;
    var icon = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    var iconCaption = weather.weather[0].description || weather[0].main;

    //All DOM elements involved in the "today" section box
    var box = document.createElement('div');
    var boxContent = document.createElement('div');
    var header = document.createElement('h2');
    var weatherImg = document.createElement('img');
    var tempEl = document.createElement('p');
    var windEl = document.createElement('p');
    var humidityEl = document.createElement('p');
    var uviEl = document.createElement('p');
    var uviBox = document.createElement('button');

    box.setAttribute('class', 'todaysWeather')
    boxContent.setAttribute('class', 'todaysWeather-body')
    box.append(boxContent);

    var date = dayjs().tz(timezone).format('M/D/YYYY');
    header.textContent = `${name} (${date})`;
    header.setAttribute('class', 'h3 today-title')
    weatherImg.setAttribute('class', 'weather-img')
    weatherImg.setAttribute('src', icon);
    weatherImg.setAttribute('alt', iconCaption);

    header.append(weatherImg)

    tempEl.textContent = `Temp: ${temp}°F`;
    tempEl.setAttribute('class', 'today-txt')
    windEl.textContent = `Wind: ${windspd} MPH`;
    windEl.setAttribute('class', 'today-txt')
    humidityEl.textContent = `Humidity: ${humidity} %`;
    humidityEl.setAttribute('class', 'today-txt')


    uviEl.textContent = 'UV  Index: ';
    uviBox.classList.add('.uvi-btn')
    uviBox.textContent = uvi;


    if (uvi < 3) {
        uviBox.classList.add('.uvi-btn.safe-uvi')
    }
    else if (uvi < 7) {
        uviBox.classList.add('.uvi-btn.wary-uvi')
    }
    else {
        uviBox.classList.add('.uvi-btn.danger-uvi')
    }

    uviEl.append(uviBox);

    boxContent.append(header, tempEl, windEl, humidityEl, uviEl);
    todayContainer.innerHTML ='';
    todayContainer.append(boxContent);


}


function fetchLoc(fixedInput) {
    var requestURL = `${weatherApiRootUrl}/geo/1.0/direct?q=${fixedInput}&limit=5&appid=${weatherApiKey}`;
    fetch(requestURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (!data[0]) {
                alert('City not found');
            }
            else {
                console.log(fixedInput)
                addHistory(fixedInput);
                console.log(data)
                fetchWeather(data[0]);
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

function fetchWeather(location) {
    console.log(location)

    var { lat } = location;
    var { lon } = location;
    var { name } = location;

    var requestURL = `${weatherApiRootUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${weatherApiKey}`;

    fetch(requestURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            console.log(data)
            printTodaysWeather(name, data.current, data.timezone)
        })
        .catch(function (err) {
            console.error(err);

        });
}



function historySearch(e) {
    if (!e.target.matches('.inHistory')) {
        return;
    }

    var hist = e.target;
    var histChosen = hist.getAttribute('data-search');
    fetchLoc(histChosen);

}

function searchCity(e) {

    if (!cityInput.value) {
        return;
    }
    e.preventDefault();
    console.log(cityInput)
    var fixedInput = cityInput.value.trim();
    console.log(fixedInput)
    fetchLoc(fixedInput);
    cityInput.value = '';
}

getHistory();
searchBox.addEventListener('submit', searchCity)
historyContainer.addEventListener('click', historySearch)

