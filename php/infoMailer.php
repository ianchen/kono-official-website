<?php
require("Mailer/Mailer.php");
$m = new Mailer();
if(!isset($_POST["subject"]) || !isset($_POST["content"])){
    header( 'status_code', true, "400" );
    echo json_encode(array("status" => 400, "success" => false, "reason" => "bad request"));
    return false;
}
if($m->GmailSend($_POST["subject"], "info@thekono.com", $_POST["content"])){
    header( 'status_code', true, "200" );
    echo json_encode(array("status" => 200, "success" => true));
}
else{
    header( 'status_code', true, "500" );
    echo json_encode(array("status" => 500, "success" => false, "reason" => "server error"));
}
?>
