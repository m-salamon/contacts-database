<?php
require 'db.php';

if(!empty($_POST['id'])){
    $id = $_POST['id'];
}else{
    echo 'failed';
    
}

$query = 'DELETE FROM contacts WHERE id = :id';
$statement = $db->prepare($query);
$statement->bindValue(':id', $id);
$success = $statement->execute();

var_dump($success);

?>