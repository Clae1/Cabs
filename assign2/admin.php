<!--file data.php -->
<?php
    class Admin {
        function getTime($time)
        {

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
        $bsearch = $_POST['bsearch'];
        $time1 = $_POST['time1'];
        $time2 = $_POST['time2'];


        //if the varaible is empty it will search for any unassigned booking request 
        //within 2 hours from the current time only 
        if (empty($bsearch))
        {
            $query = "SELECT * FROM cabs WHERE status = 'Unassigned' AND  BETTWEEN $time1 AND $time2 ";
            $result = mysqli_query($conn, $query);

            if ($result)
            {
                //This displays the information related to the booking reference 
                while ($row = mysqli_fetch_assoc($result))
                {
                    echo "<div>"
                    ."Times: ", $row["time"]
                    . "<div>";
                }
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
            while ($row = mysqli_fetch_assoc($result))
                {
                    echo "<table class=\"info\">";
                    echo "<tr>";
                    echo "<th>Booking Reference</th>";
                    echo "<th>Name</th>";
                    echo "<th>Phone Number</th>";
                    echo "<th>Subrub</th>";
                    echo "<th>Destination Subrub</th>";
                    echo "<th>Time</th>";
                    echo "<th>Date</th>";
                    echo "<th>Status</th>";
                    echo "<th>Assign</th>";
                    echo "</tr>";
                    echo "<tr>";
                    echo "<td>", $row["bnumber"], "</td>";
                    echo "<td>", $row["cname"], "</td>";
                    echo "<td>", $row["phone"], "</td>";
                    echo "<td>", $row["sbname"], "</td>";
                    echo "<td>", $row["dsbname"], "</td>";
                    echo "<td>", $row["time"], "</td>";
                    echo "<td>", $row["date"], "</td>";
                    echo "<td>", $row["status"], "</td>";
                    echo "<td><input name=\"sbutton\" type=\"button\" onClick=\"updateData('admin.php', 'reference', 'assign)\" value=\"Assign\"></td>";
                    echo "</tr>";
                    echo "</table>";
                }
        }
        // Frees up the memory, after using the result pointer
        mysqli_free_result($result);
	}
    // close the database connection
    mysqli_close($conn);
?>
