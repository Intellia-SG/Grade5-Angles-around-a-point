import { useReducer, useEffect } from 'react';
import { getFullQuestionBank } from '../data/questionBank';
import { generateSessionQuestions } from '../utils/shuffle';
import { checkBadges } from '../utils/badgeEngine';
import { calcXP, calcTotalStars } from '../utils/scoring';

const STORAGE_KEY = 'angles_around_point_session_v1';

const initialState = {
  phase: 'intro',
  storyPanel: 0,
  currentSimStation: 0,
  simStationsComplete: [false, false, false],
  simRound: 0,

  questionSet: [],
  currentQuestion: 0,
  currentWorld: 0,
  worldScores: Array(10).fill(null),
  hintsUsed: 0,
  attemptCount: 0,

  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],
  mirrorMatchNoHintCount: 0,
  straightLineStreak: 0,

  phaseComplete: {
    wonder: false,
    story: false,
    simulate: false,
    play: false,
    reflect: false
  },
  sessionId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
  audioEnabled: true,
  musicEnabled: false
};

function gameReducer(state, action) {
  switch (action.type) {
    case 'SET_PHASE': {
      const nextPhase = action.payload;
      return {
        ...state,
        phase: nextPhase,
        storyPanel: nextPhase === 'story' ? state.storyPanel : 0
      };
    }

    case 'SET_STORY_PANEL': {
      return { ...state, storyPanel: action.payload };
    }

    case 'NEXT_STORY_PANEL': {
      const nextPanel = Math.min(state.storyPanel + 1, 5);
      const storyDone = nextPanel === 5;
      const updatedPhaseComplete = storyDone
        ? { ...state.phaseComplete, story: true }
        : state.phaseComplete;

      const newState = {
        ...state,
        storyPanel: nextPanel,
        phaseComplete: updatedPhaseComplete
      };
      return { ...newState, badges: checkBadges(newState) };
    }

    case 'PREV_STORY_PANEL': {
      return { ...state, storyPanel: Math.max(state.storyPanel - 1, 0) };
    }

    case 'SET_SIM_STATION': {
      return { ...state, currentSimStation: action.payload, simRound: 0 };
    }

    case 'COMPLETE_SIM_STATION': {
      const stationIdx = action.payload;
      const updatedStations = [...state.simStationsComplete];
      updatedStations[stationIdx] = true;
      const allSimDone = updatedStations.every(Boolean);

      const newState = {
        ...state,
        simStationsComplete: updatedStations,
        phaseComplete: allSimDone
          ? { ...state.phaseComplete, simulate: true }
          : state.phaseComplete
      };
      return { ...newState, badges: checkBadges(newState) };
    }

    case 'NEXT_SIM_ROUND': {
      return { ...state, simRound: state.simRound + 1 };
    }

    case 'LOAD_QUESTIONS': {
      const fullBank = getFullQuestionBank();
      const sessionQuestions = generateSessionQuestions(fullBank);
      return {
        ...state,
        questionSet: sessionQuestions,
        currentQuestion: 0,
        currentWorld: 0,
        worldScores: Array(10).fill(null)
      };
    }

    case 'ANSWER_CORRECT': {
      const currentQ = state.questionSet[state.currentQuestion];
      const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
      const newStreak = state.streak + 1;
      const worldIndex = Math.floor(state.currentQuestion / 10);
      const newWorldScore = (state.worldScores[worldIndex] || 0) + 1;
      const updatedWorldScores = [...state.worldScores];
      updatedWorldScores[worldIndex] = newWorldScore;

      const isLineQuestion = currentQ && (currentQ.factType === 'line180' || currentQ.type === 'find_line_angle');
      const newStraightStreak = isLineQuestion ? state.straightLineStreak + 1 : state.straightLineStreak;

      const newState = {
        ...state,
        xp: state.xp + xpEarned,
        streak: newStreak,
        maxStreak: Math.max(state.maxStreak, newStreak),
        straightLineStreak: newStraightStreak,
        worldScores: updatedWorldScores,
        totalStars: calcTotalStars(updatedWorldScores),
        hintsUsed: 0,
        attemptCount: 0
      };

      return { ...newState, badges: checkBadges(newState) };
    }

    case 'ANSWER_INCORRECT': {
      return {
        ...state,
        streak: 0,
        straightLineStreak: 0,
        attemptCount: state.attemptCount + 1
      };
    }

    case 'USE_HINT': {
      return { ...state, hintsUsed: state.hintsUsed + 1 };
    }

    case 'NEXT_QUESTION': {
      const nextIdx = state.currentQuestion + 1;
      const playComplete = nextIdx >= (state.questionSet.length || 100);
      const newState = {
        ...state,
        currentQuestion: nextIdx,
        currentWorld: Math.min(Math.floor(nextIdx / 10), 9),
        hintsUsed: 0,
        attemptCount: 0,
        phaseComplete: playComplete
          ? { ...state.phaseComplete, play: true }
          : state.phaseComplete
      };
      return { ...newState, badges: checkBadges(newState) };
    }

    case 'SET_WORLD': {
      const targetWorld = action.payload;
      return {
        ...state,
        currentWorld: targetWorld,
        currentQuestion: targetWorld * 10,
        hintsUsed: 0,
        attemptCount: 0
      };
    }

    case 'COMPLETE_PHASE': {
      const phaseName = action.payload;
      const newState = {
        ...state,
        phaseComplete: { ...state.phaseComplete, [phaseName]: true }
      };
      return { ...newState, badges: checkBadges(newState) };
    }

    case 'INCREMENT_MIRROR_NO_HINT': {
      const count = state.mirrorMatchNoHintCount + 1;
      const newState = { ...state, mirrorMatchNoHintCount: count };
      return { ...newState, badges: checkBadges(newState) };
    }

    case 'TOGGLE_AUDIO': {
      return { ...state, audioEnabled: !state.audioEnabled };
    }

    case 'TOGGLE_MUSIC': {
      return { ...state, musicEnabled: !state.musicEnabled };
    }

    case 'RESTORE_SESSION': {
      return { ...action.payload };
    }

    case 'RESET_SESSION': {
      const fullBank = getFullQuestionBank();
      const freshQuestions = generateSessionQuestions(fullBank);
      return {
        ...initialState,
        questionSet: freshQuestions,
        sessionId: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2)
      };
    }

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Initialize questions on first load
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'RESTORE_SESSION', payload: parsed });
        return;
      } catch {
        // Fallback to fresh session
      }
    }
    dispatch({ type: 'LOAD_QUESTIONS' });
  }, []);

  // Save session state to localStorage
  useEffect(() => {
    if (state.questionSet && state.questionSet.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  return { state, dispatch };
}
