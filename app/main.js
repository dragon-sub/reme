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

function main() {
  const page = document.documentElement;
  const buttonTheme = document.getElementById('change-theme');
  const drawerTheme = document.getElementById('drawer-theme');
  const shadow = document.getElementById('drawer-shadow');
  const closeDrawerBtn = document.querySelector('.drawer-contents a')
  const lightOrDark = document.querySelector('.theme-light-and-dark');
  const themesList = ["beige", "blue", "green", "monochrome", "lavender", "sakura", "mint",
    "ocean", "navy", "breeze", "wine", "rose", "forest", "amethyst", "topaz", "ruby"];

  const themeContainer = document.querySelector('.theme-container');

  lightOrDark.addEventListener('click', () => {
    if (lightOrDark.innerText == 'Light') {
      lightOrDark.innerText = 'Dark';
      toggleDarkMode(true);
    } else {
      lightOrDark.innerText = 'Light';
      toggleDarkMode(false);
    }
  });

  let themeCards = '';

  themesList.forEach(theme => {
    themeCards += `
      <div class="theme-card ${theme}" onclick="changeTheme('${theme}')">
        <div>${theme}</div>
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
  const savedMode = (localStorage.getItem('remeMode') == 'true') ? "Dark" : "Light";
  lightOrDark.innerText = savedMode;

  importJson();
}

window.addEventListener('load', main);