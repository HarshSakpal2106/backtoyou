<?php
require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {

    // User Registration
    case 'register':
        $name     = trim($_POST['name']     ?? '');
        $email    = strtolower(trim($_POST['email']    ?? ''));
        $phone    = trim($_POST['phone']    ?? '');
        $pincode  = trim($_POST['pincode']  ?? '');
        $password = $_POST['password'] ?? '';

        // Validation
        if (!$name || !$email || !$password) {
            jsonResponse(['success' => false, 'message' => 'Name, email, and password are required.'], 400);
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            jsonResponse(['success' => false, 'message' => 'Invalid email address.'], 400);
        }
        if (strlen($password) < 6) {
            jsonResponse(['success' => false, 'message' => 'Password must be at least 6 characters.'], 400);
        }

        $db = getDB();

        // Check duplicate email
        $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
        $stmt->execute([$email]);
        if ($stmt->fetch()) {
            jsonResponse(['success' => false, 'message' => 'An account with this email already exists.'], 409);
        }

        // Hash password (bcrypt, cost 12)
        $hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

        $stmt = $db->prepare(
            "INSERT INTO users (name, email, phone, pincode, password) VALUES (?, ?, ?, ?, ?)"
        );
        $stmt->execute([$name, $email, $phone ?: null, $pincode ?: null, $hash]);

        jsonResponse(['success' => true, 'message' => 'Account created successfully!']);

    // Login
    case 'login':
        $email      = strtolower(trim($_POST['email']      ?? ''));
        $password   = $_POST['password']   ?? '';
        $rememberMe = !empty($_POST['rememberMe']);

        if (!$email || !$password) {
            jsonResponse(['success' => false, 'message' => 'Email and password are required.'], 400);
        }

        $db   = getDB();
        $stmt = $db->prepare("SELECT id, name, email, phone, pincode, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();

        if (!$user || !password_verify($password, $user['password'])) {
            jsonResponse(['success' => false, 'message' => 'Incorrect email or password.'], 401);
        }

        // Regenerate session ID to prevent fixation
        session_regenerate_id(true);

        $_SESSION['user_id']    = $user['id'];
        $_SESSION['user_email'] = $user['email'];
        $_SESSION['user_name']  = $user['name'];

        // Remember Me: extend cookie lifetime
        if ($rememberMe) {
            $params = session_get_cookie_params();
            setcookie(
                session_name(),
                session_id(),
                time() + SESSION_LIFETIME,
                $params['path'],
                $params['domain'],
                $params['secure'],
                $params['httponly']
            );
        }

        // Return safe user data (no password)
        unset($user['password']);
        jsonResponse(['success' => true, 'user' => $user]);

    // Logout
    case 'logout':
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $p = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $p['path'], $p['domain'], $p['secure'], $p['httponly']);
        }
        session_destroy();
        jsonResponse(['success' => true]);

    // ME (check who is logged in)
    case 'me':
        if (empty($_SESSION['user_id'])) {
            jsonResponse(['success' => false, 'loggedIn' => false]);
        }
        $db   = getDB();
        $stmt = $db->prepare("SELECT id, name, email, phone, pincode FROM users WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        $user = $stmt->fetch();

        if (!$user) {
            // Session exists but user was deleted
            session_destroy();
            jsonResponse(['success' => false, 'loggedIn' => false]);
        }
        jsonResponse(['success' => true, 'loggedIn' => true, 'user' => $user]);

    default:
        jsonResponse(['success' => false, 'message' => 'Unknown action.'], 400);
}