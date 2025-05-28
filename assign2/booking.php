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

        $cname = $_POST['cname'];
        $phone = $_POST['phone'];
        $unumber = $_POST['unumber'];
        $snumber = $_POST['snumber'];
        $stname = $_POST['stname'];
        $sbname = $_POST['sbname'];
        $dsbname = $_POST['dsbname'];
        $date = $_POST['date'];
        $time = $_POST['time'];

        //Create a unique Booking number reference 
        //Check the table for latest Booking reference 
        $query = "SELECT bnumber FROM cabs ORDER BY bnumber DESC LIMIT 1";
        $result = mysqli_query($conn, $query);

        $id_num;
        $id = "BRN"; 
        $counter = 1;
        if ($result && mysqli_num_rows($result) > 0)
        {
            $row = mysqli_fetch_assoc($result); 
            $id_num = $row["bnumber"]; 
            $id_num = substr($id_num, 3);
            $position = strrpos($id_num, "0"); 

            $counter += substr($id_num, $position);
            $id_num = substr_replace($id_num, "$counter", $position);

            $bnumber = $id.$id_num; 

        }

        //If there are not results in the table, set the booking reference to "BRN00000"
        else 
        {
            $bnumber = "BRN00000";
        }

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
