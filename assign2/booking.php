<!--file data.php -->
<?php
	// sql info or use include 'file.inc'
    require_once('../../files/setting.php');
            
	// The @ operator suppresses the display of any error messages
    // mysqli_connect returns false if connection failed, otherwise a connection value
    $conn = mysqli_connect(
        $host,
        $user,
        $pswd,
        $dbnm
    );
        
	// Checks if connection is successful
    if (!$conn) 
    {
        // Displays an error message
        echo "<p>Database connection failure</p>";
    } 

	else 
	{
        //debugging 
        //var_dump($_POST);

        $phone = $_POST['phone'];
        $unumber = $_POST['unumber'];
        $snumber = $_POST['snumber'];
        $stname = $_POST['stname'];
        $sbname = $_POST['sbname'];
        $dsbname = $_POST['dsbname'];
        $date = $_POST['date'];
        $time = $_POST['time'];

        //Create a unique Booking number reference 
        //Use subtrings, check the database for the most recent request and gets its Booking reference 
        $bnumber = "BRN";

		
        $query = "INSERT INTO cabs (bnumber, cname, phone, unumber, snumber, stname, sbname, dsbname, date, time, status) VALUES ('$bnumber','$cname','$phone','$unumber','$snumber','$stname','$sbname','$dsbname','$date','$time','Unassigned')";
        // executes the query
        $result = mysqli_query($conn, $query);

        //check if query worked 
        if (!$result)
        {
            echo "<br>";
            echo "SQL Error: " . mysqli_error($conn);
        }
	}
?>
