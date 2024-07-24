<?php
// Envía un mensaje al servidor Node.js usando HTTP
$url = 'http://localhost:3000/send-message';
$data = json_encode(['message' => 'Hello from PHP!', 'user' => 'PHPUser']);

$options = [
    'http' => [
        'header'  => "Content-Type: application/json\r\n",
        'method'  => 'POST',
        'content' => $data,
    ],
];

$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

if ($result === FALSE) {
    $error = error_get_last();
    echo "Error sending message: " . $error['message'] . "\n";
} else {
    echo "Message sent.\n";
}
?>
