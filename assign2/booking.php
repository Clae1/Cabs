<!--Claeone Villareal ID:22170897-->
<!--file data.php -->
<?php
    class Booking {

        //This function will return data into this format 'xx/xx/xx'
        function formatDate($input){
            $array = explode("-", $input);
            $newDate = $array[0]. "/" . $array[1] . "/" . $array[2];
            return $newDate;
        }

        //This function simply checks if 'cabs' table exist in the database
        //If not then it will create a table containing all the following fields:
        //Booking reference, Customer name, Phone number, Unit number, Street number, 
        //street name, suburb name, destination suburb, date, time and status 
        function checkDatabase($conn)
        {
            //Check if the table exist first before running the other queries 
            $query = "SHOW TABLES LIKE 'cabs'";
            $result = mysqli_query($conn, $query);

            if (mysqli_num_rows($result) == 0)
            {
                $query = "CREATE TABLE `cabs` (
                                `bnumber` VARCHAR(8) NOT NULL, 
                                `cname` VARCHAR(50) NOT NULL,
                                `phone` VARCHAR(12) NOT NULL,
                                `unumber` VARCHAR(50),
                                `snumber` VARCHAR(50) NOT NULL,
                                `stname` VARCHAR(200) NOT NULL,
                                `sbname` VARCHAR(200),
                                `dsbname` VARCHAR(200),
                                `date` DATE NOT NULL,
                                `time` TIME NOT NULL,
                                `status` VARCHAR(20),
                                PRIMARY KEY(`bnumber`)
                            );";
                $result = mysqli_query($conn, $query);
            }
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
        //Check if the database exist, if not ceate database
        $create = new Booking();
        $create->checkDatabase($conn);
        
        //Intialize all the information from the body requst 
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
        //First check if the result is true and query result returns latest booking reference number.
        //If conditions are fulfilled create a new booking number that increments based on the laster booking 
        //reference number on the 'cabs' table
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

        //Insert all the data from the body request to the 'cabs' database 
        $query = "INSERT INTO cabs (bnumber, cname, phone, unumber, snumber, stname, sbname, dsbname, date, time, status) VALUES ('$bnumber','$cname','$phone','$unumber','$snumber','$stname','$sbname','$dsbname','$date','$time','Unassigned')";
        $result = mysqli_query($conn, $query);

        //check if query did not work worked 
        if (!$result)
        {
            echo "<br>";
            echo "SQL Error: " . mysqli_error($conn);
        }

        //Provide a confirmation message to the user customer than their booking 
        //was successful 
        else 
        {
            echo "<div class=\"info\">";
            echo "<h1>Thank you for Booking</h1>";
            echo "<p class=\"serverData\">Booking reference number: ". $bnumber ."<p>";
            echo "<p class=\"serverData\">Pickup time: ". $time ."<p>";

            //Change the format of date 
            $input = new Booking();
            $date = $input->formatDate($date);
            echo "<p class=\"serverData\">Pickup date :". $date ."<p>";
            echo "</div>";
        }
        // Frees up the memory, after using the result pointer
        mysqli_free_result($result);
	}
    // close the database connection
    mysqli_close($conn);
?>
