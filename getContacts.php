
<?php
require 'db.php';

$query = 'SELECT * FROM contacts';
$stmt = $db->query($query);
//phph returns a doubled object and we dont need it so we say PDO::FETCH_ASSOC to make it more eficcient and only return the object once
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
//print_r($rows);

//we need to turn the php into string type (Json) to diplay it in the webpage so we do json_encode() function it turns php intojson and we echo whatever it returns.
echo json_encode($rows);

?>
