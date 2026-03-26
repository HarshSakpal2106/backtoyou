<?php

require_once __DIR__ . '/config.php';

header('Content-Type: application/json');

$action = $_POST['action'] ?? $_GET['action'] ?? '';

switch ($action) {

    // Get pets
    case 'get_pets':
        $category = $_GET['category'] ?? 'lost';
        if (!in_array($category, ['lost', 'found'])) {
            jsonResponse(['success' => false, 'message' => 'Invalid category.'], 400);
        }

        $db = getDB();

        // Where clause for filter
        $params = [$category];
        $where  = "pr.category = ? AND pr.is_reunited = 0";

        $name     = trim($_GET['name']     ?? '');
        $type     = trim($_GET['type']     ?? '');
        $gender   = trim($_GET['gender']   ?? '');
        $location = trim($_GET['location'] ?? '');

        if ($name !== '') {
            $where   .= " AND pr.name LIKE ?";
            $params[] = "%$name%";
        }
        if ($type !== '' && $type !== 'All') {
            $where   .= " AND pr.type = ?";
            $params[] = $type;
        }
        if ($gender !== '' && $gender !== 'All') {
            $where   .= " AND pr.gender = ?";
            $params[] = $gender;
        }
        if ($location !== '') {
            $where   .= " AND pr.location LIKE ?";
            $params[] = "%$location%";
        }

        $sql = "
            SELECT
                pr.id,
                pr.category,
                pr.name,
                pr.gender,
                pr.type,
                pr.breed,
                pr.location,
                pr.landmark        AS lastSeenLandmark,
                DATE_FORMAT(pr.date_reported, '%d-%m-%Y') AS date,
                pr.description,
                pr.image_url       AS image,
                u.email            AS reportedBy,
                pr.created_at
            FROM pet_reports pr
            JOIN users u ON u.id = pr.reported_by
            WHERE $where
            ORDER BY pr.created_at DESC
        ";

        $stmt = $db->prepare($sql);
        $stmt->execute($params);
        $pets = $stmt->fetchAll();

        jsonResponse(['success' => true, 'pets' => $pets]);

    // Submit report
    case 'submit_report':
        // Must be logged in
        if (empty($_SESSION['user_id'])) {
            jsonResponse(['success' => false, 'message' => 'You must be logged in to report a pet.'], 401);
        }

        $category = $_POST['category'] ?? '';
        if (!in_array($category, ['lost', 'found'])) {
            jsonResponse(['success' => false, 'message' => 'Invalid category.'], 400);
        }

        $name        = trim($_POST['pet_name']    ?? 'Unknown');
        $gender      = ucfirst(strtolower(trim($_POST['gender']      ?? 'Unknown')));
        $type        = ucfirst(strtolower(trim($_POST['animal_type'] ?? '')));
        $breed       = trim($_POST['breed']       ?? '') ?: null;
        $location    = trim($_POST['location']    ?? '');
        $landmark    = trim($_POST['landmark']    ?? '') ?: null;
        $dateRaw     = trim($_POST['date']        ?? '');
        $description = trim($_POST['description'] ?? '') ?: null;

        if (!$type || !$location || !$dateRaw) {
            jsonResponse(['success' => false, 'message' => 'Animal type, location, and date are required.'], 400);
        }

        // Validate date
        $dateObj = DateTime::createFromFormat('Y-m-d', $dateRaw);
        if (!$dateObj) {
            jsonResponse(['success' => false, 'message' => 'Invalid date format.'], 400);
        }
        $date = $dateObj->format('Y-m-d');

        // Upload image to cloudinary
        $imageUrl = null;
        if (!empty($_FILES['image']['tmp_name'])) {
            $imageUrl = uploadToCloudinary($_FILES['image']['tmp_name'], $_FILES['image']['name']);
        }

        $db   = getDB();
        $stmt = $db->prepare("
            INSERT INTO pet_reports
                (category, name, gender, type, breed, location, landmark, date_reported, description, image_url, reported_by)
            VALUES
                (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        $stmt->execute([
            $category, $name, $gender, $type, $breed,
            $location, $landmark, $date, $description,
            $imageUrl, $_SESSION['user_id']
        ]);

        jsonResponse(['success' => true, 'message' => ucfirst($category) . ' pet reported successfully!']);

    // Mark as found button
    case 'mark_reunited':
        if (empty($_SESSION['user_id'])) {
            jsonResponse(['success' => false, 'message' => 'Not logged in.'], 401);
        }

        $petId = (int)($_POST['pet_id'] ?? 0);
        if (!$petId) {
            jsonResponse(['success' => false, 'message' => 'Invalid pet ID.'], 400);
        }

        $db = getDB();

        // Make sure the pet belongs to the logged-in user
        $stmt = $db->prepare("SELECT id FROM pet_reports WHERE id = ? AND reported_by = ?");
        $stmt->execute([$petId, $_SESSION['user_id']]);
        if (!$stmt->fetch()) {
            jsonResponse(['success' => false, 'message' => 'Report not found or you do not own it.'], 403);
        }

        $stmt = $db->prepare("UPDATE pet_reports SET is_reunited = 1 WHERE id = ?");
        $stmt->execute([$petId]);

        jsonResponse(['success' => true]);

    // User reported pets to display on accounts page
    case 'my_reports':
        if (empty($_SESSION['user_id'])) {
            jsonResponse(['success' => false, 'message' => 'Not logged in.'], 401);
        }

        $db   = getDB();
        $stmt = $db->prepare("
            SELECT
                id,
                category,
                name,
                type,
                DATE_FORMAT(date_reported, '%d-%m-%Y') AS date
            FROM pet_reports
            WHERE reported_by = ? AND is_reunited = 0
            ORDER BY created_at DESC
        ");
        $stmt->execute([$_SESSION['user_id']]);
        $reports = $stmt->fetchAll();

        $lost  = array_filter($reports, fn($r) => $r['category'] === 'lost');
        $found = array_filter($reports, fn($r) => $r['category'] === 'found');

        jsonResponse([
            'success' => true,
            'lost'    => array_values($lost),
            'found'   => array_values($found),
        ]);

    default:
        jsonResponse(['success' => false, 'message' => 'Unknown action.'], 400);
}

// Cloudinary Upload
function uploadToCloudinary(string $filePath, string $fileName): ?string {
    $timestamp  = time();
    $apiKey     = CLOUDINARY_API_KEY;
    $apiSecret  = CLOUDINARY_API_SECRET;
    $cloudName  = CLOUDINARY_CLOUD_NAME;

    $paramsToSign = "timestamp=$timestamp";
    $signature    = sha1($paramsToSign . $apiSecret);

    $url = "https://api.cloudinary.com/v1_1/$cloudName/image/upload";

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST           => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_POSTFIELDS     => [
            'file'      => new CURLFile($filePath, mime_content_type($filePath), $fileName),
            'api_key'   => $apiKey,
            'timestamp' => $timestamp,
            'signature' => $signature,
        ],
    ]);

    $response = curl_exec($ch);
    $err      = curl_error($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    file_put_contents(
        __DIR__ . '/cloudinary_debug.txt',
        date('Y-m-d H:i:s') . "\n" .
        "HTTP Code: $httpCode\n" .
        "cURL Error: $err\n" .
        "Response: $response\n\n",
        FILE_APPEND
    );

    if ($err || !$response) return null;

    $data = json_decode($response, true);
    return $data['secure_url'] ?? null;
}