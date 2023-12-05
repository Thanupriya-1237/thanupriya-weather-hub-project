// Clock
setInterval(() =>{
let today = new Date();
let h = today.getHours();
let m = today.getMinutes();
m = checkTime(m);
let time = h + ":" + m;
document.getElementById('time').innerHTML = time;
},1);

function checkTime(i){
    if(i< 10){
        i ="0" + i;
    }
    return i;
}

// Notifications
function getWeekDay(){
    let newDate = new Date();
    let today = newDate.getDay();
    let notificationMsg = document.getElementById('notifications')
    // 5 is equals Friday
    if (today == 5){
        notificationMsg.innerHTML ="Get the bin out...";
    } else {
        notificationMsg.innerHTML = "No new notifications."
    }

    }


// Connect to YouTube API - Show Subscribers
const youtubeKey = 'AIzaSyAfdHmacCJ7GuGCg5icwYm7-Dpqu_2ZXaQ';
const youtubeUsername ='UCvXscyQ0cLzPZeNOeXI45Sw';
const odometer = document.querySelector('.odometer');
const delay =60000; // 10 min in miliseconds

function getSubscribers() {
    fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${youtubeUsername}&key=${youtubeKey}`)
    .then(response =>{
        return response.json()
    })
    .then(data => {
        console.log(data);
        let subCount = parseInt(data["items"][0].statistics.subscriberCount);
        odometer.innerHTML = subCount;
    })
    .catch(err => {

    })
}

setInterval(() => {
    getSubscribers();
    getWeekDay();
},delay);

//Get Weather
const weatherIcon = document.querySelector('.weather__icon');
const weatherTitle = document.querySelector('.weather__title');

function getWeather(){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=f358f0b0c2f6ff58146c4a85b4e182d4`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        console.log(data);
        weatherTitle.innerHTML = data.weather[0].description;
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        getWeatherPhoto(data.weather[0].description)

    })
    .catch(err => {

    })
}


//Unsplash Image
const weatherWrapper = document.querySelector('#weather');
function getWeatherPhoto(weather) {
    let unsplashAPI ='https://paper-attachments.dropboxusercontent.com/s_CB18100E4A00FA757F48B7EA973AA9B791DC65AB0B46245F4C2F05997EEE131E_1694100269270_eberhard-grossgasteiger-Sd-zGynsQrQ-unsplash+1.jpg'+weather;
    fetch(unsplashAPI)
    .then(response => {
        return response.json()
    })
    .then(data => {
        weatherWrapper.setAttribute('style','background-image:url('+ data.results[0].urls.regular +';');  
    })
    .catch(err => {

    })
}

//Run functions
getWeekDay();
getSubscribers();
getWeather();

if(annyang) {
    console.log("We have annyang");

    var commands = {
'Weather Hub show home' : home,
'show home' : home,
'Weather Hub show weather' : weather,
'show weather': weather
    }


    function home(){
console.log("Home");
location.hash = "anchorHome";
    }

    function weather(){
        console.log("Weather");
        location.hash = "anchorWeather";
    }

// Add Commands
    annyang.addCommands(commands);

    //Start Listening
    annyang.start();
}
    
