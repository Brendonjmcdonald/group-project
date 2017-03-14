var location = "";
var category = "";
var time = "";
var price = 0;

var eventList = [Concerts, Nightlife, Outdoors, Conferences, Sports, All ];
var dateList = [Today, Week, Weekend, Month];

//functions that will generate the list of buttons for some of the variable selections
function radioButtons {
	for (i = 0; i < eventList.length; i++) {

	}

	for (i= 0; i < dateList.length; i++) {

	}
};

//When the page loads, this will run
$(document).on("load", function() {

radioButtons();
});