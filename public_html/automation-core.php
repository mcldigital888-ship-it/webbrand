<?php
$page_title = 'Automation Core';
$page_title_i18n = 'automation_title';
$active_page = 'automation_core';
ob_start();
?>
<div class="grid cols-2">
  <div class="card">
    <h2 data-i18n="automation_title"></h2>
    <p data-i18n="automation_desc"></p>

    <div style="height:14px"></div>

    <div class="field">
      <label for="productUrl" data-i18n="automation_product_url"></label>
      <input id="productUrl" type="url" placeholder="https://" />
    </div>

    <div style="height:12px"></div>

    <div class="field">
      <label for="keywords" data-i18n="automation_keywords"></label>
      <textarea id="keywords" placeholder=""></textarea>
    </div>

    <div style="height:12px"></div>

    <div class="form-row">
      <div class="field">
        <label for="wordCount" data-i18n="automation_word_count"></label>
        <input id="wordCount" type="number" min="300" step="50" value="900" />
      </div>
      <div class="field">
        <label for="model" data-i18n="automation_model"></label>
        <select id="model">
          <option value="gpt-4o-mini">gpt-4o-mini</option>
          <option value="gpt-4o">gpt-4o</option>
        </select>
      </div>
    </div>

    <div style="height:14px;display:flex;gap:10px;flex-wrap:wrap">
      <button class="btn secondary" id="btnExtract" data-i18n="automation_extract_images"></button>
      <button class="btn" id="btnGenerate" data-i18n="automation_generate_blog" disabled></button>
      <button class="btn" id="btnSave" data-i18n="automation_save" disabled></button>
    </div>

    <div style="height:12px"></div>
    <div class="notice" id="statusBox"><strong data-i18n="common_status"></strong>: <span id="statusText">—</span></div>
    <div style="height:10px"></div>
    <div class="muted" data-i18n="automation_tip"></div>
  </div>

  <div class="card">
    <h2 data-i18n="automation_images"></h2>
    <div id="imagesEmpty" class="notice">—</div>
    <div id="imageGrid" class="image-grid" style="display:none"></div>
  </div>
</div>

<div style="height:14px"></div>

<div class="card">
  <h2 data-i18n="automation_generated"></h2>
  <div class="form-row">
    <div class="field">
      <label for="outTitle" data-i18n="automation_title_label"></label>
      <input id="outTitle" type="text" />
    </div>
    <div class="field">
      <label for="outSlug" data-i18n="automation_slug_label"></label>
      <input id="outSlug" type="text" />
    </div>
  </div>
  <div style="height:12px"></div>
  <div class="field">
    <label for="outHtml" data-i18n="automation_html_label"></label>
    <textarea id="outHtml"></textarea>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const productUrl = document.getElementById('productUrl');
  const keywords = document.getElementById('keywords');
  const wordCount = document.getElementById('wordCount');
  const model = document.getElementById('model');

  const btnExtract = document.getElementById('btnExtract');
  const btnGenerate = document.getElementById('btnGenerate');
  const btnSave = document.getElementById('btnSave');

  const statusText = document.getElementById('statusText');
  const imagesEmpty = document.getElementById('imagesEmpty');
  const imageGrid = document.getElementById('imageGrid');

  const outTitle = document.getElementById('outTitle');
  const outSlug = document.getElementById('outSlug');
  const outHtml = document.getElementById('outHtml');

  let extractedImages = [];
  let selectedImage = '';
  let generated = null;

  function setStatus(text){ statusText.textContent = text; }

  function validateInputs(){
    const ok = (productUrl.value || '').trim().length > 8 && (keywords.value || '').trim().length > 0;
    btnExtract.disabled = !ok;
    btnGenerate.disabled = !ok || extractedImages.length === 0;
    btnSave.disabled = !generated;
  }

  function renderImages(){
    imageGrid.innerHTML = '';
    if (!extractedImages || extractedImages.length === 0) {
      imagesEmpty.style.display = 'block';
      imageGrid.style.display = 'none';
      return;
    }

    imagesEmpty.style.display = 'none';
    imageGrid.style.display = 'grid';

    extractedImages.forEach((url) => {
      const tile = document.createElement('div');
      tile.className = 'image-tile' + (url === selectedImage ? ' selected' : '');
      tile.dataset.url = url;
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.referrerPolicy = 'no-referrer';
      img.src = url;
      tile.appendChild(img);
      tile.addEventListener('click', () => {
        selectedImage = url;
        renderImages();
      });
      imageGrid.appendChild(tile);
    });

    if (!selectedImage) {
      selectedImage = extractedImages[0] || '';
      renderImages();
    }
  }

  async function extractImages(){
    setStatus('…');
    btnExtract.disabled = true;
    try {
      const payload = {
        product_url: (productUrl.value || '').trim(),
        keywords: (keywords.value || '').trim()
      };
      const res = await AdminUI.apiFetch('/api-extract-product-images.php', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      extractedImages = Array.isArray(res.images) ? res.images : [];
      selectedImage = '';
      renderImages();
      setStatus(AdminUI.t('api_ok'));
    } catch (e) {
      extractedImages = [];
      selectedImage = '';
      renderImages();
      setStatus(AdminUI.t('api_error') + ': ' + e.message);
    } finally {
      btnExtract.disabled = false;
      validateInputs();
    }
  }

  async function generateBlog(){
    setStatus('…');
    btnGenerate.disabled = true;
    try {
      const payload = {
        product_url: (productUrl.value || '').trim(),
        keywords: (keywords.value || '').trim(),
        word_count: Number(wordCount.value || 900),
        model: (model.value || 'gpt-4o-mini'),
        featured_image_url: selectedImage || ''
      };
      const res = await AdminUI.apiFetch('/api-generate-blog.php', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      generated = res;
      outTitle.value = res.title || '';
      outSlug.value = res.slug || '';
      outHtml.value = res.html || '';
      setStatus(AdminUI.t('api_ok'));
    } catch (e) {
      generated = null;
      setStatus(AdminUI.t('api_error') + ': ' + e.message);
    } finally {
      validateInputs();
    }
  }

  async function saveBlog(){
    setStatus('…');
    btnSave.disabled = true;
    try {
      const payload = {
        title: (outTitle.value || '').trim(),
        slug: (outSlug.value || '').trim(),
        html: (outHtml.value || '').trim(),
        featured_image_url: selectedImage || '',
        source_product_url: (productUrl.value || '').trim(),
        keywords: (keywords.value || '').trim(),
        model: (model.value || '').trim(),
        word_count: Number(wordCount.value || 0)
      };
      const res = await AdminUI.apiFetch('/save-blog.php', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      setStatus((res && res.ok) ? AdminUI.t('api_ok') : AdminUI.t('api_ok'));
    } catch (e) {
      setStatus(AdminUI.t('api_error') + ': ' + e.message);
    } finally {
      validateInputs();
    }
  }

  btnExtract.addEventListener('click', extractImages);
  btnGenerate.addEventListener('click', generateBlog);
  btnSave.addEventListener('click', saveBlog);

  [productUrl, keywords, wordCount, model].forEach(el => {
    el.addEventListener('input', validateInputs);
    el.addEventListener('change', validateInputs);
  });

  setStatus('—');
  validateInputs();
});
</script>
<?php
$page_content = ob_get_clean();
require __DIR__ . '/admin/_layout.php';
