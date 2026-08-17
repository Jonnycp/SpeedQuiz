const Question = require("../models/Question");

const cacheQuestions = { byCategory: new Map(), loadedAt: null };

//* Carica tutte le domande in cache (divise nel map)
async function load() {
  const questions = await Question.find({ isActive: true }).lean(); // lean() dice a mongoDB di restituire oggetti JS invece di documenti per intero
  
  if (questions.length <= 0) {
    throw new Error("Nessuna domanda del database. Esegui npm run seed");
  }

  //* Pulizia Map
  cacheQuestions.byCategory.clear();

  questions.forEach((q) => {
    const category = cacheQuestions.byCategory.get(q.category);
    if (!category) {
      cacheQuestions.byCategory.set(q.category, [q]);
    } else {
      category.push(q);
    }
  });

  cacheQuestions.loadedAt = Date.now();

  return questions.length;
}

//* Estrae N domande di quella cateogory
function pickRandom(N, category) {
  //* Check se categoria esiste
  if (!category || !cacheQuestions.byCategory.has(category)) {
    throw new Error("Categoria di domande non valida");
  }

  //* refresh della cache solo se ultima load eseguita da più 5 giorni
  const fiveDays = 5 * 24 * 60 * 60 * 1000;
  if (Date.now() - cacheQuestions.loadedAt > fiveDays) {
    load().catch((err) => console.error("Reload cache fallito:", err));
  }

  const pool = cacheQuestions.byCategory.get(category);

  //* Check se ci sono abbastanza domande
  if (pool.length < N) {
    throw new Error("Non ci sono abbastanza domande");
  }

  //* Ordina per timesUsed e prendi le prime 3N domande
  const sorted = [...pool].sort((a, b) => a.timesUsed - b.timesUsed);
  const candidates = sorted.slice(0, N * 3);

  //* Estrazione casuale senza ripetizioni
  const picked = [];
  while (picked.length < N) {
    const extracted = candidates[Math.floor(Math.random() * candidates.length)];

    const exist = picked.filter(
      (q) => q._id.toString() == extracted._id.toString(),
    );
    if (exist.length == 0) {
      picked.push({ _id: extracted._id, text: extracted.text });
    }
  }

  return picked;
}

module.exports = { load, pickRandom };
