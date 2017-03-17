var filterList = [" hiking ", " camping ", " caving ", " trail running ", " snow sports ", " horseback riding ", " atv ", " water sports "];

//Set variables for windows loading page (This is Lake Mary, Fl)
var lat = 28.741898;
var lng = -81.305587;
var zoom = 10;
var activities = "";

//variables to change the location of google maps
// var markers = [];
// var latitude = 0;
// var longitude = 0;

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

		autoSearch = new google.maps.places.Autocomplete(document.getElementById('name-input'));
		geocoder = new google.maps.Geocoder();
//End of the initMap function			
}

//Function that pushes lat and long parameters and display results via trailAPI markers
function trailFinder (latitude, longitude) {
	$.ajax({
    url: "https://trailapi-trailapi.p.mashape.com/", 
    type: 'GET',
//parameters that can be changed    
    data: {
//set limit by me    	
    	'limit': 10,
//will be used for filter options    	
    	'q[activities_activity_type_name_eq]': activities,
//set limit by me      	
    	'radius': 50,
//not needed anymore   	
//     	'q[city_cont]': null,   	
//     	'q[state_cont]': null,
//uses parameters from google maps search  	
    	'lat': latitude,  	
    	'lon': longitude
		}, 
    datatype: 'json',
//success: function(data) { alert(JSON.stringify(data)); },
    error: function(err) { alert(err); },
    beforeSend: function(xhr) {
// Mashape key from TrailAPI
    xhr.setRequestHeader("X-Mashape-Authorization", "NQTdn7V99JmshrgWNZDbdFehWFX8p17WiaijsnBkVdo5einCNy");
    	}
	})

//When the ajax call is DONE, do this below
.done(function(response) {
//Checking to see if the lat and long are really from google maps	
	console.log('google latitude: ' + latitude);
	console.log('google longitude: ' + longitude);
//Creating a for loop to generate a marker for 10 places, "places" is the object when using trailAPI website	
	for (i=0; i<10; i++) {
//Checking to see the places that will be displayed via console.log 	
	console.log(response.places[i]);
//Creating a marker at each place location
	 marker = new google.maps.Marker({
		position: {'lat': response.places[i].lat, 'lng': response.places[i].lon},
		map: map
				});
//End of the for loop
	}

});

//End of trailFinder function
}


//When the page loads, this will run
$(window).on("load", function() {
	checkBox();
 	$("#submit-button").on("click", function(event) {
    	event.preventDefault();
    	name = $('#name-input').val();
    	$('#test').text(name.toUpperCase());
//get the search value
  		var searchValue = $("#name-input").val();
//use geocoder
//the first parameter is an object with 'address', which is used if you
//want to get coordinates from an address
//to get an address from coordinates, use 
//{'location': {'lat': 28.5383355, 'lng': -81.37923649999999}}
//the second parameter is a callback function
  		geocoder.geocode({'address': searchValue}, function(results, status) {
	  	if(status === 'OK') {
//results is going to be the address, but it is 
//going to give you a multiple choices in an array
//the first is probably the most accurate, so results[0] is your best bet.
//geometry.location is where you need to go to get
//the latitude and longitude, using the lat() and lng() functions
  			var geometry = results[0].geometry.location;
  			latitude = geometry.lat();
  			longitude = geometry.lng();
  			trailFinder(latitude, longitude);
//set a marker at location
  			var marker = new google.maps.Marker({
				position: {'lat': latitude, 'lng': longitude},
				map: map
			});
//center the map to the marker position
			marker.addListener('click', function() {
				//this refers to the marker that is clicked
			map.setCenter(this.getPosition());
			});
//center the map to the marker position
			map.setCenter(marker.getPosition());
			}
//End of the geocode/marker function	  			
	  	});
//End of the submit-button function	  
    $('#name-input').val("");	
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
	var video = $('video')
	  , container = $('#container');

	var setVideoDimensions = function () {
	  // Video's intrinsic dimensions
	  var w = video.videoWidth
	    , h = video.videoHeight;
	  
	  // Intrinsic Ratio
	  // Will be more than 1 if W > H and less if W < H
	  var videoRatio = (w / h).toFixed(2);
	  
	  // Get the container's computed styles
	  //
	  // Also calculate the min dimensions required (this will be
	  // the container dimentions)
	  var containerStyles = window.getComputedStyle(container)
	    , minW = parseInt( containerStyles.getPropertyValue('width') )
	    , minH = parseInt( containerStyles.getPropertyValue('height') );
	  
	  // What's the min:intrinsic dimensions
	  //
	  // The idea is to get which of the container dimension
	  // has a higher value when compared with the equivalents
	  // of the video. Imagine a 1200x700 container and
	  // 1000x500 video. Then in order to find the right balance
	  // and do minimum scaling, we have to find the dimension
	  // with higher ratio.
	  //
	  // Ex: 1200/1000 = 1.2 and 700/500 = 1.4 - So it is best to
	  // scale 500 to 700 and then calculate what should be the
	  // right width. If we scale 1000 to 1200 then the height
	  // will become 600 proportionately.
	  var widthRatio = minW / w
	    , heightRatio = minH / h;
	  
	  // Whichever ratio is more, the scaling
	  // has to be done over that dimension
	  if (widthRatio > heightRatio) {
	    var newWidth = minW;
	    var newHeight = Math.ceil( newWidth / videoRatio );
	  }
	  else {
	    var newHeight = minH;
	    var newWidth = Math.ceil( newHeight * videoRatio );
	  }
	  
	  video.style.width = newWidth + 'px';
	  video.style.height = newHeight + 'px';
	};

	video.addEventListener('loadedmetadata', setVideoDimensions, false);
	window.addEventListener('resize', setVideoDimensions, false);


// //initial Calling a jQuery ajax function to pull information 
// $.ajax({
//     url: "https://trailapi-trailapi.p.mashape.com/", 
//     type: 'GET',
// //parameters that can be changed    
//     data: {
// //set limit by me    	
//     	'limit': 10,
//     	// 'q[activities_activity_type_name_eq]': null,
// //set limit by me      	
//     	'radius': 50,
// //changed based of var city    	
//     	'q[city_cont]': "Orlando",
// //changed based of var state    	
//     	'q[state_cont]': "Florida"
// 		}, 
// // Additional parameters here
//     datatype: 'json',
// //success: function(data) { alert(JSON.stringify(data)); },
//     error: function(err) { alert(err); },
//     beforeSend: function(xhr) {
// // Enter here your Mashape key   	
//     xhr.setRequestHeader("X-Mashape-Authorization", "NQTdn7V99JmshrgWNZDbdFehWFX8p17WiaijsnBkVdo5einCNy");
//     	}
// 	})

//End of the window.onload function
});

