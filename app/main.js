function importJson() {
  const importButton = document.getElementById('import-flashcards');
  const realInput = document.getElementById('realInput');
  importButton.onclick = () => realInput.click();

  realInput.addEventListener('change', (e) => {
    const jsonPath = e.target.files[0];
    const reader = new FileReader();
    reader.readAsText(jsonPath);
    reader.onload = () => {
      const data = reader.result;
      localStorage.setItem('remeData', data);
      flashcards = JSON.parse(data);
      setFlashcardsList();
    }
  });
}

function changeTheme(theme) {
  localStorage.setItem('remeTheme', theme);
  const page = document.documentElement;
  const isDarkMode = page.classList.contains('dark');
  page.className = '';
  page.classList.add(theme);
  if (isDarkMode) page.classList.add('dark');
  document.getElementById('theme-title').innerText = theme;
}

function toggleDarkMode(bool) {
  localStorage.setItem('remeMode', bool);
  const page = document.documentElement;
  page.classList.remove('dark');
  if (bool) page.classList.add('dark');
}

// EN -> JA -> ZH -> FR -> ES
let i18nText = {
  "new": [
    "New",
    "新規",
    "新建",
    "Nouveau",
    "Nuevo"
  ],
  "search": [
    "Search",
    "検索",
    "搜索",
    "Rechercher",
    "Buscar"
  ],
   "export": [
    "Export",
    "書き出し",
    "导出",
    "Exporter",
    "Exportar"
  ],
  "import": [
    "Import",
    "読み込み",
    "导入",
    "Importer",
    "Importar"
  ],
  "theme": [
    "Theme",
    "テーマ",
    "主题",
    "Thème",
    "Tema"
  ],
  "flashcards": [
    "Flashcards",
    "単語帳",
    "抽认卡",
    "Cartes mémoire",
    "Tarjetas de memoria"
  ],
  "beige": [
    "beige",
    "ベージュ",
    "米色",
    "Beige",
    "Beige"
  ],
  "blue": [
    "blue",
    "ブルー",
    "蓝色",
    "Bleu",
    "Azul"
  ],
  "green": [
    "green",
    "グリーン",
    "绿色",
    "Vert",
    "Verde"
  ],
  "monochrome": [
    "monochrome",
    "モノクロ",
    "黑白",
    "Monochrome",
    "Monocromo"
  ],
  "lavender": [
    "lavender",
    "ラベンダー",
    "薰衣草色",
    "Lavande",
    "Lavanda"
  ],
  "sakura": [
    "sakura",
    "サクラ",
    "樱花色",
    "Sakura",
    "Sakura"
  ],
  "mint": [
    "mint",
    "ミント",
    "薄荷色",
    "Menthe",
    "Menta"
  ],
  "ocean": [
    "ocean",
    "オーシャン",
    "海洋色",
    "Océan",
    "Océano"
  ],
  "navy": [
    "navy",
    "ネイビー",
    "藏青色",
    "Marine",
    "Azul marino"
  ],
  "breeze": [
    "breeze",
    "ブリーズ",
    "微风",
    "Brise",
    "Brisa"
  ],
  "wine": [
    "wine",
    "ワイン",
    "酒红色",
    "Vin",
    "Vino"
  ],
  "rose": [
    "rose",
    "ローズ",
    "玫瑰色",
    "Rose",
    "Rosa"
  ],
  "forest": [
    "forest",
    "フォレスト",
    "森林色",
    "Forêt",
    "Bosque"
  ],
  "amethyst": [
    "amethyst",
    "アメジスト",
    "紫水晶",
    "Améthyste",
    "Amatista"
  ],
  "topaz": [
    "topaz",
    "トパーズ",
    "黄玉",
    "Topaze",
    "Topacio"
  ],
  "ruby": [
    "ruby",
    "ルビー",
    "红宝石",
    "Rubis",
    "Rubí"
  ],
  "light": [
    "Light",
    "ライト",
    "浅色",
    "Clair",
    "Claro"
  ],
  "dark": [
    "Dark",
    "ダーク",
    "深色",
    "Sombre",
    "Oscuro"
  ]
};

function changeLanguage(lang) {
  localStorage.setItem('remeLang', lang);

  document.documentElement.id = lang;
  i18nElement.forEach(el => {
    el.innerText = i18nText[el.dataset.i18n][lang];
  });

  const savedMode = (localStorage.getItem('remeMode') == 'true') ? 'Dark' : 'Light';
  document.getElementById('toggle' + savedMode).click();
}

function giveSelectPosition() {
  function givePosition() {
    const selects = document.querySelectorAll('.select');

    selects.forEach(select => {
      const display = select.querySelector('.select-display');
      const options = select.querySelector('.select-options');
      const rect = display.getBoundingClientRect();
      options.style.left = rect.x + 'px';
      options.style.top = rect.bottom + 4 + 'px';
      options.style.width = (parseFloat(getComputedStyle(display).width) + 16) + 'px';
    });
  }

  const languageOptions = document.querySelectorAll('#language-select .option');
  const options = document.querySelectorAll('.option');
  const displays = document.querySelectorAll('.select-display');
  const themeOptions = document.querySelectorAll('#theme-select .option');

  document.addEventListener('click', (ev) => {
    givePosition();

    options.forEach(option => {
      if (option.contains(ev.target)) {
        option.closest('.select').querySelector('.select-span').innerText = option.innerText;
      }
    });

    themeOptions.forEach(option => {
      if (option.contains(ev.target)) {
        toggleDarkMode(option.id == 'toggleDark');
      }
    });

    languageOptions.forEach(option => {
      if (option.contains(ev.target)) {
        changeLanguage(Number(option.id.slice(4)));
      }
    });

    displays.forEach(display => {
      if (display.contains(ev.target)) {
        display.classList.toggle('focus');
      } else {
        display.classList.remove('focus');
      }
    });
  });
}

function main() {
  const page = document.documentElement;
  const buttonTheme = document.getElementById('change-theme');
  const drawerTheme = document.getElementById('drawer-theme');
  const shadow = document.getElementById('drawer-shadow');
  const closeDrawerBtn = document.querySelector('.drawer-contents a')
  const lightOrDark = document.getElementById('light-or-dark');
  const themesList = ["beige", "blue", "green", "monochrome", "lavender", "sakura", "mint",
    "ocean", "navy", "breeze", "wine", "rose", "forest", "amethyst", "topaz", "ruby"];

  const themeContainer = document.querySelector('.theme-container');

  let themeCards = '';

  themesList.forEach(theme => {
    themeCards += `
      <div class="theme-card ${theme}" onclick="changeTheme('${theme}')">
        <div data-i18n="${theme}">${theme}</div>
      </div>
    `;
  });

  themeContainer.innerHTML = themeCards;

  buttonTheme.addEventListener('click', () => {
    shadow.classList.add('open');
    drawerTheme.classList.add('open');
  });

  function closeDrawer() {
    drawerTheme.classList.remove('open');
    shadow.classList.remove('open'); 
  }

  shadow.addEventListener('click', closeDrawer);
  closeDrawerBtn.addEventListener('click', closeDrawer);

  const savedTheme = localStorage.getItem('remeTheme') || "theme";
  document.getElementById('theme-title').innerText = savedTheme;

  giveSelectPosition();
  importJson();

  i18nElement = document.querySelectorAll('[data-i18n]');

  const lang = localStorage.getItem('remeLang') || '0';
  document.getElementById('lang' + lang).click();

  const savedMode = (localStorage.getItem('remeMode') == 'true') ? 'Dark' : 'Light';
  document.getElementById('toggle' + savedMode).click();
}

window.addEventListener('load', main);