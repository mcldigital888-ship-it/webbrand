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

function absolute_url($baseUrl, $maybeRelative) {
  $maybeRelative = trim($maybeRelative);
  if ($maybeRelative === '') return '';
  if (preg_match('#^https?://#i', $maybeRelative)) return $maybeRelative;
  if (str_starts_with($maybeRelative, '//')) {
    $p = parse_url($baseUrl);
    $scheme = isset($p['scheme']) ? $p['scheme'] : 'https';
    return $scheme . ':' . $maybeRelative;
  }

  $p = parse_url($baseUrl);
  if (!$p || !isset($p['scheme']) || !isset($p['host'])) return '';
  $scheme = $p['scheme'];
  $host = $p['host'];
  $port = isset($p['port']) ? ':' . $p['port'] : '';

  $path = isset($p['path']) ? $p['path'] : '/';
  $dir = preg_replace('#/[^/]*$#', '/', $path);

  if (str_starts_with($maybeRelative, '/')) {
    return $scheme . '://' . $host . $port . $maybeRelative;
  }
  return $scheme . '://' . $host . $port . $dir . $maybeRelative;
}

function fetch_url($url) {
  $ch = curl_init($url);
  curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_TIMEOUT => 20,
    CURLOPT_CONNECTTIMEOUT => 10,
    CURLOPT_USERAGENT => 'Mozilla/5.0 (compatible; AutoBlog/1.0)'
  ]);
  $body = curl_exec($ch);
  $err = curl_error($ch);
  $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  curl_close($ch);
  if ($body === false || $code >= 400) {
    return [null, $err ?: ('HTTP ' . $code)];
  }
  return [$body, null];
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  respond(405, ['error' => 'Method not allowed']);
}
require_token_if_configured();

$body = read_json_body();
$productUrl = isset($body['product_url']) ? trim((string)$body['product_url']) : '';
if ($productUrl === '' || !preg_match('#^https?://#i', $productUrl)) {
  respond(400, ['error' => 'Invalid product_url']);
}

list($html, $err) = fetch_url($productUrl);
if ($err) {
  respond(400, ['error' => 'Failed to fetch product URL']);
}

libxml_use_internal_errors(true);
$dom = new DOMDocument();
$dom->loadHTML($html);
$imgs = $dom->getElementsByTagName('img');

$found = [];
foreach ($imgs as $img) {
  $src = '';
  if ($img->hasAttribute('src')) $src = $img->getAttribute('src');
  if ($src === '' && $img->hasAttribute('data-src')) $src = $img->getAttribute('data-src');
  if ($src === '') continue;
  $abs = absolute_url($productUrl, $src);
  if ($abs === '') continue;
  $found[] = $abs;
}

$found = array_values(array_unique($found));
$found = array_slice($found, 0, 24);

respond(200, ['images' => $found]);
