const weather = document.querySelector(".js-weather");

const API_KEY = "f146b3f8a635946326858ae6c141975d";
const COORDS = 'coords';


function getWeather(lat, long){
    fetch (
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&lang=kr&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;

        const p = document.createElement("p");
        const weatherData = weather.appendChild(p);
        weatherData.innerText=`현재 ${place}의 온도는 ${temperature}도 입니다!`;
    });
}


function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    //console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj={
        latitude,
        longitude
    }
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("can't find location!");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError)
}

function loadCoords(){
    const loadCoords = localStorage.getItem(COORDS);
    if(loadCoords === null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);

    }
}

function init(){
    loadCoords();
}

init();