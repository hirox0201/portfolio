/* ============ 資料（請替換為您自己的作品） ============
   語系提醒：分類層級（500碗／500趴…等 intro、FIFA2014世界盃 title/intro、
   商業合作案 title/desc）已經是中英雙語 { zh, en } 物件，切換語言會自動生效。

   下面每一件單一作品的 title／desc（例如 graphicWorks 陣列裡的每一筆），
   目前先維持原本的純中文字串，中英文模式都會顯示同一段文字——這是刻意保留給你
   之後慢慢補上英文的空間，不用一次全部翻完。要翻譯某一筆時，把該筆的
   title 或 desc 從純字串改成 { zh:"中文...", en:"English..." } 物件即可，
   例如：
     title:"NIKE Cortez鞋款宣傳向量插畫"
   改成：
     title:{ zh:"NIKE Cortez鞋款宣傳向量插畫", en:"NIKE Cortez promo vector illustration" }
   畫面會自動判斷欄位是字串還是雙語物件，不用改任何渲染程式碼。 ============ */

// 平面設計作品（不分類）：把每一項的 img 換成你自己作品的圖片網址，desc 換成你自己的圖說即可
const graphicWorks = [
  {title:"NIKE Cortez鞋款宣傳向量插畫", year:"2008", desc:"應公司邀約繪製。", img:"images/nike_cortez.webp"},
  {title:"FIFA2014世界盃，手足球概念向量繪圖", year:"2014", desc:"《聯合報》2014 世界杯專題，手足球遊戲向量繪圖，專題就在「Infographic」。", img:"images/fifa2014.webp"},
  {title:"「星際大戰幼幼班 搞懂4色光劍」冷知識動畫向量繪圖", year:"2015", desc:"《聯合報》2015星際大戰光劍冷知識動畫專題向量繪圖，動畫就在「影音動畫敘事」。", img:"images/2015starwars.webp"},
  {title:"「耶誕叮叮噹，馴鹿？麋鹿？」冷知識動畫向量繪圖", year:"2015", desc:"《聯合報》2015聖誕節冷知識動畫專題向量繪圖，動畫就在「影音動畫敘事」。", img:"images/2015xmas.webp"},
  {title:"「還不知道加密貨幣？別做投資族的LKK」冷知識動畫向量繪圖", year:"2018", desc:"《ETtoday》2018加密貨幣動畫向量繪圖，動畫就在「影音動畫敘事」。", img:"images/bitcoin_ani.webp"},
  {title:"「遊北韓4大禁忌 小心玩到沒命」冷知識動畫向量繪圖", year:"2018", desc:"《ETtoday》2018北韓旅遊動畫向量繪圖，動畫就在「影音動畫敘事」。", img:"images/north_korean_travel.webp"},
  {title:"人物手繪", year:"2019", desc:"情侶人物似顏繪。", img:"images/lover01.webp"},
  {title:"趣味自畫像", year:"2020", desc:"「惡魔形象的自己」有感而發的手繪，「我是台灣人」使用在新冠肺炎疫情間出國用。", img:"images/funny.webp"},
  {title:"我是台灣人（日文版）", year:"2020", desc:"新冠疫情前剛好回日本怕被歧視，只好推出「我是台灣人」。", img:"images/imtw_jp.webp"},
  {title:"我是台灣人（西文版）", year:"2020", desc:"西班牙文的延伸，應同志好友邀約繪製彩虹版本。", img:"images/imtw_spain.webp"},
];

// 500輯：4 個子分類，各先放 5 張假圖與假圖說，之後直接替換 img / title / desc 即可
const brand500Categories = [
  {
    key:"bowl", name:"500碗", intro:{zh:"《500輯》IP之一，第一份台灣人在地觀點的新指南。", en:"A 500輯 IP — Taiwan's first dining guide told from a local point of view."},
    // yearOrder：年份頁籤要顯示的順序，由左到右照這個陣列排列，可以自己調整前後順序。
    // 如果之後新增了陣列裡沒有的年份，會自動排到最後面（由新到舊），不會不見。
    yearOrder:["2026","2025","2024"],
    items:[
      {title:"500碗2026主視覺", desc:"手繪的小吃圖案再轉換成向量圖形。", year:"2026", img:"images/500bowl2026/500bowl2026_main.webp"},
      {title:"500碗2026主視覺小吃icon", desc:"台式小吃的icon，有牛肉湯、肉燥飯、切仔麵、臭豆腐、肉圓、蔥油餅、割包。", year:"2026", img:"images/500bowl2026/500bowl2026_main02.webp"},
      {title:"500碗2026店家得碗獎章", desc:"500碗2026店家得碗獎章。", year:"2026", img:"images/500bowl2026/500bowl2026_medal.webp"},
      {title:"500碗2026紙本小吃推薦", desc:"A5尺寸的折頁式台灣小吃推薦。", year:"2026", img:"images/500bowl2026/500bowl2026_dm.webp"},
      {title:"500碗2026小吃市集拱門出入口", desc:"為期三天、在台北市西門紅樓的小吃市集，人潮眾多。", year:"2026", img:"images/500bowl2026/500bowl2026_market.webp"},
      {title:"500碗2026頒獎典禮", desc:"台北西門紅樓的記者會頒獎典禮現場。", year:"2026", img:"images/500bowl2026/500bowl2026_award.webp"},
      {title:"500碗2026記者會拍照背板", desc:"典禮會場內可讓賓客拍照。", year:"2026", img:"images/500bowl2026/500bowl2026_pic.webp"},
      {title:"500碗2026周邊食玩", desc:"可以吸在冰箱上或是鐵板上的磁鐵小燈箱食玩。", year:"2026", img:"images/500bowl2026/500bowl2026_toy.webp"},
      {title:"500碗2024主視覺", desc:"使用幾何圖形概念。", year:"2024", img:"images/500bowl2024/500bowl2024_main.webp"},
      {title:"500碗概念人偶", desc:"擬人化的人偶繪製，使用雜訊效果。", year:"2024", img:"images/500bowl2024/500bowl2024_01.webp"},
      {title:"500碗概念人偶", desc:"擬人化的人偶繪製，使用扁平化質感繪製。", year:"2024", img:"images/500bowl2024/500bowl2024_02.webp"},
      {title:"周邊商品提案圖", desc:"周邊商品圖案繪製提案。", year:"2024", img:"images/500bowl2024/500bowl2024_03.webp"},
      {title:"周邊商品提案圖", desc:"周邊商品提案，以台灣都市傳說為概念。", year:"2024", img:"images/500bowl2024/500bowl2024_04.webp"},
      {title:"周邊商品提案圖", desc:"周邊商品提案，以台灣都市傳說為概念。", year:"2024", img:"images/500bowl2024/500bowl2024_05.webp"},
      {title:"獎旗設計", desc:"發送給各個得碗店家，方便掛至店內的獎旗。", year:"2024", img:"images/500bowl2024/500bowl2024_06.webp"},
      {title:"工作人員＆媒體識別證", desc:"工作人員識別證個性款。", year:"2024", img:"images/500bowl2024/500bowl2024_07.webp"},
      {title:"工作人員＆媒體識別證", desc:"工作人員識別證質感款。", year:"2024", img:"images/500bowl2024/500bowl2024_08.webp"},
      {title:"500碗2025主視覺", desc:"年度主視覺概念延伸提案。", year:"2025", img:"https://picsum.photos/seed/wan2025-01/700/875"},
      {title:"500碗2025得獎店家特輯", desc:"年度得獎店家視覺紀錄。", year:"2025", img:"https://picsum.photos/seed/wan2025-02/700/875"},
      
    ]
  },
  {
    key:"pa", name:"500趴", intro:{zh:"《500輯》IP之一，記錄城市裡精彩派對與活動現場的第一手觀察。", en:"A 500輯 IP — first-hand coverage of the city's best parties and live events."},
    yearOrder:["2025","2023"],
    items:[
      {title:"500趴2025主視覺", desc:"活動主視覺，視覺語言「外星變形蟲」，代表歡迎任何人、不分族群、人種、年齡與性別的一場年度派對盛事。", year:"2025", img:"images/500pa2025/500pa2025.webp"},
      {title:"主Live舞台", desc:"音樂派對主舞台設計。", year:"2025", img:"images/500pa2025/500pa2025stage.webp"},
      {title:"Taipei101水舞廣場", desc:"活動場景紀錄。", year:"2025", img:"images/500pa2025/500pa2025onboard.webp"},
      {title:"500趴2025主視覺 廢案01", desc:"致敬日本FUJIROCK主視覺設計，視覺語言太陽與月亮代表白天到晚上不停歇，未使用廢案。", year:"2025", img:"images/500pa2025/500pa2025_nouse01.webp"},
      {title:"500趴2025主視覺 廢案02", desc:"致敬日本FUJIROCK主視覺設計，視覺語言太陽與月亮代表白天到晚上不停歇，未使用廢案。", year:"2025", img:"images/500pa2025/500pa2025_nouse02.webp"},
      {title:"500趴2025主視覺 廢案03", desc:"致敬日本FUJIROCK主視覺設計，視覺語言太陽與月亮代表白天到晚上不停歇，未使用廢案。", year:"2025", img:"images/500pa2025/500pa2025_nouse03.webp"},
      {title:"500趴2025主視覺 廢案ver2.01", desc:"致敬日本FUJIROCK主視覺設計，視覺語言太陽與月亮代表白天到晚上不停歇，未使用廢案。", year:"2025", img:"images/500pa2025/500pa2025_nousever2_01.webp"},
      {title:"500趴2025主視覺 廢案ver2.02", desc:"致敬日本FUJIROCK主視覺設計，視覺語言太陽與月亮代表白天到晚上不停歇，未使用廢案。", year:"2025", img:"images/500pa2025/500pa2025_nousever2_02.webp"},
      {title:"500趴2025主視覺 廢案ver2.03", desc:"致敬日本FUJIROCK主視覺設計，視覺語言太陽與月亮代表白天到晚上不停歇，未使用廢案。", year:"2025", img:"images/500pa2025/500pa2025_nousever2_03.webp"},
      {title:"屋頂派對特輯", desc:"城市屋頂派對場景與賓客紀錄。", year:"2023", img:"https://picsum.photos/seed/pa03/700/875"},
      {title:"周年慶典紀錄", desc:"品牌周年活動現場紀實拍攝。", year:"2023", img:"https://picsum.photos/seed/pa04/700/875"},
      {title:"派對邀請卡設計", desc:"限定活動邀請卡與周邊視覺設計。", year:"2023", img:"https://picsum.photos/seed/pa05/700/875"},
    ]
  },
  {
    key:"dish", name:"500盤", intro:{zh:"《500輯》IP之一，第一份台灣人觀點的美食評鑑。", en:"A 500輯 IP — Taiwan's first restaurant guide from a local perspective."},
    yearOrder:["2026","2025","2024"],
    items:[
      {title:"IP主視覺設計", desc:"以幾何圖形繪製而成。", year:"2026", img:"https://picsum.photos/seed/pan01/700/875"},
      {title:"主廚精選盤飾", desc:"餐廳主廚精選料理擺盤攝影紀錄。", year:"2026", img:"https://picsum.photos/seed/pan02/700/875"},
      {title:"街邊小吃特輯", desc:"台灣街邊小吃的日常飲食紀錄。", year:"2025", img:"https://picsum.photos/seed/pan03/700/875"},
      {title:"異國料理巡禮", desc:"異國餐廳料理視覺紀錄與版面設計。", year:"2025", img:"https://picsum.photos/seed/pan04/700/875"},
      {title:"職人餐桌故事", desc:"料理職人與其代表作品的圖文紀錄。", year:"2024", img:"https://picsum.photos/seed/pan05/700/875"},
    ]
  },
  {
    key:"sweet", name:"500甜", intro:{zh:"《500輯》IP之一，台灣首份甜點指南。", en:"A 500輯 IP — Taiwan's first dessert guide."},
    yearOrder:["2025","2026"],
    items:[
      {title:"手作甜點工作室", desc:"獨立甜點工作室的作品拍攝與設計。", year:"2026", img:"https://picsum.photos/seed/tian01/700/875"},
      {title:"季節水果塔特輯", desc:"當季水果製作甜點的視覺紀錄。", year:"2026", img:"https://picsum.photos/seed/tian02/700/875"},
      {title:"職人手沖咖啡", desc:"咖啡職人手沖過程與空間紀錄。", year:"2025", img:"https://picsum.photos/seed/tian03/700/875"},
      {title:"傳統糕餅故事", desc:"傳統糕餅店的職人故事與商品紀錄。", year:"2025", img:"https://picsum.photos/seed/tian04/700/875"},
      {title:"下午茶提案", desc:"城市下午茶店家精選提案設計。", year:"2025", img:"https://picsum.photos/seed/tian05/700/875"},
    ]
  },
  {
    key:"young", name:"500Young", intro:{zh:"《500輯》IP之一，聚焦青年世代價值的領航獎項。", en:"A 500輯 IP — an award spotlighting the values of the younger generation."},
    yearOrder:["2026","2024"],
    items:[
      {title:"500Young2026主視覺", desc:"「彭羅斯階梯（三角形）」，主要強調的是「層次感與矛盾」。", year:"2026", img:"images/500young2026/500young2026main.webp"},
      {title:"500Young2026主視覺ICON", desc:"四個代表性的3D設計ICON元素。拼圖、魔術方塊、指北針、沙漏", year:"2026", img:"images/500young2026/500young2026_icon.webp"},
      {title:"賓客拍照背板", desc:"贊助商以及IP建構的賓客用拍照背板。", year:"2026", img:"images/500young2026/500young2026camerashot.webp"},
      {title:"中央舞台左右側背板", desc:"頒獎典禮的左右兩側背板。", year:"2026", img:"images/500young2026/monitor.webp"},
      {title:"中央舞台示意", desc:"頒獎典禮的舞台現場照。", year:"2026", img:"images/500young2026/main_stage.webp"},
      {title:"500Young2024主視覺", desc:"「補夢網」＆「莫比烏斯之環」的概念設計。", year:"2024", img:"images/500young2024/500young2024_main.webp"},
      {title:"500Young2024工作人員識別證", desc:"活動現場的工作人員識別證，共兩種。", year:"2024", img:"images/500young2024/500young2024_staff.webp"},
      {title:"500Young2024論壇宣傳廣告", desc:"講座的宣傳報版。", year:"2024", img:"images/500young2024/500young2024_class.webp"},
      {title:"500Young2024獎項公告", desc:"即將公布的樣式。", year:"2024", img:"images/500young2024/500young2024_01.webp"},
      {title:"500Young2024主視覺 廢案01", desc:"「補夢網」＆「莫比烏斯之環」的概念，未採用的深色款設計。", year:"2024", img:"images/500young2024/500young2024_main_nouse01.webp"},
      {title:"500Young2024主視覺 廢案02", desc:"「補夢網」＆「莫比烏斯之環」的概念，調整前的色違感、淺色款設計。", year:"2024", img:"images/500young2024/500young2024_main_nouse02.webp"},
    ]
  },
  {
    key:"biz", name:"500輯商業合作案", intro:{zh:"《500輯》與合作品牌／公部門單位合作的商業合作專案紀錄。", en:"A record of 500輯's collaborations with partner brands and public-sector clients."},
    // 這個分類跟其他 500輯 分類不一樣：不是用「年份頁籤＋單一格線」呈現，
    // 而是「每個合作案自己獨立一個區塊」，各自有自己的標題、簡介、跟自己的作品格線。
    // 好處是：像「屏東文學獎」只有1張作品、「永豐餘100週年慶」可能有10幾張作品，
    // 兩者可以各自呈現、互不混雜，不會因為作品數量差很多而讓版面看起來很奇怪。
    //
    // 之後有新的商業合作案，直接在下面 projects 陣列裡新增一個物件即可：
    //   {
    //     title:"案名（不用加年份，年份寫在 year 欄位）",
    //     year:"該案的年份",
    //     desc:"這個合作案的簡介／說明文字（可留空字串 \"\"）",
    //     items:[
    //       {title:"作品名稱", desc:"作品說明", img:"圖片網址"},
    //       // 這個案子有幾張作品，就在這裡加幾筆，不限制數量
    //     ]
    //   }
    // projects 陣列的排列順序，就是畫面由上到下顯示的順序，想調整順序直接搬動陣列裡物件的前後位置即可。
    type:"projects",
    projects:[
      {
        title:{zh:"屏東文學獎", en:"Pingtung Literature Award"}, year:"2024",
        desc:{zh:"每年屏東縣政府都會舉辦的文學獎徵稿活動。", en:"An annual literary submission event held by the Pingtung County Government."},
        items:[
          {title:"徵稿活動主視覺", desc:"2024年屏東縣政府舉辦的文學獎徵稿活動。", img:"images/2024pingtungliteratureaward.webp"},
        ]
      },
      /*/{
        title:"永豐餘100週年慶", year:"2024",
        desc:"暫定項目，之後補上詳細合作內容說明。",
        items:[
          {title:"視覺主圖", desc:"暫定項目，之後補上詳細合作內容說明。", img:"https://picsum.photos/seed/biz02/700/875"},
        ]
      },/**/
    ]
  },
];

/* ============================================================
   500輯「Coming Soon」設定（之後要更新最方便的地方！）
   ============================================================
   只要某個分類（key）＋某個年份出現在下面陣列裡，使用者點到該年份頁籤時，
   畫面就會直接顯示「目前更新中，coming soon！もうすぐ。」，
   不會顯示 brand500Categories 裡對應的作品卡片（就算資料已經先寫進去也一樣）。

   六個分類的 key 對照：
     bowl  = 500碗
     pa    = 500趴
     dish  = 500盤
     sweet = 500甜
     young = 500Young
     biz   = 500輯商業合作案

   使用方式：
   1) 該年份作品「還沒準備好」→ 把年份字串加進對應 key 的陣列裡，例如 bowl:["2026"]
   2) 該年份作品「已經準備好、要正式上架」→ 把該年份字串從陣列中刪除即可，
      畫面會自動改回顯示 brand500Categories 裡該年份的真正作品卡片，不用動其他程式碼。
   ============================================================ */
const comingSoonYears = {
  bowl:  ["2025"],
  pa:    ["2023"],
  dish:  ["2026","2025","2024"],
  sweet: ["2026", "2025"],
  young: [],
};

// 影音作品：已換成您提供的 6 支 YouTube 影片
const videoWorks = [
  {title:"星際大戰幼幼班 搞懂四色光劍", desc:"透過8-bit繪製，呈現趣味的冷知識。", ytid:"9cMXhftGdNE"},
  {title:"耶誕叮叮噹 紅鼻子是馴鹿…還是麋鹿？", desc:"整體用耶誕折疊卡片的概念、角色用巧拼版質感設計，討論冷知識。", ytid:"1_fNvCi90Vs"},
  {title:"台語王是你？草莓台語安抓唸", desc:"實際的水果影片配上可愛手繪擬人，讓學習冷知識也可以很輕鬆。", ytid:"RaaSajsD6u4"},
  {title:"身體好嗎？便便顏色告訴你", desc:"完全手繪的可可愛愛動畫，平常鮮少人討論的日常健康冷知識。", ytid:"GcKrLSai86U"},
  {title:"還不知道加密貨幣？別做投資族的LKK", desc:"新興的加密貨幣，向量動畫讓你知！", ytid:"nqFTLATqsQM"},
  {title:"遊北韓4大禁忌 小心玩到沒命", desc:"想去北韓旅遊嗎？這篇告訴你！", ytid:"lJFLhsY3-7g"},
];

// AMP Stories（原地獨立瀏覽，每一篇彼此獨立，沒有左右切換機制）－標題為依網址暫擬，請依實際內容調整
// img 為封面圖，目前先放佔位圖，之後直接替換 img 網址即可
const ampStories = [
  {title:"十二夜後仍不見曙光，零撲殺浮現五大危機", url:"https://events.ettoday.net/depth-report/amp-dog/", img:"https://events.ettoday.net/depth-report/amp-dog/dog_share.jpg"},
  {title:"深夜法器聲響起，百年習俗「送肉粽」解密，7大禁忌別碰", url:"https://events.ettoday.net/depth-report/amp-sbc/index.html", img:"https://events.ettoday.net/depth-report/amp-sbc/sbc-fb.jpg"},
  {title:"200年前的「變女術」", url:"https://events.ettoday.net/depth-report/amp-beijingopera/", img:"https://events.ettoday.net/depth-report/amp-beijingopera/beijingopera-fb.jpg"},
  {title:"國小生也聽KPOP！", url:"https://events.ettoday.net/depth-report/amp-kpop/", img:"https://events.ettoday.net/depth-report/amp-kpop/kpop-fb.jpg"},
  {title:"逃離辦公室，成為大海的子民", url:"https://events.ettoday.net/depth-report/amp-mermaid/", img:"https://events.ettoday.net/depth-report/amp-mermaid/mermaid-fb.jpg"},
  {title:"匠人之魂的燃燒", url:"https://events.ettoday.net/depth-report/amp-daystar/", img:"https://events.ettoday.net/depth-report/amp-daystar/daystar-fb.jpg"},
  {title:"甩尾進金崙，跟村民一起搶救解憂雜貨店", url:"https://events.ettoday.net/depth-report/amp-konbini/", img:"https://events.ettoday.net/depth-report/amp-konbini/konbini-fb.jpg"},
  {title:"人生旅遊清單+1，直擊加拿大冰川天空步道，全覽洛磯山美景", url:"https://events.ettoday.net/depth-report/amp-canadaiceriver/", img:"https://events.ettoday.net/depth-report/amp-canadaiceriver/canadaiceriver-fb.jpg"},
  {title:"熊出沒！野生動物的天堂「加拿大傑士伯國家公園」", url:"https://events.ettoday.net/depth-report/amp-canadajasper/", img:"https://events.ettoday.net/depth-report/amp-canadajasper/canadajasper-fb.jpg"},
  {title:"我們的城中城", url:"https://events.ettoday.net/depth-report/amp-cheng-zhong-cheng/index.html", img:"https://events.ettoday.net/depth-report/amp-cheng-zhong-cheng/cheng-zhong-cheng-fb.jpg"},
  {title:"羞答答台灣之光，摩鐵的「八腳獸傳奇」", url:"https://events.ettoday.net/depth-report/amp-motel_sexchair/index.html", img:"https://events.ettoday.net/depth-report/amp-motel_sexchair/sexchair-fb.jpg"},
  {title:"非去不可的Funtel！全家摩鐵玩起來", url:"https://events.ettoday.net/depth-report/amp-motel_funtel/index.html", img:"https://events.ettoday.net/depth-report/amp-motel_funtel/motel_funtel-fb.jpg"},
];

// 互動作品（HTML5 / Adobe Edge Animate）
// 「2014世界盃」是一組 3 篇的作品，每一篇都是完全獨立的網址、獨立開啟、獨立關閉，
// 彼此之間沒有任何左右切換或連動機制。
// native:{w,h} 為各篇實際的 Adobe Edge 原始設計畫布尺寸（直式）：
// 開頭動畫頁已由原始碼 AdobeEdge.loadComposition() 參數確認為 768x960，
// 另外兩篇（互動遊戲）維持先前調整過的 768x1300。
const worldCup2014 = {
  title:{zh:"FIFA2014世界盃", en:"FIFA World Cup 2014"},
  intro:{zh:"2014年世界盃足球賽期間特別繪製與製作的主題式互動動畫網頁，使用 Adobe Edge Animate 製作，搭配HTML5語法撰寫調整，包含逐格繪製的插畫與互動效果，是投入相當多時間心力完成的作品。",
         en:"An interactive themed page produced during the 2014 FIFA World Cup, built with Adobe Edge Animate and hand-tuned HTML5, featuring frame-by-frame illustration and interactive effects — a project that took considerable time and effort to complete."},
  repoUrl:"https://github.com/hirox0201/fifa2014",
  pages:[
    {title:"開頭動畫頁", desc:"世界盃主題開場動畫，以逐格繪製插畫呈現賽事氛圍。", img:"images/fifa201401_s.webp", url:"https://hirox0201.github.io/fifa201401/", native:{w:768,h:914}},
    {title:"國家隊街頭足球互動遊戲", desc:"以各國家隊為主題的街頭足球互動小遊戲。", img:"images/fifa201402_s.webp", url:"https://hirox0201.github.io/fifa201402/", native:{w:768,h:1300}},
    {title:"規則小知識互動遊戲", desc:"以互動問答呈現世界盃賽事規則小知識。", img:"images/fifa201403_s.webp", url:"https://hirox0201.github.io/fifa201404/", native:{w:768,h:1300}},
  ]
};

// 一般網頁作品（另開新分頁）－標題為依網址暫擬，請依實際內容調整
// img 為縮圖，目前先放佔位圖，之後直接替換 img 網址即可
const generalWorks = [
  {title:"十二夜後，仍不見曙光 零撲殺浮現五大危機", desc:"十二夜後，仍不見曙光 零撲殺浮現五大危機", url:"https://events.ettoday.net/depth-report/dog_care/", img:"http://events.ettoday.net/depth-report/dog_care/img/dog_fb-2.jpg"},
  {title:"2018 SIHH日內瓦高級鐘錶展", desc:"2018 SIHH日內瓦高級鐘錶展", url:"https://events.ettoday.net/depth-report/sihh2018/", img:"https://events.ettoday.net/depth-report/sihh2018/images/sihh2018-fb.jpg"},
  {title:"遊北韓4禁忌　踩了就GG", desc:"遊北韓4禁忌　踩了就GG", url:"https://events.ettoday.net/depth-report/ncs_travel/", img:"https://events.ettoday.net/depth-report/ncs_travel/images/ncs_travel-fb.jpg"},
];

