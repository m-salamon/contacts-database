<?php
require 'db.php';

$errors = [];

function getParam($param){
    if(!empty($_POST[$param])){
        return $_POST[$param];
    }else{
        $errors[] = $param . 'is required';
        return false;
    }
}
    
    $firstName = getParam('firstName');
    $lastName = getParam('lastName');
    $email = getParam('email');
    $phone = getParam('phone');

if(!empty($errors)){
   http_response_code(500);
    exit(join('<br>',$errors));
}

$query = "INSERT into contacts (firstName, lastName, email, phone) VALUES (?,?,?,?)";
$sql = $db->prepare($query);
$sql->bindParam(1, $firstName);
$sql->bindParam(2, $lastName);
$sql->bindParam(3, $email);
$sql->bindParam(4, $phone);
$rowsInserted = $sql->execute();




if($rowsInserted){
   echo $db->lastInsertId();
}else{
     http_response_code(500);
    exit('Unable to add contact');
}

?>








