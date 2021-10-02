var savedHistoryEl = $("#saved-history");

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

// fetch forecast from api

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
};
savedHistoryEl.on("click", savedHistoryHandler);

// render todays weather

//render forecast

//render starting page
renderSearchButtons();
