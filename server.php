<?php
// server.php?action=register|login
header('Content-Type: application/json; charset=utf-8');

// Simple router
$action = $_GET['action'] ?? '';
$input = $_POST;

$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';
$via = $input['via'] ?? 'local';

if (!in_array($action, ['register','login'])) {
    echo json_encode(['status'=>'error','message'=>'Action tidak valid']);
    exit;
}

if (!$email || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['status'=>'error','message'=>'Email tidak valid']);
    exit;
}

// File storage
$usersFile = __DIR__ . '/users.json';
if (!file_exists($usersFile)) file_put_contents($usersFile, json_encode(new stdClass()));

$users = json_decode(file_get_contents($usersFile), true) ?: [];
$key = strtolower($email);

if ($action === 'register') {
    if (isset($users[$key])) {
        if ($via === 'google') {
            echo json_encode(['status'=>'exists','message'=>'Akun sudah ada (via google)']);
            exit;
        }
        echo json_encode(['status'=>'error','message'=>'Email sudah terdaftar']);
        exit;
    }

    $hash = $password !== '' ? password_hash($password, PASSWORD_DEFAULT) : '';
    $users[$key] = [
        'email' => $email,
        'password_hash' => $hash,
        'created_at' => date('c'),
        'via' => $via
    ];
    file_put_contents($usersFile, json_encode($users, JSON_PRETTY_PRINT));
    echo json_encode(['status'=>'success','message'=>'Pendaftaran berhasil']);
    exit;
}

if ($action === 'login') {
    if (!isset($users[$key])) {
        echo json_encode(['status'=>'error','message'=>'Akun tidak ditemukan. Silakan daftar.']);
        exit;
    }

    $stored = $users[$key]['password_hash'] ?? '';
    if ($stored === '' || password_verify($password, $stored)) {
        echo json_encode(['status'=>'success','message'=>'Login berhasil']);
    } else {
        echo json_encode(['status'=>'error','message'=>'Email atau password salah']);
    }
    exit;
}
?>
