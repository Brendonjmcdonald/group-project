var place = "";
var category = "";
var time = "";

var eventList = ["Concerts ", "Nightlife ", "Outdoors ", "Conferences ", "Sports ", "All Events " ];
var dateList = ["Today ", "Week ", "Weekend ", "Month "];

//functions that will generate the list of buttons for some of the variable selections
function radioButtons() {
	for (i = 0; i < eventList.length; i++) {
		var ids = $('#event'+ i);
		var button = $('<input type="radio" > ');
		button.attr("button-value", eventList[i]);
		button.attr('id', 'eventList' + i);
		$('#event-input').append(button, eventList[i]);
	}

	for (i= 0; i < dateList.length; i++) {
		var button = $('<input type="radio" > ');
		button.attr("button-value", dateList[i]);
		button.attr('id', 'dateList' + i);
		$('#date-input').append(button, dateList[i]);
	}
}

//When the page loads, this will run
$(document).ready(function() {

radioButtons();

});