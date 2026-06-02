let flashcards = JSON.parse(localStorage.getItem('remeData'));

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