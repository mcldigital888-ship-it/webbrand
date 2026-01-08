<?php
$page_title = 'Dashboard';
$page_title_i18n = 'dashboard_title';
$active_page = 'dashboard';
ob_start();
?>
<div class="grid cols-3">
  <div class="card kpi">
    <div class="value">128</div>
    <div class="label" data-i18n="dashboard_kpi_1"></div>
  </div>
  <div class="card kpi">
    <div class="value">42</div>
    <div class="label" data-i18n="dashboard_kpi_2"></div>
  </div>
  <div class="card kpi">
    <div class="value">9</div>
    <div class="label" data-i18n="dashboard_kpi_3"></div>
  </div>
</div>

<div style="height:14px"></div>

<div class="card">
  <h2 data-i18n="dashboard_chart_placeholder"></h2>
  <p> </p>
  <div style="height:260px;border:1px dashed rgba(255,255,255,.16);border-radius:14px;display:grid;place-items:center;color:rgba(231,238,252,.55)">
    <div>—</div>
  </div>
</div>
<?php
$page_content = ob_get_clean();
require __DIR__ . '/admin/_layout.php';
