<?php
$page_title = 'CRM';
$page_title_i18n = 'crm_title';
$active_page = 'crm';
$rows = [
  ['name' => 'Alice Johnson', 'email' => 'alice@example.com', 'stage' => 'Lead'],
  ['name' => 'Marco Bianchi', 'email' => 'marco@example.com', 'stage' => 'Customer'],
  ['name' => 'Emily Smith', 'email' => 'emily@example.com', 'stage' => 'Lead'],
];
ob_start();
?>
<div class="card">
  <h2 data-i18n="crm_title"></h2>
  <p data-i18n="crm_desc"></p>

  <div style="height:12px"></div>

  <table class="table" id="crmTable">
    <thead>
      <tr>
        <th data-i18n="crm_name"></th>
        <th data-i18n="crm_email"></th>
        <th data-i18n="crm_stage"></th>
        <th data-i18n="common_actions"></th>
      </tr>
    </thead>
    <tbody>
      <?php foreach ($rows as $idx => $r): ?>
        <tr data-idx="<?php echo (int)$idx; ?>" data-name="<?php echo htmlspecialchars($r['name']); ?>" data-email="<?php echo htmlspecialchars($r['email']); ?>" data-stage="<?php echo htmlspecialchars($r['stage']); ?>">
          <td><?php echo htmlspecialchars($r['name']); ?></td>
          <td><?php echo htmlspecialchars($r['email']); ?></td>
          <td>
            <?php if ($r['stage'] === 'Customer'): ?>
              <span class="badge ok" data-i18n="crm_badge_customer"></span>
            <?php else: ?>
              <span class="badge warn" data-i18n="crm_badge_lead"></span>
            <?php endif; ?>
          </td>
          <td>
            <button class="btn secondary" data-action="open" data-i18n="crm_open"></button>
          </td>
        </tr>
      <?php endforeach; ?>
    </tbody>
  </table>
</div>

<div class="modal-backdrop" id="crmModalBackdrop" aria-hidden="true">
  <div class="modal" role="dialog" aria-modal="true">
    <div class="modal-header">
      <div class="modal-title" data-i18n="crm_modal_title"></div>
      <button class="modal-close" id="crmModalClose" aria-label="Close">×</button>
    </div>
    <div class="modal-body">
      <div class="grid cols-2">
        <div class="card" style="box-shadow:none">
          <h2 data-i18n="crm_name"></h2>
          <p id="crmModalName"></p>
        </div>
        <div class="card" style="box-shadow:none">
          <h2 data-i18n="crm_email"></h2>
          <p id="crmModalEmail"></p>
        </div>
      </div>
      <div style="height:10px"></div>
      <div class="card" style="box-shadow:none">
        <h2 data-i18n="crm_stage"></h2>
        <p id="crmModalStage"></p>
      </div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const backdrop = document.getElementById('crmModalBackdrop');
  const closeBtn = document.getElementById('crmModalClose');

  function openModal(row){
    document.getElementById('crmModalName').textContent = row.dataset.name || '';
    document.getElementById('crmModalEmail').textContent = row.dataset.email || '';
    document.getElementById('crmModalStage').textContent = row.dataset.stage || '';
    backdrop.style.display = 'flex';
    backdrop.setAttribute('aria-hidden', 'false');
  }

  function closeModal(){
    backdrop.style.display = 'none';
    backdrop.setAttribute('aria-hidden', 'true');
  }

  document.getElementById('crmTable').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action="open"]');
    if (!btn) return;
    const tr = btn.closest('tr');
    if (!tr) return;
    openModal(tr);
  });

  closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', (e) => {
    if (e.target === backdrop) closeModal();
  });
});
</script>
<?php
$page_content = ob_get_clean();
require __DIR__ . '/admin/_layout.php';
