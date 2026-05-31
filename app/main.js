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
  const lightOrDark = document.querySelector('.theme-light-and-dark');

  const themeCards = document.querySelectorAll('.theme-card');

  lightOrDark.addEventListener('click', () => {
    if (lightOrDark.innerText == 'Light') {
      lightOrDark.innerText = 'Dark';
      toggleDarkMode(true);
    } else {
      lightOrDark.innerText = 'Light';
      toggleDarkMode(false);
    }
  });

  themeCards.forEach(card => {
    card.addEventListener('click', () => {
      changeTheme(card.id);
    });
  });

  buttonTheme.addEventListener('click', () => {
    shadow.classList.add('open');
    drawerTheme.classList.add('open');
  });

  shadow.addEventListener('click', () => {
    drawerTheme.classList.remove('open');
    shadow.classList.remove('open');
  });

  const savedTheme = localStorage.getItem('remeTheme') || "theme";
  document.getElementById('theme-title').innerText = savedTheme;
  const savedMode = (localStorage.getItem('remeMode') == 'true') ? "Dark" : "Light";
  lightOrDark.innerText = savedMode;

  importJson();
}

window.addEventListener('load', main);