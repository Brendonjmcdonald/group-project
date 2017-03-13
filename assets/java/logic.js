// on page load, display all events from eventful API's
// As the user makes selections the list of events narrows it reflect the user's taste
// The results should display the best match listed first
// limit of ten total results
// Once the user decides on an event, they can compare the prices of Lyft vs Uber, pricing pulled from respective API's




// Begin by initializring global variables
var eventCategory = ["sports", "music", "theatre", ]
var eventLocation = " "
var eventDate = " "

// identifies the function called displayEvents
function displayEvents() {
// initializes variables for data pulled from Eventful API
      var event = $(this).attr("data-name");
// API key variable
      var queryURL = "https://website url here" +
        event + "&api_key=OUR API KEYlimit=10";
// Ajax call to display results
$.ajax({
          url: queryURL,
          method: "GET"
        })
      
        .done(function(response) {

        	var results = response.data;
        	// insert variables or arrays here
        	// This will let us reload divs and ID's without resetting the rest of the page
        	// can also set mthod to "push" depending on the situation
        }