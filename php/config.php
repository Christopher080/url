<?php
    $conn = mysqli_connect("localhost", "root", "", "urlshortener");
    if(!$conn){ //if database is connected withput error
        echo "Database connection error".mysqli_connect_error();
    }
?>