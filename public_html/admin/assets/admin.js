(function(){
  const LS_LANG_KEY = 'admin_lang';
  const LS_TOKEN_KEY = 'admin_api_token';

  const dict = {
    en: {
      nav_admin_panel: 'Webrrand Home',
      nav_dashboard: 'Dashboard',
      nav_crm: 'CRM',
      nav_automation_core: 'Automation Core',
      nav_admin_settings: 'Settings',
      sidebar_footer: 'Webrrand panel UI (EN/IT).',

      common_save: 'Save',
      common_cancel: 'Cancel',
      common_close: 'Close',
      common_status: 'Status',
      common_actions: 'Actions',

      admin_home_title: 'Webrrand Home',
      admin_home_desc: 'Use the sidebar to navigate.',

      dashboard_title: 'Dashboard',
      dashboard_kpi_1: 'Leads',
      dashboard_kpi_2: 'Customers',
      dashboard_kpi_3: 'Posts',
      dashboard_chart_placeholder: 'Charts placeholder',

      crm_title: 'CRM',
      crm_desc: 'Leads / customers list (demo data).',
      crm_name: 'Name',
      crm_email: 'Email',
      crm_stage: 'Stage',
      crm_open: 'Open',
      crm_modal_title: 'Lead details',
      crm_badge_lead: 'Lead',
      crm_badge_customer: 'Customer',

      settings_title: 'Webrrand Settings',
      settings_desc: 'Client-side options (token and language).',
      settings_token_label: 'API secret token (optional)',
      settings_token_help: 'If the server requires a token, it will be sent as ?k=TOKEN for all API calls.',
      settings_lang_label: 'Interface language',
      settings_lang_help: 'This is stored in localStorage.',
      settings_saved: 'Saved.',
      settings_api_title: 'API',
      settings_api_env_note: 'OPENAI_API_KEY is read from server ENV.',

      automation_title: 'Automation Core',
      automation_desc: 'Generate a blog post from a product URL and keywords.',
      automation_product_url: 'Product URL',
      automation_keywords: 'Keywords',
      automation_word_count: 'Word count',
      automation_model: 'Model',
      automation_extract_images: 'Extract images',
      automation_generate_blog: 'Generate blog',
      automation_save: 'Save',
      automation_images: 'Images',
      automation_generated: 'Generated output',
      automation_selected_image: 'Selected image',
      automation_title_label: 'Title',
      automation_slug_label: 'Slug',
      automation_html_label: 'HTML',
      automation_tip: 'Select an image to use as the featured image. If none is selected, the system can auto-select.',

      api_ok: 'OK',
      api_error: 'Error'
    },
    it: {
      nav_admin_panel: 'Home Webrrand',
      nav_dashboard: 'Dashboard',
      nav_crm: 'CRM',
      nav_automation_core: 'Automation Core',
      nav_admin_settings: 'Impostazioni',
      sidebar_footer: 'Interfaccia Webrrand (EN/IT).',

      common_save: 'Salva',
      common_cancel: 'Annulla',
      common_close: 'Chiudi',
      common_status: 'Stato',
      common_actions: 'Azioni',

      admin_home_title: 'Home Webrrand',
      admin_home_desc: 'Usa la barra laterale per navigare.',

      dashboard_title: 'Dashboard',
      dashboard_kpi_1: 'Lead',
      dashboard_kpi_2: 'Clienti',
      dashboard_kpi_3: 'Post',
      dashboard_chart_placeholder: 'Segnaposto grafici',

      crm_title: 'CRM',
      crm_desc: 'Lista lead / clienti (dati demo).',
      crm_name: 'Nome',
      crm_email: 'Email',
      crm_stage: 'Fase',
      crm_open: 'Apri',
      crm_modal_title: 'Dettagli lead',
      crm_badge_lead: 'Lead',
      crm_badge_customer: 'Cliente',

      settings_title: 'Impostazioni Webrrand',
      settings_desc: 'Opzioni lato client (token e lingua).',
      settings_token_label: 'Token segreto API (opzionale)',
      settings_token_help: 'Se il server richiede un token, verrà inviato come ?k=TOKEN per tutte le chiamate API.',
      settings_lang_label: 'Lingua interfaccia',
      settings_lang_help: 'Viene salvata in localStorage.',
      settings_saved: 'Salvato.',
      settings_api_title: 'API',
      settings_api_env_note: 'OPENAI_API_KEY viene letto da ENV sul server.',

      automation_title: 'Automation Core',
      automation_desc: 'Genera un post del blog da un URL prodotto e parole chiave.',
      automation_product_url: 'URL prodotto',
      automation_keywords: 'Parole chiave',
      automation_word_count: 'Numero parole',
      automation_model: 'Modello',
      automation_extract_images: 'Estrai immagini',
      automation_generate_blog: 'Genera blog',
      automation_save: 'Salva',
      automation_images: 'Immagini',
      automation_generated: 'Output generato',
      automation_selected_image: 'Immagine selezionata',
      automation_title_label: 'Titolo',
      automation_slug_label: 'Slug',
      automation_html_label: 'HTML',
      automation_tip: 'Seleziona un’immagine da usare come immagine in evidenza. Se non selezioni nulla, il sistema può selezionare automaticamente.',

      api_ok: 'OK',
      api_error: 'Errore'
    }
  };

  function getLang(){
    const v = (localStorage.getItem(LS_LANG_KEY) || 'en').toLowerCase();
    return (v === 'it') ? 'it' : 'en';
  }

  function setLang(lang){
    const v = (lang === 'it') ? 'it' : 'en';
    localStorage.setItem(LS_LANG_KEY, v);
  }

  function t(key){
    const lang = getLang();
    return (dict[lang] && dict[lang][key]) || (dict.en[key] || key);
  }

  function applyTranslations(){
    document.documentElement.lang = getLang();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key));
    });

    const btnEN = document.getElementById('langEN');
    const btnIT = document.getElementById('langIT');
    if (btnEN && btnIT) {
      const lang = getLang();
      btnEN.classList.toggle('active', lang === 'en');
      btnIT.classList.toggle('active', lang === 'it');
    }
  }

  function getToken(){
    return (localStorage.getItem(LS_TOKEN_KEY) || '').trim();
  }

  function setToken(token){
    const v = (token || '').trim();
    if (v) localStorage.setItem(LS_TOKEN_KEY, v);
    else localStorage.removeItem(LS_TOKEN_KEY);
  }

  function withToken(url){
    const token = getToken();
    if (!token) return url;
    const hasQ = url.includes('?');
    return url + (hasQ ? '&' : '?') + 'k=' + encodeURIComponent(token);
  }

  async function apiFetch(url, opts){
    const finalUrl = withToken(url);
    const res = await fetch(finalUrl, Object.assign({
      headers: { 'Content-Type': 'application/json' }
    }, opts || {}));
    const ct = (res.headers.get('content-type') || '').toLowerCase();
    const body = ct.includes('application/json') ? await res.json() : await res.text();
    if (!res.ok) {
      const msg = (body && body.error) ? body.error : (typeof body === 'string' ? body : 'Request failed');
      throw new Error(msg);
    }
    return body;
  }

  function initTopbar(){
    const btnEN = document.getElementById('langEN');
    const btnIT = document.getElementById('langIT');
    if (btnEN) btnEN.addEventListener('click', () => { setLang('en'); applyTranslations(); });
    if (btnIT) btnIT.addEventListener('click', () => { setLang('it'); applyTranslations(); });

    const toggle = document.getElementById('btnToggleSidebar');
    if (toggle) {
      toggle.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-collapsed');
      });
    }
  }

  window.AdminUI = {
    t,
    getLang,
    setLang,
    applyTranslations,
    apiFetch,
    getToken,
    setToken,
    withToken
  };

  document.addEventListener('DOMContentLoaded', () => {
    initTopbar();
    applyTranslations();
  });
})();
