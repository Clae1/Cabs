// file simpleajax.js

//Troubleshooting:
// One of the issues that I was dealing with was that the JS code was not 
// Communicating properly with data.php. This is because I did not make a proper
// POST request. I was using the GET method instead of POST. 

// Another issue was the body of the request, the string within in the body had 
// a ? mark in it which was not needed. I must remember that the body must be 
// a specific format.

// Lastly, we can use the developer tools in the browser to see the network activity.
// This will help us see if the request is being sent and if the response is being
// received.

function getData(dataSource, divID, cname, phone, unumber, snumber, stname, sbname, dsbname, date, time)  
{
	var place = document.getElementById(divID);
	
    // check if cname is in the correct format 
    if (!validateCname(cname)) {
        alert("Field must contain only letters.");
        return;
    }

    // check if phone is in the correct format 
    if (!validatePhone(phone)) {
        alert("Field must contain only numbers with a length between 10-12.");
        return; 
    }

    //check if Unit number is in the correct format and if input is not null or empty 
    if (!validateUnumber(unumber) && unumber)
    {
        alert("Field Unit number must only contain numbers with a length between 2 - 10 ");
        return; 
    }

    //check Street number is in the correct format by allowing only numbers with a length between 2 to 10
    if (!validateSnumber(snumber))
    {
        alert("Field Street number must only contain numbers with a length between 2 - 10 ");
        return; 
    }

    //check Street name is correct format by allowing only alphabetical letters 
    if (!validateStname(stname))
    {
        alert("Field Street name must contain only alphabetical letters");
        return; 
    }

    if (!validateSbname(sbname) && sbname)
    {
        alert("Field Subrub name must contain only alphabetical letters!!!");
        return; 
    }

    if (!validateDsbname(dsbname) && dsbname)
    {
        alert("Field Destination Subrub name must contain only alphabetical letters!!!");
        return; 
    }

    if (validateDate(date))
    {
        alert("Field Date cannot be empty, must input a date!!!");
        return; 
    }

    if (validateTime(time))
    {
        alert("Field Time cannot be empty, must input a date!!!");
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
		body:   "cname="+encodeURIComponent(cname)+
                "&phone="+encodeURIComponent(phone)+
                "&unumber="+encodeURIComponent(unumber)+
                "&snumber="+encodeURIComponent(snumber)+
                "&stname="+encodeURIComponent(stname)+
                "&sbname="+encodeURIComponent(sbname)+
                "&dsbname="+encodeURIComponent(dsbname)+
                "&date="+encodeURIComponent(date)+
                "&time="+encodeURIComponent(time)
	});
	requestPromise.then(
		function (response){
			response.text().then(function(text) {
				place.innerHTML = text;
			});
		}
	);
}

function validateCname(input) {
    return /^[a-zA-Z ]+$/.test(input);
}

function validatePhone(input) {
    return /^[0-9]{10,12}$/.test(input);
}

function validateUnumber(input) {
    return /^[0-9]{2,10}$/.test(input);
}

function validateSnumber(input) {
    return /^[0-9]{2,10}$/.test(input);
}

function validateStname(input) {
    return /^[a-zA-z ]+$/.test(input);
}

function validateSbname(input) {
    return /^[a-zA-z ]+$/.test(input);
}

function validateDsbname(input) {
    return /^[a-zA-z ]+$/.test(input);
}

function validateDate(input) {
    return /^$/.test(input);
}

function validateTime(input) {
    return /^$/.test(input);
}

