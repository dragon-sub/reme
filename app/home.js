let flashcards = [
  {
    "id": '17801453695290.9537914532665981',
    "title": "Noms français",
    "cards": 10,
    "memorized": 5,
    "data": [
      {
        "word": "Pomme",
        "meaning": "りんご",
        "tags": ["fruit", "français"],
        "lastTested": "2026-05-25T12:41:05.327Z",
        "memoryIndex": 0.5
      },
      {
        "word": "Voir",
        "meaning": "見る",
        "tags": ["verb", "français"],
        "lastTested": "2026-05-25T12:41:05.327Z",
        "memoryIndex": 0.5
      }
    ]
  }
];

localStorage.setItem('remeData', JSON.stringify(flashcards));

function setFlashcardsList() {
  let container = document.querySelector('.flashcard-list');
  container.querySelectorAll(".real").forEach(el => el.remove());

  flashcards.forEach((flashcard, i) => {
    const item = document.getElementById('flashcard-item').content.cloneNode(true);
    const t = flashcard.memorized / flashcard.cards;
    const memorizedRate = (Math.floor(t * 1000) / 10) + '%';
    const delay = `animation-delay:${0.2 * i}s`;

    item.querySelector('.move-to-play').href = "play.html?id=" + flashcard.id;
    item.querySelector('.flashcard-item').title = flashcard.id;
    item.querySelector('.move-to-play').classList.add('real');
    item.querySelector('.flashcard-item').style = delay;
    item.querySelector('.flashcard-title').innerText = flashcard.title;
    item.querySelector('.flashcard-progress').innerText = memorizedRate;
    item.querySelector('.flashcard-number-of-cards').innerText = flashcard.memorized + ' / ' + flashcard.cards;
    item.querySelector('.flashcard-bar-inner').style = `width:${memorizedRate};${delay};--t:${t}`;
    container.appendChild(item);
  });
}

setFlashcardsList();