<?php
    $dir = 'uploads/';
    $a = scandir($dir);
    $b=count($a);
    $res = '';
    for($x=2;$x<$b;$x++)
       {
         $res.= "<div class='filePass'>";
         $res.= $a[$x];
         $res.= "</div>";
       }
    echo $res;
?>