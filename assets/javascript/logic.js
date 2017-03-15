var place = "";
var filterList = [" hiking ", " camping ", " caving ", " trail running ", " snow sports ", " horseback riding ", " atv ", " water sports "];


//functions that will generate the list of buttons for some of the variable selections
function checkBox() {
	for (i = 0; i < filterList.length; i++) {
		var button = $('<input type="checkbox">');
		button.attr("data-value", filterList[i]);
		button.attr('id', 'filterList' + i);
		$('#filter-input').append(button, filterList[i] + "<br />");
	}

};

//When the page loads, this will run
$(document).ready(function() {

checkBox();


// var queryURL = "https://trailapi-trailapi.p.mashape.com/" 

// $.ajax({
//     url: "https://trailapi-trailapi.p.mashape.com/", // The URL to the API. You can get this by clicking on "Show CURL example" from an API profile
//     type: 'GET', // The HTTP Method
//     data: {}, // Additional parameters here
//     datatype: 'json',
//     //success: function(data) { alert(JSON.stringify(data)); },
//     error: function(err) { alert(err); },
//     beforeSend: function(xhr) {
//     xhr.setRequestHeader("X-Mashape-Authorization", "NQTdn7V99JmshrgWNZDbdFehWFX8p17WiaijsnBkVdo5einCNy"); // Enter here your Mashape key
//     }
// 	})

// .done(function(response){
// console.log(response);
// })
		


});
