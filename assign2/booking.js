//Claeone Villareal ID:22170897

// file simpleajax.js
//To run all the functions when page loads 
function loadFunction(divID, divID_2)
{
    //This will reset the fields on the forms
    document.getElementById('cname').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('unumber').value = '';
    document.getElementById('snumber').value = '';
    document.getElementById('stname').value = '';
    document.getElementById('sbname').value = '';
    document.getElementById('dsbname').value = '';
    document.getElementById('date').value = '';
    document.getElementById('time').value = '';

    //Will reset the date and time on the form 
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
    const now = new Date(); 
    const hour = String(now.getHours()).padStart(2, '0');
    const min = String(now.getMinutes()).padStart(2, '0');
    const formatTime = `${hour}:${min}`;
    
    const input = document.getElementById(divID_2);
    input.value = formatTime;
}

//Function gets the information from the HTML form and puts the information into
//a body and sends its to the server-side to be used. Within this function includes 
//many different validation functions to ensure that all inputted data are in the 
//correct format.
function getData(dataSource, divID ,cname, phone, unumber, snumber, stname, sbname, dsbname, date, time)  
{
	var place = document.getElementById(divID);
	
    // check if cname is in the correct format 
    if (!validateCname(cname)) {
        alert("Field Customer Name must contain only letters.");
        return;
    }

    // check if phone is in the correct format 
    if (!validatePhone(phone)) {
        alert("Field Phone number must contain only numbers with a length between 10-12.");
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

    //check if suburb name is in the correct format and is not empty or null
    if (!validateSbname(sbname) && sbname)
    {
        alert("Field Subrub name must contain only alphabetical letters!!!");
        return; 
    }

    //check if destination suburb is in the correct format and is not empty or null
    if (!validateDsbname(dsbname) && dsbname)
    {
        alert("Field Destination Subrub name must contain only alphabetical letters!!!");
        return; 
    }

    //check if the date is in the correct format
    //Provide an error message that date cannot be empty 
    if (validateDate(date))
    {
        alert("Field Date cannot be empty, must input a date!!!");
        return; 
    }

    //check if the time is in the correct format
    //Provide an error message that time cannot be empty 
    if (validateDate(time))
    {
        alert("Field Time cannot be empty, must input a Time!!!");
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
            document.getElementById("form").reset();
			response.text().then(function(text) {
				place.innerHTML = text;

                //Will only reset the form, date and time when
                //the user clicks on the button 
                loadFunction('date', 'time');
			});
		}
	);
}

//Will check if customer name input includes Uppercase and lowercase letters and spacee
function validateCname(input) {
    return /^[a-zA-Z ]+$/.test(input);
}

//Will check if Phone number input includes only numbers and min-max 10 to 12 number input 
function validatePhone(input) {
    return /^[0-9]{10,12}$/.test(input);
}

//Will check if Unit number input includes only numbers and min-max 2 to 10 number input 
function validateUnumber(input) {
    return /^[0-9]{2,10}$/.test(input);
}

//Will check if Street number input includes only numbers and min-max 2 to 10 number input
function validateSnumber(input) {
    return /^[0-9]{2,10}$/.test(input);
}

//Will check if Street name input includes Uppercase and lowercase letters and space
function validateStname(input) {
    return /^[a-zA-z ]+$/.test(input);
}

//Will check if Suburb name input includes Uppercase and lowercase letters and space
function validateSbname(input) {
    return /^[a-zA-z ]+$/.test(input);
}

//Will check if Destination Suburb name input includes Uppercase and lowercase letters and space
function validateDsbname(input) {
    return /^[a-zA-z ]+$/.test(input);
}

//Will check if the the date or time is empty 
function validateDate(input) {
    return /^$/.test(input);
}



