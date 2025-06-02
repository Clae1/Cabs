//Claeone Villareal ID:22170897

// file simpleajax.js
//function will get hours and minutes, then place information into time value input 
function showTime1()
{
	const now1 = new Date(); 
    const hour1 = String(now1.getHours()).padStart(2, '0');
    const min1 = String(now1.getMinutes()).padStart(2, '0');
    const formatTime1 = `${hour1}:${min1}`;

	return formatTime1;
}

//function will get hours and minute, then place information into time value input 
//However, add + 2 to the hours to incease the 'hours2'. 
function showTime2()
{
    const now2 = new Date(); 
    const hour2 = String(now2.getHours()+2).padStart(2, '0');
    const min2 = String(now2.getMinutes()).padStart(2, '0');
    const formatTime2 = `${hour2}:${min2}`;

	return formatTime2;
}

//Function is similar to getData in which we send a body of information to 
//the server-side ("admin.php"). We are sending 'delete' string via a variable 
//in the body to be used on the server-side
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

//Function is similar to getData in which we send a body of information to 
//the server-side ("admin.php"). This function is called from 'assign' button
//which will send a specific booking reference to the server-side to update 
//a row on the table 
function updateData(dataSource, divID, bnumber)
{
	var place = document.getElementById(divID);
	var update = "update";

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

//Function gets the information from the HTML form and puts the information into
//a body and sends its to the server-side to be used. 
function getData(dataSource, divID , bsearch)  
{
	var place = document.getElementById(divID);

	//Get the current time and time two hours from the current time 
	var time1 = showTime1(); 
	var time2 = showTime2(); 
	
    // check Bsearch is in the correct format, if inputted data is written on field
	// and if the field is not empty. To allow the admin to submit empty fields. 
    if (!validateBsearch(bsearch) && !emptyCheck(bsearch)) {
        alert("Field must contain only \"BRN\" followed by a maximum length of five numbers ");
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

//Valdiation check for searching for Booking Reference, and will check if the 
//the field has 'BRN' as its first letters followed by a sequence of five numbers 
function validateBsearch(input) {
    return /^BRN[0-9]{5}$/.test(input);
}

//Valdiation check for checking if the Admin submitted an empty field
function emptyCheck(input) {
    return /^$/.test(input);
}




