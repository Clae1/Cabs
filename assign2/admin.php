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
        $bsearch = $_POST['besearch'];


        //Search for Booking Reference number on the table 

        $result = mysqli_query($conn, $query);

        //check if query did not work worked 
        if (!$result)
        {
            echo "<br>";
            echo "SQL Error: " . mysqli_error($conn);
        }

        //if query was sucessful
        else 
        {
            //Create another query that displays all the information related to Booking reference 
        }
	}
?>
