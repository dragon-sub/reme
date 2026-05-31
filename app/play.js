const flashcards = JSON.parse(localStorage.getItem('remeData'));
const flashcardId = new URL(location.href).searchParams.get("id");
const flashcard = flashcards.find(item => item.id === flashcardId);

function play() {
  const pageTitle = document.querySelector(".page-title");
  pageTitle.innerText = flashcard?.title;

  setWordsList()
}

function setWordsList() {
  flashcard.data.forEach((wordData, i) => {
    const word = document.getElementById('word-card').content.cloneNode(true);
    const container = document.querySelector('.words-list');

    word.querySelector('.word-left').innerText = wordData["word"];
    word.querySelector('.word-meaning').innerText = wordData["meaning"];
    word.querySelector('.word-tags').innerText = wordData["tags"].join(' / ');
    word.querySelector('.word-number').innerText = i + 1;
    word.querySelector('.word-card').style.animationDelay = (0.2 * i + 0.2) + 's';

    container.appendChild(word);
  });
}

play();