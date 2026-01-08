<?php
$page_title = 'Settings';
$page_title_i18n = 'settings_title';
$active_page = 'admin_settings';
ob_start();
?>
<div class="grid cols-2">
  <div class="card">
    <h2 data-i18n="settings_title"></h2>
    <p data-i18n="settings_desc"></p>

    <div style="height:14px"></div>

    <div class="field">
      <label for="apiToken" data-i18n="settings_token_label"></label>
      <input id="apiToken" type="password" autocomplete="off" placeholder="" />
      <div class="muted" data-i18n="settings_token_help"></div>
    </div>

    <div style="height:12px"></div>

    <div class="field">
      <label for="langSelect" data-i18n="settings_lang_label"></label>
      <select id="langSelect">
        <option value="en">English</option>
        <option value="it">Italiano</option>
      </select>
      <div class="muted" data-i18n="settings_lang_help"></div>
    </div>

    <div style="height:14px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn" id="btnSaveSettings" data-i18n="common_save"></button>
      <span class="notice" id="settingsNotice" style="display:none"></span>
    </div>
  </div>

  <div class="card">
    <h2 data-i18n="settings_api_title"></h2>
    <p>
      <span class="badge">/api-extract-product-images.php</span>
      <span class="badge">/api-generate-blog.php</span>
      <span class="badge">/save-blog.php</span>
    </p>
    <div style="height:10px"></div>
    <div class="notice">
      <span data-i18n="settings_api_env_note"></span>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const tokenInput = document.getElementById('apiToken');
  const langSelect = document.getElementById('langSelect');
  const notice = document.getElementById('settingsNotice');

  tokenInput.value = AdminUI.getToken();
  langSelect.value = AdminUI.getLang();

  document.getElementById('btnSaveSettings').addEventListener('click', () => {
    AdminUI.setToken(tokenInput.value);
    AdminUI.setLang(langSelect.value);
    AdminUI.applyTranslations();

    notice.textContent = AdminUI.t('settings_saved');
    notice.style.display = 'inline-flex';
    setTimeout(() => { notice.style.display = 'none'; }, 1600);
  });
});
</script>
<?php
$page_content = ob_get_clean();
require __DIR__ . '/admin/_layout.php';
