<?php
   //let's get these values which are sent from ajax to php
   include "config.php";
   $og_url = mysqli_real_escape_string($conn, $_POST['shorten_url']);
   $full_url = str_replace(' ', '', $og_url); //removing space from url if user entered
   $hidden_url = mysqli_real_escape_string($conn, $_POST['hidden_url']);

   if(!empty($full_url)){
        $domain = "localhost";
        //let's check user has edited or removed domain name or not
        if(preg_match("/{$domain}/i", $full_url) && preg_match("/\//i", $full_url)){
            $explodeURL = explode('/', $full_url);
            $short_url = end($explodeURL); //getting last value of
            if($short_url != ""){
                // let's slect randomly created url to update with user entered new value
                $sql = mysqli_query($conn, "SELECT shorten_url FROM url WHERE shorten_url = '{$short_url}' && shorten_url != '{$hidden_url}'");
                if(mysqli_num_rows($sql) == 0){ //if the user entered url not in our database
                    //let's update the link or url
                    $sql2 = mysqli_query($conn, "UPDATE url SET shorten_url = '{$short_url}' WHERE shorten_url = '{$hidden_url}'");
                    if($sql2){ //if url updated
                        echo "Success";
                    }else{
                        "something went wrong!";
                    }
                }else{
                    echo "Sorry - This url lready exist";
                }
            }else{
                echo "Error - You have to enter short URL";
            } 
        }else{
            echo "Invalid URL - You can't edit domain name!";
        }
   }else{
        echo "Error - You have to enter short URL";
   }

?>