export const BADGES = [
  {
    id: 'angle_explorer',
    title: 'Angle Explorer',
    description: 'Completed the Wonder & Story phase',
    icon: '🧭'
  },
  {
    id: 'circle_builder',
    title: 'Circle Builder',
    description: 'Completed all 3 Simulation Stations',
    icon: '⭕'
  },
  {
    id: 'straight_shooter',
    title: 'Straight Shooter',
    description: 'Answered 5 straight-line questions correctly in a row',
    icon: '📏'
  },
  {
    id: 'mirror_master',
    title: 'Mirror Master',
    description: 'Matched 3 vertically opposite pairs without using hints',
    icon: '🪞'
  },
  {
    id: 'champion_360',
    title: '360° Champion',
    description: 'Scored over 80% accuracy in the IntelliPlay challenge',
    icon: '🏆'
  }
];

export function checkBadges(state) {
  const newBadges = [...state.badges];
  
  // 1. Angle Explorer
  if (!newBadges.includes('angle_explorer') && state.phaseComplete.wonder && state.phaseComplete.story) {
    newBadges.push('angle_explorer');
  }

  // 2. Circle Builder
  if (!newBadges.includes('circle_builder') && state.simStationsComplete.every(Boolean)) {
    newBadges.push('circle_builder');
  }

  // 3. Straight Shooter
  if (!newBadges.includes('straight_shooter') && state.straightLineStreak >= 5) {
    newBadges.push('straight_shooter');
  }

  // 4. Mirror Master
  if (!newBadges.includes('mirror_master') && state.mirrorMatchNoHintCount >= 3) {
    newBadges.push('mirror_master');
  }

  // 5. 360° Champion
  if (!newBadges.includes('champion_360') && state.phaseComplete.play) {
    const totalQuestions = state.questionSet.length || 1;
    const correctCount = state.worldScores.reduce((a, b) => a + (b || 0), 0);
    const scorePct = (correctCount / totalQuestions) * 100;
    if (scorePct >= 80) {
      newBadges.push('champion_360');
    }
  }

  return newBadges;
}
