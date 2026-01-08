<?php
$page_title = 'Webrrand Home';
$page_title_i18n = 'admin_home_title';
$active_page = 'admin_panel';
ob_start();
?>
<div class="grid cols-2">
  <div class="card">
    <h2 data-i18n="admin_home_title"></h2>
    <p data-i18n="admin_home_desc"></p>
  </div>

  <div class="card">
    <h2 data-i18n="automation_title"></h2>
    <p data-i18n="automation_desc"></p>
    <div style="margin-top:12px;display:flex;gap:10px;flex-wrap:wrap">
      <a class="btn" href="/automation-core.php" data-i18n="nav_automation_core"></a>
      <a class="btn secondary" href="/admin-settings.php" data-i18n="nav_admin_settings"></a>
    </div>
  </div>
</div>
<?php
$page_content = ob_get_clean();
require __DIR__ . '/admin/_layout.php';
