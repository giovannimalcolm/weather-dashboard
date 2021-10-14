//API Linking
var weatherApiRootUrl = 'https://api.openweathermap.org';
var weatherApiKey = 'd91f911bcf2c0f925fb6535547a5ddc9';

//Timezone plugins 
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//Elements
var cityInput = document.querySelector('#city-input')
var searchHistory = document.querySelector('#history')
var todayContainer = document.querySelector('#today')


//Function to pull history from user lcl storage
function getHistory (){
    var storedHistory = localStorage.getItem('searchHistory')
    if (storedHistory){
        searchHistory = JSON.parse(storedHistory);
    }
/// add function to print history after parsed
}

