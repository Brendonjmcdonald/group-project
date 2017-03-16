var filterList = [" hiking ", " camping ", " caving ", " trail running ", " snow sports ", " horseback riding ", " atv ", " water sports "];

//Variables that can change for google maps parameters
var lat = 28.741898;
var lng = -81.305587;
var zoom = 12;

//assuming that when the checkbox is selected, then each variable will before true and be added to the search
var hiking = false;
var camping = false;
var caving = false;
var trailrunning = false;
var snowsports = false;
var horsebackriding = false;
var atv = false;
var watersports = false;

//functions that will generate the list of buttons for some of the variable selections
function checkBox() {
	for (i = 0; i < filterList.length; i++) {
		var button = $('<input type="checkbox">');
		button.attr("data-value", filterList[i].trim());
		button.attr('id', 'filterList' + i);
		$('#filter-input').append(button, filterList[i] + "<br />");
	}

};



//this is the function that runs at the end of the googleAPI script 
function initMap() {
//where the map will be displayed	
		mapDiv = $('#input-display');
	//generating the map with the specific parameters	
		map = new google.maps.Map(mapDiv[0], {
	//set center of map on load
		center: {lat: lat, lng: lng},
	//set zoom, lower number means zoom out, and vice versa
		zoom: zoom,
	//you can set map type to roadmap, terrain, satellite, or hybrid
		mapTypeId: 'hybrid',
	//If you plan to move a control on the screen
	//it is recommened to set that control to true to always show
		mapTypeControl: true,
	//this sets the position, go to docs to see other positions
		mapTypeControlOptions: {
		position: google.maps.ControlPosition.TOP_LEFT
		},
	//same as before, just different controls
		fullscreenControl: true,
		fullscreenControlOptions: {
		position: google.maps.ControlPosition.LEFT_TOP
		},
		streetViewControl: true,
		streetViewControlOptions: {
		position: google.maps.ControlPosition.LEFT_TOP 
		},
		zoomControl: true,
		zoomControlOptions: {
		position: google.maps.ControlPosition.LEFT_TOP
		}
	});
		
// creates a marker
	var marker = new google.maps.Marker({
		position: {lat: 28.741898, lng:-81.305587},
		map: map,
		clickableIcons: true,
	});
// creates the information to be displayed when clicked
	var infowindow = new google.maps.InfoWindow({
		content: '<p id="Trail1">Trail Name ' + 'Activity' + marker.getPosition() + '</p>',
	});

	google.maps.event.addListener(marker, 'click', function(){
		infowindow.open(map, marker);
	});
}

//When the page loads, this will run
$(window).ready(function() {
	checkBox();
 	$("#submit-button").on("click", function(event) {
    	event.preventDefault();

	});

//console log gives me 50, because its giving the direct link count til it reaches that string , so it is basically 50 > -1    	
console.log(window.location.href);
//if else statements to disable the buttons if the user is currently on that page	   
    $("#homepage").on("click", function(event) {
		if (window.location.href.indexOf('index.html') > -1) {
			$(this).prop('disabled', true);
			event.preventDefault();
			}
		else {
			window.location.href = 'index.html';
		};
	});	
    $("#aboutUs").on("click", function(event) {
		if (window.location.href.indexOf('aboutus.html') > -1) {
			$(this).prop('disabled', true);
			event.preventDefault();
			}
		else {
			window.location.href = 'aboutus.html';
		};
	});

// --------------------------------------------

//Calling a jQuery ajax function to pull information 
$.ajax({
    url: "https://trailapi-trailapi.p.mashape.com/", 
    type: 'GET',
    data: {
    	'lat': lat,
    	'lon': lng,
    	'limit': 10,
    	'q[activities_activity_type_name_eq]': filterList[(Math.floor(Math.random() * filterList.length) + 1)].trim().toString(),
    	'radius': 50
		}, 
// Additional parameters here
    datatype: 'json',
//success: function(data) { alert(JSON.stringify(data)); },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
// Enter here your Mashape key   	
    xhr.setRequestHeader("X-Mashape-Authorization", "NQTdn7V99JmshrgWNZDbdFehWFX8p17WiaijsnBkVdo5einCNy");
    	}
	})
	.done(function(response){
	})
		

//End of the window.ready function
});

