<?php
define('DB_HOST', 'localhost');
define('DB_NAME', 'back2you');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// Cloudinary Cloud Storage
define('CLOUDINARY_CLOUD_NAME', 'drpvfbehm');
define('CLOUDINARY_API_KEY', '378271878676779');
define('CLOUDINARY_API_SECRET', 'wULZnrT7ULyA1ZPiPFmRPE-jl24');

// Remember Me
define('SESSION_LIFETIME', 60 * 60 * 24 * 30);

// Helper: return a PDO connection
function getDB(): PDO {
    static $pdo = null;
    if ($pdo === null) {
        $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
        $options = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ];
        $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
    }
    return $pdo;
}

// Helper: send a JSON response and exit
function jsonResponse(array $data, int $status = 200): void {
    http_response_code($status);
    header('Content-Type: application/json');
    echo json_encode($data);
    exit;
}

// Start / configure session
session_start();
