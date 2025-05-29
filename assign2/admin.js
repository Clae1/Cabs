// file simpleajax.js

//Troubleshooting:
// Use the developer tools in the browser to see the network activity.
// This will help us see if the request is being sent and if the response is being
// received.


function getData(dataSource, divID , bsearch)  
{
    console.log(divID);
    console.log(bsearch);
	var place = document.getElementById(divID);
	
    // check if cname is in the correct format 
    if (!validateBsearch(bsearch)) {
        alert("Field must contain only \"BRN\" followed by a maximum 5 numbers ");
        return;
    }

	//Making a POST request using fetch
	const requestPromise = fetch(dataSource, {
		//Set the method to POST
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		//Set the body of the request
		//The body must be in the format of key=value&key=value
		body:   "bsearch="+encodeURIComponent(bsearch)
	});
	requestPromise.then(
		function (response){
			response.text().then(function(text) {
				place.innerHTML = text;
			});
		}
	);
}


function validateBsearch(input) {
    return /^BRN[0-9]{5}$/.test(input);
}




