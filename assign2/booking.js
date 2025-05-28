// file simpleajax.js

//Troubleshooting:
// Use the developer tools in the browser to see the network activity.
// This will help us see if the request is being sent and if the response is being
// received.


//To run all the functions when page loads 
function loadFunction(divID, divID_2)
{
    showDate(divID);
    showTime(divID_2);
}


//function will get date and place information into date value input 
function showDate(divID)
{   
    //This functions will get the current date, month and year 
    //Both month and date function must be converted into String as it returns a number
    const now = new Date(); 
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0'); 
    const formattedDate = `${year}-${month}-${day}`;

    const input = document.getElementById(divID);
    input.value = formattedDate;  
}

//function will get hours and minutes, then place information into time value input 
function showTime(divID_2)
{
    console.log(divID_2);

    const now = new Date(); 
    const hour = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const formatTime = `${hour}:${min}`;
    
    const input = document.getElementById(divID_2);
    input.value = formatTime;
}


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
    if (validateDate(time))
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



