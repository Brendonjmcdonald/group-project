var filterList = [" hiking ", " camping ", " caving ", " trail running ", " snow sports ", " horseback riding ", " atv ", " water sports "];

//Set variables for windows loading page
var lat = 28.741898;
var lng = -81.305587;
var zoom = 12;

//variables to change the location of google maps (state abbreviations work, also doesn't matter upper or lowercase)
var city = "";
var state = "";

//assuming that when the checkbox is selected, then each variable will before true and be added to the search
var hiking = false;
var camping = false;
var caving = false;
var trailrunning = false;
var snowsports = false;
var horsebackriding = false;
var atv = false;
var watersports = false;

// Initialize Firebase
var config = {
    apiKey: "AIzaSyD5NXLlTfIfpROe5y5e5-k-MG3L4PKVAeY",
    authDomain: "trail-tracker-89184.firebaseapp.com",
    databaseURL: "https://trail-tracker-89184.firebaseio.com",
    storageBucket: "trail-tracker-89184.appspot.com",
    messagingSenderId: "47518348432"
  };
  firebase.initializeApp(config);

//variables for connections to firebase
var database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

//used to check if anyone is online
connectedRef.on("value", function(snap) {
	if(snap.val()) {
//when someone is online they are pushed to the connects list		
		var con = connectionsRef.push(true);
//when someone leaves, they are removed from the list		
		con.onDisconnect().remove();
	}
});

//displays the number of active users
connectionsRef.on("value", function(snap) {
	$("#activeUsers").text(" : " + snap.numChildren() + " user(s) following the trail");
});

//functions that will generate the list of buttons for some of the variable selections
function checkBox() {
	for (i = 0; i < filterList.length; i++) {
		var button = $('<input type="checkbox">');
		button.attr("data-value", filterList[i].trim());
		button.attr('id', 'filterList' + i);
		$('#filter-input').append(button, filterList[i] + "<br />");
	}
// End of the checkbox function
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
//End of the initMap function			
}

function trailFinder (city, state) {
	console.log(city);
  	console.log(state);
	$.ajax({
    url: "https://trailapi-trailapi.p.mashape.com/", 
    type: 'GET',
//parameters that can be changed    
    data: {
//set limit by me    	
    	'limit': 10,
    	// 'q[activities_activity_type_name_eq]': null,
//set limit by me      	
    	'radius': 50,
//changed based of var city    	
    	'q[city_cont]': city,
//changed based of var state    	
    	'q[state_cont]': state
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

.done(function(response) {

	for (i=0; i<1; i++) {

//object is places	 	
	console.log(response.places[i]);
	console.log(this);
	}
	});

}

function markerGenerator() {		
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
//End of the markerGenerator function
}

//When the page loads, this will run
$(window).on("load", function() {
	checkBox();
 	$("#submit-button").on("click", function(event) {
    	event.preventDefault();
    	city = $('#city-input').val();
    	state = $('#state-input').val();
    	trailFinder(city, state);
    	$('#city').text(city.toUpperCase() + ", ");
    	$('#state').text(state.toUpperCase());
    	$('#state-input').val("");
    	$('#city-input').val("");
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
//parameters that can be changed    
    data: {
//set limit by me    	
    	'limit': 10,
    	// 'q[activities_activity_type_name_eq]': null,
//set limit by me      	
    	'radius': 50,
//changed based of var city    	
    	'q[city_cont]': "Orlando",
//changed based of var state    	
    	'q[state_cont]': "Florida"
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

//End of the window.onload function
});

