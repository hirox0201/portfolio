/* ============ 首頁背景模式切換 ============
   把下面這個值改成 'video'（影片）、'solid'（單色）或 'gradient'（漸層）就能切換首頁背景，
   其他程式碼都不用動：
   - 'video'    使用上面 hero-video-wrap 裡嵌入的影片
   - 'solid'    使用網站主色（紺色）當作單色背景
   - 'gradient' 使用紺色到水色的漸層背景
   三種模式下的文字顏色都已經處理好，不需要另外調整。 */
const HERO_BG_MODE = 'video';
const heroSection = document.querySelector('.hero');
const HERO_VIDEO_SRC = 'https://hirox0201.github.io/rainning_sakura/rainning_sakura.mp4';

/* applyHeroBg：真正決定「要不要載入影片」的地方。
   - 只有目前視窗寬度 >= 861px（桌機）時，才會動態幫 <video id="heroVideo"> 補上 <source> 並播放，
     手機／平板（860px 以下）完全不會建立 <source>，瀏覽器就不會有任何機會去下載或解碼影片，
     這是修正手機發熱問題的關鍵。
   - 如果之後想整個網站首頁都不要用影片背景，只要把最上面 HERO_BG_MODE 改成 'solid' 或 'gradient' 即可，
     這個函式會自動改套用對應的純色／漸層背景，且完全不會建立 <video> 的 <source>。 */
function applyHeroBg(){
  heroSection.classList.remove('hero-bg-video','hero-bg-solid','hero-bg-gradient');
  const isDesktopWidth = window.innerWidth >= 861;

  if(HERO_BG_MODE !== 'video'){
    heroSection.classList.add('hero-bg-' + HERO_BG_MODE);
    return;
  }

  // 不論手機或桌機，HERO_BG_MODE 為 'video' 時都套用 hero-bg-video，
  // 這只是負責「把 poster 靜態圖顯示出來」的樣式，本身不會下載或播放任何影片，
  // 所以手機也會正常看到 rainning_sakura.webp 這張圖當背景。
  heroSection.classList.add('hero-bg-video');
  const video = document.getElementById('heroVideo');

  if(isDesktopWidth){
    // 只有確認是桌機寬度，才動態補上 <source> 並播放，手機完全不會走到這一段
    if(video && !video.querySelector('source')){
      const source = document.createElement('source');
      source.src = HERO_VIDEO_SRC;
      source.type = 'video/mp4';
      video.appendChild(source);
      video.load();
      video.play().catch(()=>{ /* 部分瀏覽器需要互動才能自動播放，失敗時保持顯示 poster 即可 */ });
    }
  } else if(video && video.querySelector('source')){
    // 例如平板從橫式（桌機判定）轉回直式（手機判定）：移除已載入的影片來源並停止播放，
    // 讓畫面改回顯示 poster 靜態圖，避免手機端殘留影片播放
    video.pause();
    video.querySelectorAll('source').forEach(s=> s.remove());
    video.load();
  }
}
applyHeroBg();

// 螢幕從直式轉橫式、或視窗尺寸跨越 861px 門檻時（例如平板旋轉），重新判斷一次即可，
// 用簡單的 debounce 避免 resize 事件觸發過於頻繁造成額外負擔。
let heroBgResizeTimer = null;
window.addEventListener('resize', ()=>{
  clearTimeout(heroBgResizeTimer);
  heroBgResizeTimer = setTimeout(applyHeroBg, 300);
});

/* ============ 路由 / 頁面切換（含錨點 + 平滑捲動） ============ */
const routableIds = ['home','works','about','graphic','video','stories'];

function routeFromHash(){
  let hash = location.hash.replace('#','') || 'home';
  if(!routableIds.includes(hash)) hash = 'home';

  document.querySelectorAll('.nav-link').forEach(a=>a.classList.remove('active'));
  document.querySelectorAll('.nav-link[data-target="'+hash+'"]').forEach(a=>a.classList.add('active'));

  if(hash === 'graphic' || hash === 'video' || hash === 'stories'){
    showSubPage(hash);
  } else {
    showSubPage('home');
    // 回到首頁後，平滑捲動到對應錨點區塊
    requestAnimationFrame(()=>{
      const el = document.getElementById(hash === 'home' ? 'home' : hash);
      if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
    });
  }
}

function showSubPage(name){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById('page-'+name).classList.add('active');
  if(name !== 'home') window.scrollTo({top:0});
}

/* ============ GA4 自訂事件追蹤 ============
   小工具函式：如果 gtag 已經載入（追蹤碼有正確安裝），就送出事件到 GA4；
   就算 Measurement ID 還沒換成正式的，也不會噴錯誤、不會影響網站正常功能。
   之後如果想再增加其他追蹤點，直接呼叫 trackGAEvent('事件名稱', {自訂參數}) 即可。
   （語言切換事件 lang_switch 是在 js/i18n.js 的 setLang() 裡呼叫的。） */
function trackGAEvent(eventName, params){
  if(typeof gtag === 'function'){
    gtag('event', eventName, params || {});
  }
}

/* GA4 追蹤：LinkedIn／Email 點擊（求職期間最重要的訊號 —— 有多少人看完作品後想聯絡你）。
   用「事件代理」的方式一次抓全站所有 LinkedIn 連結和 mailto 連結，不管放在 header、
   手機選單、關於我區塊、還是 footer，都不用個別加 onclick，之後網站上如果再新增
   LinkedIn／Email 連結，也會自動被抓到，不用再改這段程式碼。 */
document.addEventListener('click', (e)=>{
  const contactLink = e.target.closest('a[href^="mailto:"], a[href*="linkedin.com"]');
  if(contactLink){
    const isLinkedIn = contactLink.href.includes('linkedin.com');
    const location_area = contactLink.closest('header') ? 'header'
      : contactLink.closest('.mobile-drawer') ? 'mobile_menu'
      : contactLink.closest('#about') ? 'about_section'
      : contactLink.closest('footer') ? 'footer'
      : 'other';
    trackGAEvent('contact_click', {
      contact_type: isLinkedIn ? 'linkedin' : 'email',
      click_location: location_area
    });
  }
});

document.addEventListener('click', (e)=>{
  const link = e.target.closest('.nav-link');
  if(link){
    e.preventDefault();
    const target = link.getAttribute('data-target') || link.getAttribute('href').replace('#','');

    // GA4 追蹤：作品分類點擊。只追蹤三大作品分類（graphic／video／stories），
    // home／works／about 這些導覽點擊不算「瀏覽作品分類」所以不送事件。
    // 這裡的 category_name 固定用中文，方便 GA 後台的分類名稱不會因為使用者切換語言而分散成兩種標籤。
    const categoryNames = { graphic:'Photographic', video:'影音動畫敘事', stories:'Infographic' };
    if(categoryNames[target]){
      trackGAEvent('category_click', { category_key: target, category_name: categoryNames[target] });
    }

    if(location.hash === '#'+target){ routeFromHash(); }
    else{ location.hash = target; }
    closeMobileDrawer();
  }
});
window.addEventListener('hashchange', routeFromHash);
window.addEventListener('DOMContentLoaded', routeFromHash);

/* ============ 行動裝置漢堡選單 ============ */
function openMobileDrawer(){
  document.getElementById('menuToggle').classList.add('open');
  document.getElementById('mobileDrawer').classList.add('open');
  document.getElementById('mobileDrawerBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeMobileDrawer(){
  document.getElementById('menuToggle').classList.remove('open');
  document.getElementById('mobileDrawer').classList.remove('open');
  document.getElementById('mobileDrawerBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}
document.getElementById('menuToggle').addEventListener('click', ()=>{
  const isOpen = document.getElementById('mobileDrawer').classList.contains('open');
  if(isOpen) closeMobileDrawer(); else openMobileDrawer();
});
document.getElementById('mobileDrawerBackdrop').addEventListener('click', closeMobileDrawer);

/* ============================================================
   動態內容渲染
   ============================================================
   下面這些 render 函式，會在頁面第一次載入時執行一次，
   之後每次「切換語言」時（js/i18n.js 的 setLang()）也會整批重新執行一次，
   確保作品標題／圖說（如果資料裡有寫成 {zh,en} 雙語物件）能立即切換成對應語言。
   所有 container 在各自的 render 函式一開始都會先清空（innerHTML=''），
   所以重複呼叫不會造成卡片重複或殘留。
   ============================================================ */

/* ---- 共用：作品卡片渲染（含常駐圖說） ---- */
function renderWorkCard(container, item, group, index){
  const el = document.createElement('div');
  el.className = 'w-card';
  const title = t(item.title);
  el.innerHTML = `
    <div class="w-thumb"><img src="${item.img}" alt="${title}"></div>
    <div class="w-info">
      <div class="wt">${title}</div>
      <div class="wd">${t(item.desc) || ''}</div>
      <div class="wy">${item.year || ''}</div>
    </div>`;
  el.onclick = ()=> openLightbox(group, index);
  container.appendChild(el);
}

/* ---- 平面設計作品（不分類） ---- */
function renderGraphicGrid(){
  const graphicGrid = document.getElementById('graphic-grid');
  if(!graphicGrid) return;
  graphicGrid.innerHTML = '';
  graphicWorks.forEach((w, i)=> renderWorkCard(graphicGrid, w, graphicWorks, i));
}

/* ---- 500輯（六個子分類，各自獨立） ----
   分成兩種呈現方式，依每個分類的資料格式自動判斷：
   - type:'projects' 的分類（目前只有「500輯商業合作案」）→ 以個案為單位獨立呈現，見下面「分類類型 A」
   - 其餘分類（500碗／500趴／500盤／500甜／500Young）→ 維持年份頁籤＋格線，見下面「分類類型 B」 */
function renderBrand500(){
  const brand500Container = document.getElementById('brand500-container');
  if(!brand500Container) return;
  brand500Container.innerHTML = '';

  brand500Categories.forEach(cat=>{

    // ============ 分類類型 A：「商業合作案」這種以個案為單位的分類 ============
    // 每個合作案（cat.projects 裡的每一筆）各自獨立一個區塊：自己的標題／簡介／作品格線，
    // 案子之間完全不共用格線，所以有些案子只有1張作品、有些有10幾張作品都不會互相影響版面。
    if(cat.type === 'projects'){
      const block = document.createElement('div');
      block.className = 'brand500-cat';
      block.innerHTML = `
        <div class="sub-head">
          <h3>${cat.name}</h3>
          <p>${t(cat.intro)}</p>
        </div>
        <div class="biz-projects" id="biz-${cat.key}"></div>`;
      brand500Container.appendChild(block);

      const wrap = block.querySelector('#biz-' + cat.key);
      cat.projects.forEach(proj=>{
        const projEl = document.createElement('div');
        projEl.className = 'biz-project';
        const projDesc = t(proj.desc);
        projEl.innerHTML = `
          <div class="biz-project-head">
            <h4>${t(proj.title)}<span class="biz-project-year">${proj.year || ''}</span></h4>
            ${projDesc ? `<p>${projDesc}</p>` : ''}
          </div>
          <div class="w-grid"></div>`;
        wrap.appendChild(projEl);
        const projGrid = projEl.querySelector('.w-grid');
        proj.items.forEach((item, i)=> renderWorkCard(projGrid, item, proj.items, i));
      });
      return; // 這個分類處理完畢，不執行下面「年份頁籤」那一套邏輯
    }

    // ============ 分類類型 B：其餘 500輯 分類（500碗／500趴／500盤／500甜／500Young）============
    // 這些維持原本「年份頁籤＋格線」的呈現方式。
    //
    // 每個分類底下的年份分頁按鈕，只會控制「自己這個分類」要顯示哪個年份的作品，
    // 跟其他分類的分頁按鈕完全獨立、互不影響。
    //
    // 年份頁籤的「先後順序」由每個分類的 yearOrder 陣列決定（見上面 brand500Categories），
    // 想調整某個分類的年份排列順序，直接去改那個分類的 yearOrder 陣列順序即可，
    // 不需要更動這段渲染邏輯。如果 yearOrder 忘記加進某個新年份，
    // 畫面仍會自動把它排到最後面（由新到舊），不會漏掉、也不會壞掉。
    //
    // 日後要新增/調整作品，只要在 brand500Categories 該分類的 items 裡調整每個項目的
    // year 欄位即可，分頁按鈕會自動依資料裡出現過的年份產生。

    // 這個分類實際擁有的年份
    const existingYears = [...new Set(cat.items.map(it=>it.year))];
    // 依 yearOrder 指定的順序排列；yearOrder 裡沒提到的年份，自動排到最後面（由新到舊）
    const orderedYears = (cat.yearOrder || []).filter(y=> existingYears.includes(y));
    const leftoverYears = existingYears.filter(y=> !orderedYears.includes(y)).sort((a,b)=> b.localeCompare(a));
    const years = [...orderedYears, ...leftoverYears];

    const soonList = comingSoonYears[cat.key] || [];

    const block = document.createElement('div');
    block.className = 'brand500-cat';
    block.innerHTML = `
      <div class="sub-head">
        <h3>${cat.name}</h3>
        <p>${t(cat.intro)}</p>
      </div>
      <div class="year-tabs" id="tabs-${cat.key}">
        ${years.map((y,i)=> `<button type="button" class="year-tab${i===0 ? ' active' : ''}" data-year="${y}">${y}${soonList.includes(y) ? ` <span class="soon-dot" title="${tKey('soon_dot_title')}"></span>` : ''}</button>`).join('')}
      </div>
      <div class="w-grid" id="brand500-${cat.key}"></div>`;
    brand500Container.appendChild(block);

    const catGrid = block.querySelector('#brand500-' + cat.key);
    const tabsWrap = block.querySelector('#tabs-' + cat.key);

    const renderYear = (year)=>{
      catGrid.innerHTML = '';
      // 若這個分類＋年份組合被列在 comingSoonYears 裡，直接顯示提示文字、不渲染作品卡片
      if(soonList.includes(year)){
        catGrid.innerHTML = `<div class="coming-soon">${tKey('coming_soon')}</div>`;
        return;
      }
      const filtered = cat.items.filter(it=> it.year === year);
      filtered.forEach((item, i)=> renderWorkCard(catGrid, item, filtered, i));
    };

    tabsWrap.querySelectorAll('.year-tab').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        tabsWrap.querySelectorAll('.year-tab').forEach(b=> b.classList.remove('active'));
        btn.classList.add('active');
        renderYear(btn.dataset.year);
      });
    });

    renderYear(years[0]); // 預設顯示最新年份
  });
}

/* ---- 影音作品 ---- */
function renderVideoGrid(){
  const videoGrid = document.getElementById('video-grid');
  if(!videoGrid) return;
  videoGrid.innerHTML = '';
  videoWorks.forEach(v=>{
    const el = document.createElement('div');
    el.className = 'v-item';
    const title = t(v.title);
    el.innerHTML = `
      <div class="v-thumb">
        <img src="https://img.youtube.com/vi/${v.ytid}/hqdefault.jpg" alt="${title}">
        <div class="play-btn"><svg viewBox="0 0 24 24" fill="#17324D"><path d="M8 5v14l11-7z"/></svg></div>
      </div>
      <div class="v-meta"><div class="vt">${title}</div><div class="vd">${t(v.desc)}</div></div>`;
    el.onclick = ()=> openVideo(v.ytid);
    videoGrid.appendChild(el);
  });
}

// 修正 YouTube 錯誤 153：改用 youtube-nocookie 網域、關閉 origin 檢查造成的問題，
// 並將 iframe 的 referrerpolicy 設為 "origin"，避免在沙盒環境中因無有效 referrer 而被拒絕播放。
function openVideo(id){
  const wrap = document.getElementById('videoFrameWrap');
  let originParam = '';
  try{
    if(window.location.origin && window.location.origin !== 'null'){
      originParam = '&origin=' + encodeURIComponent(window.location.origin);
    }
  }catch(e){}
  wrap.innerHTML = `<iframe
      src="https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3&enablejsapi=1${originParam}"
      title="video player"
      referrerpolicy="unsafe-url"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen></iframe>
      <a class="video-fallback-link" href="https://www.youtube.com/watch?v=${id}" target="_blank" rel="noopener">${tKey('video_fallback')}</a>`;
  document.getElementById('videoModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeVideo(){
  document.getElementById('videoModal').classList.remove('open');
  document.getElementById('videoFrameWrap').innerHTML = '';
  document.body.style.overflow = '';
}
document.getElementById('videoModal').addEventListener('click', e=>{
  if(e.target.id === 'videoModal') closeVideo();
});

/* ---- AMP Stories（每一篇獨立卡片，各自獨立開啟，無左右切換） ---- */
function renderAmpGrid(){
  const ampGrid = document.getElementById('amp-grid');
  if(!ampGrid) return;
  ampGrid.innerHTML = '';
  ampStories.forEach(s=>{
    const el = document.createElement('div');
    el.className = 'amp-card';
    const title = t(s.title);
    el.innerHTML = `
      <div class="amp-ring">
        <div class="amp-inner">
          <img class="amp-cover" src="${s.img}" alt="${title}">
          <div class="amp-play"><svg viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg></div>
        </div>
      </div>
      <div class="amp-info">
        <div class="amp-t">${title}</div>
        <div class="amp-label">AMP STORY</div>
      </div>`;
    el.onclick = ()=>{
      // GA4 追蹤：AMP Story 點擊（含標題與網址，方便在 GA 後台看出哪一篇最受歡迎）
      trackGAEvent('interactive_work_click', { work_type:'amp_story', work_title:title, work_url:s.url });
      openContent(s.url, {shape:'portrait'});
    };
    ampGrid.appendChild(el);
  });
}

/* ---- 互動作品（2014世界盃，3篇皆各自獨立） ---- */
function renderFeatureContainer(){
  const featureContainer = document.getElementById('feature-container');
  if(!featureContainer) return;
  featureContainer.innerHTML = '';

  // 2014世界盃：一組標題下方放 3 張獨立卡片，點哪張只會開啟那一篇，互不干擾
  const wcGroup = document.createElement('div');
  wcGroup.className = 'feature-group';
  wcGroup.innerHTML = `
    <div class="feature-group-head">
      <h4>${t(worldCup2014.title)}</h4>
      <p>${t(worldCup2014.intro)}　<a href="${worldCup2014.repoUrl}" target="_blank" rel="noopener"></a></p>
    </div>
    <div class="feature-mini-grid" id="wc2014-grid"></div>`;
  featureContainer.appendChild(wcGroup);
  const wcGrid = wcGroup.querySelector('#wc2014-grid');
  worldCup2014.pages.forEach(p=>{
    const el = document.createElement('div');
    el.className = 'feature-mini-card';
    const pTitle = t(p.title);
    el.innerHTML = `
      <div class="feature-mini-thumb">
        <img src="${p.img}" alt="${pTitle}">
        <div class="feature-mini-play"><svg viewBox="0 0 24 24" fill="#17324D"><path d="M8 5v14l11-7z"/></svg></div>
      </div>
      <div class="feature-mini-info"><div class="fmt">${pTitle}</div><div class="fmd">${t(p.desc)}</div></div>`;
    el.onclick = ()=>{
      // GA4 追蹤：HTML5 互動作品點擊（同時記錄屬於哪一組系列＋這一篇的標題，方便後台區分）
      trackGAEvent('interactive_work_click', { work_type:'html5_interactive', work_series:t(worldCup2014.title), work_title:pTitle, work_url:p.url });
      openContent(p.url, {shape:'landscape', native:p.native, mobilePortrait:true});
    };
    wcGrid.appendChild(el);
  });
}

/* ---- 一般網頁作品（另開新分頁） ---- */
function renderGeneralGrid(){
  const generalGrid = document.getElementById('general-grid');
  if(!generalGrid) return;
  generalGrid.innerHTML = '';
  generalWorks.forEach(g=>{
    const el = document.createElement('a');
    el.className = 'gen-item';
    el.href = g.url;
    el.target = '_blank';
    el.rel = 'noopener';
    const title = t(g.title);
    el.innerHTML = `
      <div class="gen-thumb"><img src="${g.img}" alt="${title}"></div>
      <div class="gen-info">
        <div class="gen-title">${title}</div>
        <div class="gen-go">${tKey('gen_go_newtab')} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M7 17L17 7M9 7h8v8"/></svg></div>
      </div>`;
    el.onclick = ()=>{
      // GA4 追蹤：long form 網頁作品點擊（新分頁開啟，不影響原本的跳轉行為）
      trackGAEvent('interactive_work_click', { work_type:'longform_webpage', work_title:title, work_url:g.url });
    };
    generalGrid.appendChild(el);
  });
}

/* renderAllDynamicContent()：把上面所有動態區塊一次全部（重新）渲染。
   頁面第一次載入時呼叫一次；之後每次語言切換時（js/i18n.js 的 setLang()）也會再呼叫一次，
   讓所有作品卡片的標題／圖說即時套用新語言。 */
function renderAllDynamicContent(){
  renderGraphicGrid();
  renderBrand500();
  renderVideoGrid();
  renderAmpGrid();
  renderFeatureContainer();
  renderGeneralGrid();
}
renderAllDynamicContent();

/* ============ Lightbox 邏輯（支援多組作品群組，僅在同一分類內切換上一張／下一張） ============ */
let lbGroup = graphicWorks;
let lbIndex = 0;
function openLightbox(group, index){
  lbGroup = group;
  lbIndex = index;
  renderLightbox();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function renderLightbox(){
  const w = lbGroup[lbIndex];
  const title = t(w.title);
  document.getElementById('lightbox-img-tag').src = w.img;
  document.getElementById('lightbox-img-tag').alt = title;
  document.getElementById('lightbox-title').textContent = title;
  document.getElementById('lightbox-year').textContent = [w.year, t(w.desc)].filter(Boolean).join(' ｜ ');
}
function navLightbox(dir){
  lbIndex = (lbIndex + dir + lbGroup.length) % lbGroup.length;
  renderLightbox();
}
function closeLightbox(){ document.getElementById('lightbox').classList.remove('open'); document.body.style.overflow = ''; }
document.getElementById('lightbox').addEventListener('click', e=>{
  if(e.target.id === 'lightbox') closeLightbox();
});

/* 燈箱觸控滑動切換（左右滑動看上一張／下一張），不會自動播放，純手勢觸發 */
(function(){
  const lb = document.getElementById('lightbox');
  let touchStartX = 0, touchStartY = 0, touchActive = false;
  lb.addEventListener('touchstart', e=>{
    if(e.touches.length !== 1) return;
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    touchActive = true;
  }, { passive:true });
  lb.addEventListener('touchend', e=>{
    if(!touchActive) return;
    touchActive = false;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    // 水平滑動距離明顯大於垂直滑動，且超過門檻值，才判定為切換手勢（避免誤觸垂直滑動）
    if(Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy) * 1.5){
      navLightbox(dx < 0 ? 1 : -1);
    }
  }, { passive:true });
})();

/* ============ 通用內容 Modal 邏輯（AMP Stories／互動作品 共用） ============
   每次呼叫 openContent() 都只會載入「這一個」網址，彼此完全獨立：
   - 沒有上一篇／下一篇切換
   - 沒有自動輪播
   - 關閉後會把 iframe 完全卸載，下次打開別篇也不會殘留上一篇的畫面
   日後新增項目，只要照同樣方式呼叫 openContent(url, {shape:'portrait'|'landscape', native:{w,h}})，
   同樣會維持各自獨立，不會被合併或互相干擾。

   native:{w,h} 是給「固定尺寸、沒有 RWD」的舊版 HTML5（Adobe Edge Animate）作品用的：
   會以「符合裝置寬度、方便閱讀」的比例完整呈現，不額外提供縮放按鈕，介面越簡單越好；
   如果內容比視窗高，直接用捲動（滑鼠滾輪／觸控滑動）瀏覽其餘部分即可，iframe 本身完全
   保持可互動（可以正常點擊裡面的遊戲、按鈕），不會被檢視器擋掉。

   mobilePortrait:true 是給「原始設計為直式（例如 iPad 直式）」的作品用的：
   在手機瀏覽時會自動改用直式（9:16 比例）的畫面框呈現，桌機則維持原本較寬的畫面框
   （桌機螢幕夠大，維持原樣即可）。
============================================================ */
let contentResizeHandler = null;

function openContent(url, opts){
  opts = opts || {};
  const stage = document.getElementById('contentStage');
  stage.style.width = '';
  stage.style.height = '';
  if(contentResizeHandler){ window.removeEventListener('resize', contentResizeHandler); contentResizeHandler = null; }

  // 鎖定背景頁面捲動，避免手機上出現「拖到彈窗卻滑動背景」的卡頓感
  document.body.style.overflow = 'hidden';

  // 手機瀏覽且標記為 mobilePortrait 的作品：改用直式畫面框
  const isMobile = window.innerWidth < 700;
  const shape = (opts.mobilePortrait && isMobile) ? 'portrait' : (opts.shape === 'portrait' ? 'portrait' : 'landscape');
  stage.className = 'content-stage ' + shape;

  const wrap = document.getElementById('contentFrameWrap');
  const isNative = !!(opts.native && opts.native.w && opts.native.h);
  const iframeTag = `<iframe id="contentIframe" src="${url}" referrerpolicy="origin" style="opacity:0" allowfullscreen title="content"></iframe>`;

  // 固定尺寸 HTML5 作品（native）：iframe 包在可縮放／可捲動的畫布裡，交給 setupNativeViewport() 處理。
  // 一般內容（AMP Stories 等）：單純 iframe，本身已具備 RWD；直式作品額外加左右邊緣提示箭頭。
  const middleHtml = isNative
    ? `<div class="content-viewport" id="contentViewport"><div class="content-canvas" id="contentCanvas">${iframeTag}</div></div>`
    : iframeTag + (shape === 'portrait' ? `
      <div class="content-edge-hint left"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M15 18l-6-6 6-6"/></svg></div>
      <div class="content-edge-hint right"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18l6-6-6-6"/></svg></div>` : '');

  wrap.innerHTML = `
    <div class="content-loading" id="contentLoading">
      <div class="content-spinner"></div>
      <span>${tKey('loading_text')}</span>
    </div>
    ${middleHtml}
    <a class="content-fallback-link" href="${url}" target="_blank" rel="noopener">${tKey('content_fallback')}</a>`;
  document.getElementById('contentModal').classList.add('open');

  const iframe = document.getElementById('contentIframe');
  const loading = document.getElementById('contentLoading');
  iframe.addEventListener('load', ()=>{
    if(loading) loading.style.opacity = '0';
    iframe.style.opacity = '1';
    setTimeout(()=>{ if(loading) loading.remove(); }, 400);
  });

  if(isNative) setupNativeViewport(opts.native.w, opts.native.h, shape);
}

function setupNativeViewport(nativeW, nativeH, shape){
  const stage = document.getElementById('contentStage');
  const canvas = document.getElementById('contentCanvas');
  const iframe = document.getElementById('contentIframe');

  const fitToDevice = ()=>{
    const isPortraitStage = shape === 'portrait';
    const maxW = isPortraitStage
      ? Math.min(window.innerWidth * 0.94, 420)
      : Math.min(window.innerWidth * (window.innerWidth < 640 ? 0.98 : 0.94), 1200);
    const maxH = isPortraitStage
      ? Math.min(window.innerHeight * 0.9, 880)
      : Math.min(window.innerHeight * (window.innerWidth < 640 ? 0.9 : 0.86), 760);

    // 以「符合裝置寬度」為基準縮放，讓內容盡量放大到方便閱讀
    const scale = Math.min(Math.max(maxW / nativeW, 0.3), 1.4);
    const canvasW = nativeW * scale;
    const canvasH = nativeH * scale;

    // 畫面框「貼合實際內容尺寸」，不要留下多餘留白：
    // 寬／高只要小於上限，就直接用內容本身的尺寸，超過上限才用捲動瀏覽其餘部分
    stage.style.width = Math.min(canvasW, maxW) + 'px';
    stage.style.height = Math.min(canvasH, maxH) + 'px';

    canvas.style.width = canvasW + 'px';
    canvas.style.height = canvasH + 'px';
    iframe.style.width = nativeW + 'px';
    iframe.style.height = nativeH + 'px';
    iframe.style.transform = 'scale(' + scale + ')';
    iframe.style.transformOrigin = 'top left';
  };

  fitToDevice();
  contentResizeHandler = fitToDevice;
  window.addEventListener('resize', contentResizeHandler);
}

function closeContent(){
  document.getElementById('contentModal').classList.remove('open');
  document.body.style.overflow = '';
  if(contentResizeHandler){
    window.removeEventListener('resize', contentResizeHandler);
    contentResizeHandler = null;
  }
  // 延遲卸載，讓關閉動畫先跑完，同時確保下次開別篇時是全新載入、不殘留內容
  setTimeout(()=>{ document.getElementById('contentFrameWrap').innerHTML = ''; }, 350);
}
document.getElementById('contentModal').addEventListener('click', e=>{
  if(e.target.id === 'contentModal') closeContent();
});

/* ============ 基本防盜圖 ============
   禁止對圖片點右鍵（擋掉「另存圖片」選單）與拖曳圖片，僅作用在 <img>，
   不影響文字選取、複製等其他正常操作。
   提醒：這只能擋掉多數隨手複製的行為，無法百分之百防止有心人透過開發者工具
   或畫面截圖取得圖片，最有效的做法還是上傳「網頁用低解析度版本」，
   原始高解析度檔案不要放到網站上。 ============ */
document.addEventListener('contextmenu', e=>{
  if(e.target.tagName === 'IMG') e.preventDefault();
});
document.addEventListener('dragstart', e=>{
  if(e.target.tagName === 'IMG') e.preventDefault();
});

/* ============ 鍵盤操作 ============ */
document.addEventListener('keydown', e=>{
  if(e.key === 'Escape'){ closeLightbox(); closeVideo(); closeContent(); }
  if(document.getElementById('lightbox').classList.contains('open')){
    if(e.key === 'ArrowLeft') navLightbox(-1);
    if(e.key === 'ArrowRight') navLightbox(1);
  }
});
