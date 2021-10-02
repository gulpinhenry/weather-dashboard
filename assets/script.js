var savedHistoryEl = $("#saved-history");

var apiKey = "9090b9806c2ae1ae7a9126b7765063fa";

//this is temporary
localStorage.setItem(0,"Cupertino");
localStorage.setItem(1,"New York City");
localStorage.setItem(2,"Boston");
localStorage.setItem(3,"Plano");
localStorage.setItem(4,"Princeton");
localStorage.setItem(5,"Fresno");
localStorage.setItem(6,"Berkeley");
localStorage.setItem(7,"Omaha");

//default will be cupertino

//fetch current weather from api
function getCurWeather(city){
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" +apiKey;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function (data){
                    console.log(data);
                    //render the card, update the search buttons
                });
            }
        })
        .catch(function(error){
            alert("Unable to find city");
        })
}
// fetch forecast from api
function getForecast(city){
    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="+ city + "&appid=" +apiKey;

    console.log(apiUrl);
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function (data){
                    console.log(data);
                    //render the card, update the search buttons
                });
            }
        })
        .catch(function(error){
            alert("Unable to find city");
        })
}
// get input from search bar, event listener for search bar

console.log("hi");

// render search buttons, from local storage
var renderSearchButtons = function(){
    //retrieve from local storage
    for(let i = 0; i<localStorage.length; i++)
    {
        let curEl = savedHistoryEl.children().eq(i);
        curEl.attr("data-city", localStorage.getItem(i));
    }

};
//get input from search buttons, event listener
function savedHistoryHandler(event){
    let location = event.target.getAttribute("data-city");
    //call the api fetch for that city
};
savedHistoryEl.on("click", savedHistoryHandler);

// render todays weather

//render forecast

//render starting page
renderSearchButtons();
//fetch cupertinos
getCurWeather("Cupertino");
getForecast("Cupertino");