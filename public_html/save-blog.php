<?php
header('Content-Type: application/json; charset=utf-8');

function respond($code, $data) {
  http_response_code($code);
  echo json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
  exit;
}

function require_token_if_configured() {
  $required = getenv('API_SECRET_TOKEN');
  if ($required !== false && trim($required) !== '') {
    $k = isset($_GET['k']) ? (string)$_GET['k'] : '';
    if (!hash_equals(trim($required), trim($k))) {
      respond(403, ['error' => 'Forbidden']);
    }
  }
}

function read_json_body() {
  $raw = file_get_contents('php://input');
  if ($raw === false) return [];
  $data = json_decode($raw, true);
  return is_array($data) ? $data : [];
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(405, ['error' => 'Method not allowed']);
}
require_token_if_configured();

$body = read_json_body();
$title = isset($body['title']) ? trim((string)$body['title']) : '';
$slug = isset($body['slug']) ? trim((string)$body['slug']) : '';
$html = isset($body['html']) ? (string)$body['html'] : '';
$featuredImage = isset($body['featured_image_url']) ? trim((string)$body['featured_image_url']) : '';

if ($title === '' || $slug === '' || trim($html) === '') {
  respond(400, ['error' => 'Missing required fields']);
}

$post = [
  'id' => bin2hex(random_bytes(8)),
  'created_at' => gmdate('c'),
  'title' => $title,
  'slug' => $slug,
  'html' => $html,
  'featured_image_url' => $featuredImage,
  'meta' => [
    'source_product_url' => isset($body['source_product_url']) ? (string)$body['source_product_url'] : '',
    'keywords' => isset($body['keywords']) ? (string)$body['keywords'] : '',
    'model' => isset($body['model']) ? (string)$body['model'] : '',
    'word_count' => isset($body['word_count']) ? (int)$body['word_count'] : 0
  ]
];

$file = __DIR__ . '/blog_posts.json';

$fp = fopen($file, 'c+');
if ($fp === false) {
  respond(500, ['error' => 'Cannot open blog_posts.json']);
}

if (!flock($fp, LOCK_EX)) {
  fclose($fp);
  respond(500, ['error' => 'Cannot lock blog_posts.json']);
}

$existingRaw = stream_get_contents($fp);
$existing = json_decode($existingRaw ?: '[]', true);
if (!is_array($existing)) $existing = [];

array_unshift($existing, $post);

rewind($fp);
ftruncate($fp, 0);
$ok = fwrite($fp, json_encode($existing, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

if ($ok === false) {
  respond(500, ['error' => 'Failed to write blog_posts.json']);
}

respond(200, ['ok' => true, 'id' => $post['id']]);
