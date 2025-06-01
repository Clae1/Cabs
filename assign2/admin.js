// file simpleajax.js

//Troubleshooting:
// Use the developer tools in the browser to see the network activity.
// This will help us see if the request is being sent and if the response is being
// received.

//function will get hours and minutes, then place information into time value input 
function showTime1()
{
	const now1 = new Date(); 
    const hour1 = String(now1.getHours()).padStart(2, '0');
    const min1 = String(now1.getMinutes()).padStart(2, '0');
    const formatTime1 = `${hour1}:${min1}`;

	return formatTime1;
}

function showTime2()
{
    const now2 = new Date(); 
    const hour2 = String(now2.getHours()+2).padStart(2, '0');
    const min2 = String(now2.getMinutes()).padStart(2, '0');
    const formatTime2 = `${hour2}:${min2}`;

	return formatTime2;
}

function deleteTable(dataSource, divID, action)
{
	var place = document.getElementById(divID);
	var action = "delete";

	//Making a POST request using fetch
	const requestPromise = fetch(dataSource, {
		//Set the method to POST
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		//Set the body of the request
		//The body must be in the format of key=value&key=value
		body:   "action="+encodeURIComponent(action)
	});
	requestPromise.then(
		function (response){
			response.text().then(function(text) {
				place.innerHTML = text; 
			});
		}
	);
}

function updateData(dataSource, divID, bnumber)
{
	var place = document.getElementById(divID);
	var update = "update";

	console.log("updataData: " + bnumber);
	console.log(update);

	//Making a POST request using fetch
	const requestPromise = fetch(dataSource, {
		//Set the method to POST
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		//Set the body of the request
		//The body must be in the format of key=value&key=value
		body:   "bnumber="+encodeURIComponent(bnumber)+
				"&update="+encodeURIComponent(update)
	});
	requestPromise.then(
		function (response){
			response.text().then(function(text) {
				place.innerHTML = text; 
			});
		}
	);
}

function getData(dataSource, divID , bsearch)  
{
	var place = document.getElementById(divID);
	var time1 = showTime1(); 
	var time2 = showTime2(); 
	console.log(time1); 
	console.log(time2);
	console.log(bsearch);
	
    // check Bsearch is in the correct format, if inputted data is written on field
	// and if the field is not empty. To allow the admin to submit empty fields. 
    if (!validateBsearch(bsearch) && !emptyCheck(bsearch)) {
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
		body:   "bsearch="+encodeURIComponent(bsearch)+
				"&time1="+encodeURIComponent(time1)+
				"&time2="+encodeURIComponent(time2)
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

function emptyCheck(input) {
    return /^$/.test(input);
}




