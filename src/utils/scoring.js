import { shuffleArray } from './shuffle';

export function calcXP(attempts, hintsUsed, streak) {
  let base = 50;
  if (attempts === 1) base = 100;
  else if (attempts === 2) base = 75;

  const hintDeduction = hintsUsed * 15;
  const streakBonus = Math.min(streak * 10, 50);

  return Math.max(20, base - hintDeduction + streakBonus);
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((acc, score) => {
    if (score === null || score === undefined) return acc;
    if (score >= 9) return acc + 3;
    if (score >= 7) return acc + 2;
    if (score >= 5) return acc + 1;
    return acc;
  }, 0);
}

export function generateDistractors(correct, min = 0, max = 360, count = 3) {
  const distractors = new Set();
  const candidates = [
    180 - correct,
    360 - correct,
    correct + 10,
    correct - 10,
    correct + 5,
    correct - 5,
    correct + 15,
    correct - 15,
  ].filter(v => v >= min && v <= max && v !== correct && Number.isInteger(v));

  shuffleArray(candidates).forEach(v => {
    if (distractors.size < count) distractors.add(v);
  });

  while (distractors.size < count) {
    const d = Math.max(min, Math.min(max, correct + (distractors.size + 1) * 10));
    if (d !== correct) distractors.add(d);
  }

  return shuffleArray([correct, ...Array.from(distractors)]);
}
