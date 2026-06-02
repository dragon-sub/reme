const flashcards = JSON.parse(localStorage.getItem('remeData'));
const flashcardId = new URL(location.href).searchParams.get("id");
const flashcard = flashcards.find(item => item.id === flashcardId);

function pronounce(word, language, el) {
  const speak = new SpeechSynthesisUtterance(word);
  speak.lang = language;

  speak.onend = () => {
    el.style.display = 'inline';
  };

  el.style.display = 'none';

  speechSynthesis.speak(speak);
}

function play() {
  const pageTitle = document.querySelector(".page-title");
  pageTitle.innerText = flashcard?.title;

  setWordsList()
}

function setWordsList() {
  flashcard.data.forEach((wordData, i) => {
    const word = document.getElementById('word-card').content.cloneNode(true);
    const container = document.querySelector('.words-list');

    word.querySelector('.word-display').innerText = wordData["word"];
    word.querySelector('.word-meaning').innerText = wordData["meaning"];
    word.querySelector('.word-tags').innerText = wordData["tags"].join(' / ');
    word.querySelector('.word-number').innerText = i + 1;
    word.querySelector('.word-card').style.animationDelay = (0.1 * i + 0.2) + 's';

    const wordPlay = word.querySelector('.word-play');
    const wordPlayIcon = word.querySelector('.word-play svg');
    wordPlay.title = wordData["word"];
    wordPlay.addEventListener('click', () => {
      pronounce(wordData["word"], "en-US", wordPlayIcon);
    });

    container.appendChild(word);
  });
}

play();