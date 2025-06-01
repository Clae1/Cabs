<!--file data.php -->
<?php
    class Admin {
        function provideTable($row) {
            echo "<table class=\"info\">";
            echo "<tr>";
            echo "<th>Booking Reference</th>";
            echo "<th>Name</th>";
            echo "<th>Phone Number</th>";
            echo "<th>Subrub</th>";
            echo "<th>Destination Subrub</th>";
            echo "<th>Pickup Date and Time</th>";
            echo "<th>Status</th>";
            echo "<th>Assign</th>";
            echo "</tr>";
            echo "<tr>";
            echo "<td>", $row["bnumber"], "</td>";
            echo "<td>", $row["cname"], "</td>";
            echo "<td>", $row["phone"], "</td>";
            echo "<td>", $row["sbname"], "</td>";
            echo "<td>", $row["dsbname"], "</td>";
            echo "<td>", $row["date"], " ", $row["time"], "</td>";
            echo "<td>", $row["status"], "</td>";
            echo "<td><input name=\"sbutton\" type=\"button\" onClick=\"updateData('admin.php', 'reference', '$row[bnumber]')\" value=\"Assign\"></td>";
            echo "</tr>";
            echo "</table>";
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
        $delete = $_POST['action'];
        if ($delete == "delete")
        {
            $query = "DROP TABLE cabs";
            $result = mysqli_query($conn, $query);
            
            if(!$result) {
                echo "<h2>Table does not exist</h2>";
            }

            else {
                echo "<h2>Table has been deleted successfully</h2>";
            }
            die();
        }

        $bnumber = $_POST['bnumber'];
        $update = $_POST['update'];

        $bsearch = $_POST['bsearch'];
        $time1 = $_POST['time1'];
        $time2 = $_POST['time2'];

        //Section of code will update the status of a booking reference 
        if ($update == "update")
        {
            $query = "UPDATE cabs SET status = 'Assigned' WHERE bnumber = '$bnumber'";
            $result = mysqli_query($conn, $query);
            
            //check if query did not work worked 
            if (!$result)
            {
                echo "<br>";
                echo "SQL Error: " . mysqli_error($conn);
            }
            
            else 
            {
                //Print a message that the information has been assigned successufully 
                echo "<h2>Congratulations! Booking request ", $bnumber," hase been assigned!!!</h2>";
                $admin = new Admin();

                $query = "SELECT * FROM cabs WHERE bnumber = '$bnumber'";
                $result = mysqli_query($conn, $query);

                //check if query did not work worked 
                if (!$result) {
                    echo "<br>";
                    echo "SQL Error: " . mysqli_error($conn);
                }

                //if query was sucessful
                else {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $admin->provideTable($row);
                    }
                }
            }
            die();
        }

        //if the varaible is empty it will search for any unassigned booking request 
        //within 2 hours from the current time only 
        if (empty($bsearch))
        {
            $query = "SELECT * FROM cabs WHERE status = 'Unassigned' AND time BETWEEN '$time1' AND '$time2' ";
            $result = mysqli_query($conn, $query);

            //check if query did not work worked 
            if (!$result)
            {
                echo "<br>";
                echo "SQL Error: " . mysqli_error($conn);
            }

            else
            {
                //This displays the information related to the booking reference 
                $admin = new Admin();
                while ($row = mysqli_fetch_assoc($result))
                {
                    $admin->provideTable($row);
                }
                die();
            }
        }

        //if the variable is not empty search for the specific booking reference 
        $query = "SELECT * FROM cabs WHERE bnumber = '$bsearch'";
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
            $admin = new Admin();
            while ($row = mysqli_fetch_assoc($result)) 
            {
                $admin->provideTable($row);
            }
        }
        // Frees up the memory, after using the result pointer
        mysqli_free_result($result);
	}
    // close the database connection
    mysqli_close($conn);
?>
