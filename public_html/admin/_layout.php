<?php
// Shared layout for admin pages
if (!isset($page_title)) { $page_title = 'Webrrand'; }
if (!isset($active_page)) { $active_page = ''; }
if (!isset($page_content)) { $page_content = ''; }
if (!isset($page_title_i18n)) { $page_title_i18n = ''; }

function admin_nav_item($href, $key, $active_page) {
  $active = ($active_page === $key) ? 'active' : '';
  $labelKey = 'nav_' . $key;
  return '<a class="nav-item ' . $active . '" href="' . htmlspecialchars($href) . '" data-i18n="' . htmlspecialchars($labelKey) . '"></a>';
}
?>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title><?php echo htmlspecialchars($page_title); ?></title>
  <link rel="stylesheet" href="/admin/assets/admin.css" />
</head>
<body>
  <div class="app">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">W</div>
        <div class="brand-name">Webrrand</div>
      </div>
      <nav class="nav">
        <?php echo admin_nav_item('/admin-panel.php', 'admin_panel', $active_page); ?>
        <?php echo admin_nav_item('/dashboard.php', 'dashboard', $active_page); ?>
        <?php echo admin_nav_item('/crm.php', 'crm', $active_page); ?>
        <?php echo admin_nav_item('/automation-core.php', 'automation_core', $active_page); ?>
        <?php echo admin_nav_item('/admin-settings.php', 'admin_settings', $active_page); ?>
      </nav>
      <div class="sidebar-footer">
        <div class="muted" data-i18n="sidebar_footer"></div>
      </div>
    </aside>

    <div class="main">
      <header class="topbar">
        <div class="topbar-left">
          <button class="icon-btn" id="btnToggleSidebar" aria-label="Toggle menu">≡</button>
          <div class="page-title">
            <?php if (is_string($page_title_i18n) && $page_title_i18n !== ''): ?>
              <span data-i18n="<?php echo htmlspecialchars($page_title_i18n); ?>"></span>
            <?php else: ?>
              <?php echo htmlspecialchars($page_title); ?>
            <?php endif; ?>
          </div>
        </div>
        <div class="topbar-right">
          <div class="lang-switch" role="group" aria-label="Language">
            <button class="lang-btn" data-lang="en" id="langEN">EN</button>
            <button class="lang-btn" data-lang="it" id="langIT">IT</button>
          </div>
        </div>
      </header>

      <main class="content">
        <?php echo $page_content; ?>
      </main>
    </div>
  </div>

  <script src="/admin/assets/admin.js"></script>
</body>
</html>
