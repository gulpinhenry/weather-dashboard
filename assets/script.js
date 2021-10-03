var savedHistoryEl = $("#saved-history");
var searchFormEl = $("#search-form");
var searchInputEl = $("#inlineFormInputName");
var apiKey = "9090b9806c2ae1ae7a9126b7765063fa";

//this is temporary
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


//fetch current weather from api
function getCurWeather(city){
    let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" +apiKey;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function(response){
            if(response.ok){
                response.json().then(function (data){
                    console.log(data);
                    renderSearchButtons();
                    //render the card
                    return true;
                });
            }
        })
        .catch(function(error){
            alert("Unable to find city");
            return false;
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
                    //render the card
                    return true;
                });
            }
        })
        .catch(function(error){
            alert("Unable to find city");
            return false;
            
        })
}

function capitalizeFirstLetter(string) {
    let arr = string.split(" ")
    let build = "";
    arr.forEach(i => build+= i.charAt(0).toUpperCase() + i.slice(1) + " ");

    return build.trim();
}

// get input from search bar, event listener for search bar
function searchHandler(event){
    event.preventDefault();
    var cityName = capitalizeFirstLetter(searchInputEl.val().trim());
    searchInputEl.value = '';
    if(getCurWeather(cityName) && getForecast(cityName))
    {
        for(let i = 0; i<localStorage.length;i++)
        {
            console.log(localStorage.getItem(i) + " vs " + cityName);
            if(localStorage.getItem(i) == cityName)
            {
                console.log(i + " true");
                return;
            }
            
        }
        for(let i = localStorage.length-1; i>0; i--)
        {
            localStorage.setItem(i, localStorage.getItem(i-1));
        }
        localStorage.setItem(0, cityName);
        renderSearchButtons(); //this part doesnt work
        
        //update local storage and the search buttons
        // not sure why this doesnt work
    }    
    
}
console.log("hi");

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

// render todays weather

//render forecast

//render starting page
renderSearchButtons();
//fetch cupertinos
getCurWeather("Cupertino");
getForecast("Cupertino");