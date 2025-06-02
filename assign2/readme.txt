List of all files in the system: 
- images folder / taxi_2.jpg, taxi.jpg
- admin.css 
- admin.html
- admin.js 
- admin.php 
- booking.css
- booking.html 
- booking.js 
- booking.php 
- mysqlcommand.txt 

--------------------------------------------------------------------------------------------------------------
Instructions on how to use admin.html:
There are three buttons on the webpage, one is used to delete the table from the database, the other button is 
used to submit either inputted data or blank information, and another button that will appear if not data is 
inputted in the field which is used to assign the booking reference

Information will appear where "awaiting response" is located 

Functions: 
(First function)
1. Enter a specific Booking reference number into the field 

2. Press the button with "Enter Booking Reference" 

3. Two Outcomes may arise: 
	- The webpage will display a singular row of information from the table based on the inputted Booking reference
     number into the field 
	- The webpage will display a message to indicate to the admin that the booking number does not exist 

4. If the booking reference number does exist, the admin can press "assign" button to assign
   the booking reference. This will be updated on the webpage and the server 

(Second function)
1. Enter nothing into the field 

2. Press the button with "Enter Booking Reference"

3. Two Outcomes may arise:
	- The webpage will display a multiple rows of information from the table based on the pickup time within 2 hours 
    from current time
    - The will will display a message to indicate to the admin that there are no bookings based on the pickup time 
    within 2 hours from current time

4. If the booking reference number does exist, the admin can press "assign" button to assign
   the booking reference. This will be updated on the webpage and the server 
--------------------------------------------------------------------------------------------------------------
Instructions on how to use booking.html: 
This file is where a customer will input there information to book a cab. There are several fields that need to be 
inputted in which Customer name, Phone number, Street number, Street name, Pick up date and Pick-up time 
must be filled in, while Unit number, Suburb and Destination Suburb are optional and maybe filled in. There is a
button that can be pressed once all the information has been filled out by the customer, clicking the button will 
send then show a confirmation message to show that their booking was successful 

Functions 
(First functions)
1. Enter your detials 
    - Each field has its own validation and a alert message will pop-out if the inputted message is in the wrong 
    format. 
    - Fields are optiontal and will not show an error message unless the customer decides to fill it out, in 
    which a validation check will be applied and will provide an alert message if the format is not in the correct format
    - pickup date and time are updated onload based on the current time and date. Still the customer is able to 
    edit the information by clicking on the field 

2. Click the button with "submit" 

3. Confirmation message will appear at the buttom of the submit button 
    - It will dispaly: Booking reference number, pickup time and pickup date

(Second functions)
1. When the customer enters the webpage, if the database does not exist, the customer can still submit their data, 
this is because the php file will check if the table 'cabs' exist before initiating any querys that select, insert and etc. 

(Third function)
1. When the customer clicks the submit button, all fields are cleared and the time and date fields are updated to the current time and date 

