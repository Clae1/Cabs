<!--file data.php -->
<?php
    //Create a class for functions 
    class Booking {
        function formatDate($input){
            $array = explode("-", $input);
            $newDate = $array[0]. "/" . $array[1] . "/" . $array[2];
            return $newDate;
        }
    }



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

        $id = "BRN"; 
        if ($result && mysqli_num_rows($result) > 0)
        {
            $row = mysqli_fetch_assoc($result); 
            $lastest_bnumber = $row["bnumber"]; 
            $id_num = intval(substr($lastest_bnumber, 3));
            $id_num++;
            $bnumber = $id . str_pad($id_num, 5, "0", STR_PAD_LEFT);
        }

        //If there are not results in the table, set the booking reference to "BRN00000"
        else 
        {
            $bnumber = "BRN00000";
        }

        $query = "INSERT INTO cabs (bnumber, cname, phone, unumber, snumber, stname, sbname, dsbname, date, time, status) VALUES ('$bnumber','$cname','$phone','$unumber','$snumber','$stname','$sbname','$dsbname','$date','$time','Unassigned')";
        $result = mysqli_query($conn, $query);

        //check if query did not work worked 
        if (!$result)
        {
            echo "<br>";
            echo "SQL Error: " . mysqli_error($conn);
        }

        else {
            echo "<h1>Thank you for Booking</h1>";
            echo "<br>";
            echo "<p>Booking reference number :". $bnumber ."<p>";
            echo "<p>Pickup time :". $time ."<p>";

            //Change the format of date 
            $input = new Booking();
            $date = $input->formatDate($date);
            echo "<p>Pickup date :". $date ."<p>";
        }
	}
?>
