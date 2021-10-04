var savedHistoryEl = $("#saved-history");
var searchFormEl = $("#search-form");
var mainWeatherCardEl = $("#main-weather-card")
var searchInputEl = $("#inlineFormInputName");
var lowRightCont = $("#lower-right-container");

var apiKey = "9090b9806c2ae1ae7a9126b7765063fa";


// checks to see if there are already saved values
if(!localStorage.getItem(0))
{
    localStorage.setItem(0,"Omaha");
    localStorage.setItem(1,"New York City");
    localStorage.setItem(2,"Boston");
    localStorage.setItem(3,"Plano");
    localStorage.setItem(4,"Princeton");
    localStorage.setItem(5,"Fresno");
    localStorage.setItem(6,"Berkeley");
    localStorage.setItem(7,"Cupertino");
    
}
function getUV(lon, lat){
    let apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon="+ lon +  "&exclude=minutely,hourly,daily,alerts&units=imperial&appid=" +apiKey;
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function (data){
                    let index = data.current.uvi;
                    $("#uv").text(data.current.uvi);
                    if(index<=2)
                        $("#uv").css("background-color", "#7FFF00");
                    else if(index<=5)
                        $("#uv").css("background-color", "yellow");
                    else if(index<=7)
                        $("#uv").css("background-color", "coral");
                    else
                        $("#uv").css("background-color", "red");
                    

                });
            }
        })
}

// render todays weather
function renderWeather(data){
    $("#city-name").text(data.name);
    updateButtons(data.name);
    let date = moment(data.dt, "X");
    $("#date").text(date.format("MM/DD"));
    let iconUrl = "https://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
    //console.log(iconUrl);
    $("#today-symbol").attr("src", iconUrl);
    $("#temp").text(data.main.temp + "°F");
    $("#humid").text(data.main.humidity +"%");
    $("#win").text(data.wind.speed + " miles per hour");
    // get UV text
    getUV(data.coord.lon, data.coord.lat);
    
    
}
//render forecast


function renderForecast(data){
    for(let i = 0; i<5; i++)
    {
        let cur = lowRightCont.children().eq(i);
        let date = moment(data.list[i*8].dt_txt, "YYYY-MM-DD HH:mm:ss");
        cur.children().children(".fore-date").text(date.format("MM/DD"));
        let iconUrl = "https://openweathermap.org/img/w/" + data.list[i*8].weather[0].icon + ".png";
        cur.children().children(".fore-symbol").attr("src", iconUrl);
        cur.children().children(".fore-temp").text("Temperature: " + data.list[i*8].main.temp + "°F");
        cur.children().children(".fore-humid").text("Humidity: " + data.list[i*8].main.humidity +"%");
    }
}

//fetch current weather from api
function getCurWeather(city){
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" +apiKey;
    //console.log(apiUrl);
    valid = true;
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function (data){
                    //console.log(data);
                    renderWeather(data);
                    return true;
                    
                });
            }
            else{
                alert("invalid city name!");
            }
        })

}
// fetch forecast from api
function getForecast(city){
    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ city + "&units=imperial&appid=" +apiKey;

    //console.log(apiUrl);
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function (data){
                    renderForecast(data);
                    
                });
            }
        })
}

function capitalizeFirstLetter(string) {
    let arr = string.split(" ")
    let build = "";
    arr.forEach(i => build+= i.charAt(0).toUpperCase() + i.slice(1) + " ");

    return build.trim();
}

function updateButtons(cityName){
    for(let i = 0; i<localStorage.length;i++)
    {
        //console.log(localStorage.getItem(i) + " vs " + cityName);
        if(localStorage.getItem(i) == cityName)
        {
            return;
        }
        
    }
    for(let i = localStorage.length-1; i>0; i--)
    {
        localStorage.setItem(i, localStorage.getItem(i-1));
    }
    localStorage.setItem(0, cityName);
    renderSearchButtons();
    
}
// get input from search bar, event listener for search bar
function searchHandler(event){
    event.preventDefault();
    let cityName = capitalizeFirstLetter(searchInputEl.val().trim());
    searchInputEl.value = '';
    if(cityName)
    {
        getCurWeather(cityName);
        getForecast(cityName);
    }   
    else{
        alert("Invalid City Name!");
    }
    
}


// render search buttons, from local storage
var renderSearchButtons = function(){
    //retrieve from local storage
    for(let i = 0; i<localStorage.length; i++)
    {
        let curEl = savedHistoryEl.children().eq(i);
        let name = capitalizeFirstLetter(localStorage.getItem(i));
        curEl.attr("data-city", name);
        curEl.text(name);
    }

};
//get input from search buttons, event listener
function savedHistoryHandler(event){
    let location = event.target.getAttribute("data-city");
    //call the api fetch for that city
    getCurWeather(location);
    getForecast(location);
};


savedHistoryEl.on("click", savedHistoryHandler);
searchFormEl.on("submit", searchHandler);



//render starting page
renderSearchButtons();
//fetch cupertinos
getCurWeather("Cupertino");
getForecast("Cupertino");
