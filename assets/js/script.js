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
function getHistory (){
    var storedHistory = localStorage.getItem('searchHistory')
    if (storedHistory){
        searchHistory = JSON.parse(storedHistory);
    }
    
/// add function to print history after parsed
}

function addHistory (input){

    if (searchHistory.indexOf(input) == -1){
        return;
    }
    searchHistory.push(input);

    localStorage.setItem('history',JSON.stringify(searchHistory));
    printHistory(); //create function
}

function printHistory () {
    historyContainer.innerHTML = ''; //clear it out before printing so no doubles
    //end to start of list, create button with city names 
    for (var i =searchHistory.length -1; i >= 0; i--){
        var historyItem = document.createElement('button');
        historyItem.textContent = searchHistory[i];
        historyContainer.append(historyItem);
    }
    
}


searchBox.addEventListener('submit', searchCity)

function searchCity(){

    
}

getHistory();
