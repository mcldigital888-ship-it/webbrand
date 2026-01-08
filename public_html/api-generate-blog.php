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

function slugify($s) {
  $s = strtolower(trim($s));
  $s = preg_replace('/[^a-z0-9\s-]/', '', $s);
  $s = preg_replace('/\s+/', '-', $s);
  $s = preg_replace('/-+/', '-', $s);
  $s = trim($s, '-');
  return $s !== '' ? $s : 'post';
}

function openai_chat($apiKey, $model, $messages) {
  $payload = [
    'model' => $model,
    'messages' => $messages,
    'temperature' => 0.7
  ];

  $ch = curl_init('https://api.openai.com/v1/chat/completions');
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => [
      'Content-Type: application/json',
      'Authorization: Bearer ' . $apiKey
    ],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 60,
    CURLOPT_CONNECTTIMEOUT => 10
  ]);
  $resp = curl_exec($ch);
  $err = curl_error($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);

  if ($resp === false) {
    return [null, $err ?: 'Request failed'];
  }
  $data = json_decode($resp, true);
  if ($code >= 400) {
    $msg = isset($data['error']['message']) ? $data['error']['message'] : ('HTTP ' . $code);
    return [null, $msg];
  }
  return [$data, null];
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(405, ['error' => 'Method not allowed']);
}
require_token_if_configured();

$apiKey = getenv('OPENAI_API_KEY');
if ($apiKey === false || trim($apiKey) === '') {
  respond(500, ['error' => 'OPENAI_API_KEY is not configured on server']);
}

$body = read_json_body();
$productUrl = isset($body['product_url']) ? trim((string)$body['product_url']) : '';
$keywords = isset($body['keywords']) ? trim((string)$body['keywords']) : '';
$wordCount = isset($body['word_count']) ? (int)$body['word_count'] : 900;
$model = isset($body['model']) ? trim((string)$body['model']) : 'gpt-4o-mini';
$featuredImage = isset($body['featured_image_url']) ? trim((string)$body['featured_image_url']) : '';

if ($productUrl === '' || !preg_match('#^https?://#i', $productUrl)) {
  respond(400, ['error' => 'Invalid product_url']);
}
if ($keywords === '') {
  respond(400, ['error' => 'Invalid keywords']);
}
if ($wordCount < 300) $wordCount = 300;
if ($wordCount > 2500) $wordCount = 2500;

$system = "You are an expert SEO copywriter. Output must be valid JSON only (no markdown).";
$user = "Generate a blog post in English or Italian depending on the keywords language.\n\nConstraints:\n- Target word count: {$wordCount} (approx)\n- Use the product URL as reference: {$productUrl}\n- Keywords: {$keywords}\n- Return JSON with keys: title, slug, html\n- html must be a full HTML article body (no <html> or <body> tags). Use <h2> sections, short paragraphs, and bullet lists when useful.\n- If featured_image_url is provided, include it at the top as <img src=\"...\" alt=\"...\"> and reference it naturally.\n\nfeatured_image_url: {$featuredImage}\n";

$messages = [
  ['role' => 'system', 'content' => $system],
  ['role' => 'user', 'content' => $user]
];

list($data, $err) = openai_chat(trim($apiKey), $model, $messages);
if ($err) {
  respond(400, ['error' => $err]);
}

$content = $data['choices'][0]['message']['content'] ?? '';
$content = is_string($content) ? trim($content) : '';
if ($content === '') {
  respond(400, ['error' => 'Empty model response']);
}

$parsed = json_decode($content, true);
if (!is_array($parsed)) {
  respond(400, ['error' => 'Model did not return JSON']);
}

$title = isset($parsed['title']) ? trim((string)$parsed['title']) : '';
$slug = isset($parsed['slug']) ? trim((string)$parsed['slug']) : '';
$html = isset($parsed['html']) ? (string)$parsed['html'] : '';

if ($title === '') {
  respond(400, ['error' => 'Missing title']);
}
if ($slug === '') {
  $slug = slugify($title);
}
if ($html === '') {
  respond(400, ['error' => 'Missing html']);
}

respond(200, [
  'title' => $title,
  'slug' => $slug,
  'html' => $html
]);
