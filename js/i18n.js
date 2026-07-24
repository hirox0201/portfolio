/* ============================================================
   語系設定（i18n）－中／英切換
   ============================================================
   這個檔案負責三件事：
   1) UI_I18N 字典：網站「固定文字」（導覽列、標題、按鈕、說明文字…）的中英對照
   2) 語言偵測：優先讀取使用者上次手動選擇的語言（存在 localStorage），
      沒有的話再看瀏覽器/系統語言設定（navigator.language）來決定預設語言：
        - 系統語言是中文（zh-TW / zh-Hant / zh-CN...）→ 預設中文
        - 其他語言 → 預設英文
      這個判斷方式比對 IP 定位更快、更準（不受 VPN／公司網路干擾），
      也不需要打任何第三方 API，沒有隱私疑慮。
   3) applyLang()：把 <html lang="">、所有 data-i18n / data-i18n-html 元素，
      以及語言切換鈕的樣式都套用成目前語言。

   ============================================================
   之後怎麼新增/修改文字？
   ============================================================
   A. 「固定文字」（例如按鈕、標題、說明）：
      1. 在下面 UI_I18N 裡新增一筆 key: { zh:"...", en:"..." }
      2. 到 index.html 對應的元素上加：
         - 純文字內容：data-i18n="key"
         - 內容含有 <b>／<em> 等標籤：data-i18n-html="key"

   B. 「作品資料」（graphicWorks、brand500Categories 等在 js/data.js 裡的內容）：
      title／desc／intro 這些欄位，可以：
      - 維持原本純文字字串 → 中英文都會顯示同一段（尚未翻譯，之後可以再補）
      - 改成 { zh:"...", en:"..." } 物件 → 會自動依目前語言切換
      判斷與取值都是透過下面的 t() 函式處理，data.js／main.js 不用另外寫判斷式。
   ============================================================ */

const UI_I18N = {
  // ---- 導覽列 / 選單 ----
  nav_video:        { zh:"影音動畫敘事", en:"Video & Animation" },
  nav_about:        { zh:"わたくし",     en:"About" },
  menu_toggle_aria: { zh:"開啟選單",     en:"Open menu" },

  // ---- Hero（首頁主視覺） ----
  hero_h1_html:  { zh:"設計，是把想法<br><em>清楚地</em>說出來。", en:"Design means putting ideas<br>into words, <em>clearly</em>." },
  hero_lead:     { zh:"十餘年新聞媒體與品牌視覺經驗，個人風格強烈，專長橫跨平面設計、UI／UX、動態影音與網頁敘事。相信簡潔的畫面，能承載最複雜的訊息。",
                   en:"Over a decade of experience in news media and brand visuals, with a strong personal style spanning graphic design, UI/UX, motion, and web storytelling. I believe a simple frame can carry the most complex message." },
  hero_tag1:     { zh:"平面設計", en:"Graphic Design" },
  hero_tag2:     { zh:"UI / UX ＆ 網頁設計", en:"UI / UX & Web Design" },
  hero_tag3:     { zh:"動畫影音設計 ＆ 腳本分鏡", en:"Motion Design & Storyboarding" },
  hero_btn_works:{ zh:"瀏覽作品集", en:"View My Work" },
  hero_scroll:   { zh:"向下滑動",   en:"Scroll down" },

  // ---- WORKS（作品分類） ----
  works_h2:    { zh:"作品鑑賞", en:"Selected Works" },
  cat1_desc:   { zh:"品牌識別、活動視覺、印刷刊物、隨手亂畫", en:"Brand identity, event visuals, print, and sketches" },
  cat2_desc:   { zh:"動畫、專題影片、腳本分鏡、故事敘事", en:"Animation, feature videos, storyboarding, narrative" },
  cat3_desc:   { zh:"AMP Stories、HTML5動畫網頁、long form網頁", en:"AMP Stories, HTML5 pages, long-form web features" },
  cat_arrow:   { zh:"進入瀏覽", en:"Explore" },

  // ---- About（わたくし） ----
  about_h2:            { zh:"わたくし", en:"About" },
  about_intro_h4:      { zh:"自己紹介", en:"Introduction" },
  about_bio:           { zh:"楊 殿宏（TIM YANG），1982年生，SOLOキャンプ40代おじさん。I人無誤、大叔級資深肥宅王者，日本旅遊超過四十趟，旅居醉酒有達2個月，主要出沒在東京和關東地區，熱愛露營、金屬類音樂，遊戲資歷從任天堂紅白機發售到現在PS5，有資訊前端工程背景、 SCA 烘豆師資格的 OUTDOOR LIFE 視覺專案管理師。",
                          en:"Tim Yang, born 1982, a solo-camping guy in his 40s. A confirmed introvert and lifelong nerd, I've traveled to Japan over forty times and once lived there (mostly drinking) for two months, based mainly around Tokyo and the Kanto region. I love camping and metal music, with a gaming history stretching from the NES to the PS5. With a front-end engineering background and an SCA coffee-roasting qualification, I'm a visual project manager for the outdoor-life lifestyle." },
  about_exp_h4:        { zh:"工作經驗", en:"Experience" },
  about_tl1_html:      { zh:"曾任職於 <b>NIKE</b>、<b>行政院新聞局</b>（現 行政院新聞傳播處）、<b>研華電子</b>、<b>北市府產發局台北花卉博覽會</b>，擔任設計工作。",
                          en:"Worked as a designer at <b>NIKE</b>, the <b>Government Information Office</b> (now the Department of Information Services, Executive Yuan), <b>Advantech</b>, and the <b>Taipei International Flora Expo</b> (Taipei City Government)." },
  about_tl2_html:      { zh:"進入《<b>聯合報 新媒體中心</b>》，擔任視覺設計師，工作為數位設計領域，並閒暇之餘短暫擔任專題記者，撰稿旅遊線專訪日本311大地震後的東北地區狀況。",
                          en:"Joined the <b>New Media Center of United Daily News</b> as a visual designer working in digital design, and briefly served as a feature reporter, covering the Tohoku region after Japan's 2011 earthquake." },
  about_tl3_html:      { zh:"進入《<b>東森新媒體 ETtoday</b>》擔任視覺設計師，2年後成立《<b>視覺設計中心</b>》，擔任中心主任，團隊人數為6人。",
                          en:"Joined <b>ETtoday (EBC New Media)</b> as a visual designer; two years later founded the <b>Visual Design Center</b> and led it as director with a team of six." },
  about_tl4_html:      { zh:"進入《<b>聯合線上 娛樂生活事業部 行銷中心</b>》500輯團隊擔任專案經理 Program Manager，負責視覺設計管理並兼任視覺設計師至今。",
                          en:"Joined the <b>UDN Lifestyle & Entertainment Marketing Center</b>'s 500輯 team as Program Manager, overseeing visual design management while continuing to work as a visual designer." },
  about_software_h4:   { zh:"使用軟體", en:"Software" },
  about_skill_h4:      { zh:"專長SKILL", en:"Skills" },
  about_skill1:        { zh:"平面設計", en:"Graphic Design" },
  about_skill2:        { zh:"UI / UX ＆ 網頁設計", en:"UI / UX & Web Design" },
  about_skill3:        { zh:"動畫影音設計製作 ＆ 腳本分鏡撰寫", en:"Motion Design & Storyboarding" },
  about_skill4:        { zh:"專案管理 ＆ 跨部門協作與溝通", en:"Project Management & Cross-team Collaboration" },
  about_contact_email: { zh:"聯絡信箱 ｜", en:"Email ｜" },

  // ---- Footer ----
  footer_copyright: { zh:"© 2026 TIM YANG — Visual Designer．站內圖片版權所有，未經同意請勿轉載使用",
                       en:"© 2026 TIM YANG — Visual Designer. All images on this site are copyrighted; please do not reproduce without permission." },

  // ---- 共用 ----
  back_btn: { zh:"返回上一頁", en:"Back" },

  // ---- Photographic 頁 ----
  graphic_page_title: { zh:"Photographic", en:"Photographic" },
  graphic_page_desc:  { zh:"多種風格、可可愛愛、口味任選。往下滑還會有《500輯》系列IP的心血作品。", en:"A mix of styles, from cute to serious — scroll down for the 500輯 series projects too." },
  graphic_sub1_h3:    { zh:"隨便畫畫，隨心所欲", en:"Sketches & Free Drawing" },
  graphic_sub1_hint:  { zh:"點圖放大瀏覽", en:"Click to enlarge" },
  special_project_eyebrow: { zh:"SPECIAL PROJECT", en:"SPECIAL PROJECT" },
  brand500_desc: { zh:"專為台灣新世代質感青年打造，飲食與生活風格內容專題，依主題分為以下四個系列。",
                   en:"A lifestyle and dining content brand for Taiwan's new generation, organized into the series below." },

  // ---- 影音動畫敘事 頁 ----
  video_page_desc: { zh:"點擊縮圖即可在原頁面直接放大播放，無需跳轉。", en:"Click a thumbnail to play it in place — no need to leave the page." },
  video_note: { zh:"以上動畫作品，從腳本撰寫、分鏡、幕後次要配音、角色人物繪製、動畫動態呈現皆由本人執行，其餘資料彙整、校對、幕後主要配音則由同仁一起處理。一部動畫製作時期從三周到一個月半不等。",
                en:"For the animations above, I handled the scriptwriting, storyboarding, secondary voice work, character illustration, and animation. Research, proofreading, and lead voice work were done together with colleagues. Each animation typically took three to six weeks to produce." },

  // ---- Infographic 頁 ----
  stories_page_desc: { zh:"各式新聞議題的專題專頁，涵蓋了各樣的互動式閱讀。圖表、插畫、影音等等。", en:"Feature pages on various news topics, covering interactive reading experiences — charts, illustration, video, and more." },
  amp_hint: { zh:"現稱為 Google Web Stories，主要針對手機以及平板等載具而發開設計，將圖片、影片、文字與互動元素結合，為網站帶來載入極速且極具視覺吸引力的行動閱讀體驗。點縮圖 → 原地以限動形式展開",
              en:"Now known as Google Web Stories — designed for mobile and tablet, combining images, video, text, and interactive elements for a fast-loading, visually striking mobile reading experience. Click a thumbnail to expand it in place." },
  html5_h3:  { zh:"HTML5動態互動式網頁", en:"Interactive HTML5 Pages" },
  html5_hint:{ zh:"取代FLASH的劃時代網頁的核心標準。點縮圖 → 原地開啟，每篇皆完全獨立、互不干擾",
               en:"The standard that succeeded Flash. Click a thumbnail to open it in place — each piece is fully independent." },
  longform_h3:{ zh:"專題long form網頁作品", en:"Long-form Feature Pages" },
  longform_hint:{ zh:"最常見的專題網頁格式，內含了圖表、圖片、HTML5動畫、影音。點縮圖 → 另開新分頁",
                  en:"The most common feature-page format, combining charts, images, HTML5 animation, and video. Click a thumbnail to open it in a new tab." },

  // ---- JS 動態產生內容用到的文字 ----
  gen_go_newtab:    { zh:"另開新分頁", en:"Open in new tab" },
  coming_soon:      { zh:"目前更新中，coming soon！もうすぐ。", en:"Coming soon — updating this section shortly." },
  soon_dot_title:   { zh:"準備中", en:"In progress" },
  loading_text:     { zh:"載入中…", en:"Loading…" },
  video_fallback:   { zh:"若無法播放，點此在 YouTube 直接觀看 →", en:"If playback fails, watch directly on YouTube →" },
  content_fallback: { zh:"若畫面空白，點此在新分頁開啟 →", en:"If the page appears blank, open it in a new tab →" },

  // ---- 語言切換鈕 ----
  lang_toggle_aria: { zh:"切換為 English", en:"Switch to 中文" },
};

/* ============ 語言偵測與狀態 ============ */
const LANG_STORAGE_KEY = 'siteLang';

function detectDefaultLang(){
  const saved = localStorage.getItem(LANG_STORAGE_KEY);
  if(saved === 'zh' || saved === 'en') return saved;

  // 沒有手動選擇過語言時，看瀏覽器/系統語言判斷（比對 IP 定位更快、更準、無隱私疑慮）
  const browserLangs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
  const isChinese = browserLangs.some(l => (l || '').toLowerCase().startsWith('zh'));
  return isChinese ? 'zh' : 'en';
}

let currentLang = detectDefaultLang();

/* t()：取得任何欄位（UI_I18N 的值，或 data.js 資料裡的 title/desc/intro 等欄位）在目前語言下該顯示的文字。
   - 傳入 { zh, en } 物件 → 回傳對應語言的值，缺漏時互相 fallback，避免開天窗
   - 傳入純文字字串 → 直接原樣回傳（代表這筆內容尚未提供翻譯，中英文先顯示同一段） */
function t(field){
  if(field && typeof field === 'object'){
    return field[currentLang] || field.zh || field.en || '';
  }
  return field == null ? '' : field;
}

/* tKey()：專門取 UI_I18N 字典裡的固定文字，key 打錯字時会在 console 提醒，方便除錯 */
function tKey(key){
  const entry = UI_I18N[key];
  if(!entry){ console.warn('[i18n] 找不到字典鍵值：', key); return ''; }
  return t(entry);
}

/* applyLang()：套用目前語言到畫面上所有靜態文字節點與 <html lang="">。
   動態產生的作品卡片（graphic-grid／brand500-container／video-grid…等）
   則由 main.js 的 renderAllDynamicContent() 重新渲染來套用語言，
   language toggle 時兩者都會被呼叫。 */
function applyLang(){
  document.documentElement.lang = currentLang === 'zh' ? 'zh-Hant' : 'en';

  document.querySelectorAll('[data-i18n]').forEach(el=>{
    el.textContent = tKey(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-html]').forEach(el=>{
    el.innerHTML = tKey(el.getAttribute('data-i18n-html'));
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(el=>{
    el.setAttribute('aria-label', tKey(el.getAttribute('data-i18n-aria')));
  });

  document.querySelectorAll('.lang-toggle').forEach(btn=>{
    btn.setAttribute('aria-label', tKey('lang_toggle_aria'));
    btn.querySelectorAll('[data-lang]').forEach(span=>{
      span.classList.toggle('active', span.getAttribute('data-lang') === currentLang);
    });
  });
}

/* setLang()：手動切換語言（由語言切換鈕觸發）。
   會記住選擇（localStorage），重新套用靜態文字，並請 main.js 重新渲染動態內容。 */
function setLang(lang){
  if(lang !== 'zh' && lang !== 'en') return;
  if(lang === currentLang) return;
  currentLang = lang;
  localStorage.setItem(LANG_STORAGE_KEY, lang);
  applyLang();
  if(typeof renderAllDynamicContent === 'function') renderAllDynamicContent();
  if(typeof trackGAEvent === 'function') trackGAEvent('lang_switch', { language: lang });
}

function initLangToggle(){
  document.querySelectorAll('.lang-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=> setLang(currentLang === 'zh' ? 'en' : 'zh'));
  });
}

// 先套用一次固定文字（頁面一開始就是正確語言，不會有中文閃一下才變英文的問題）
document.addEventListener('DOMContentLoaded', ()=>{
  applyLang();
  initLangToggle();
});
