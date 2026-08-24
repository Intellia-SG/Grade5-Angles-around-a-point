# Technical Requirements Document (TRD)

## Angles Around a Point | Grade 5 Math — Geometry
### Intellia SG | Global Primary Mathematics Curriculum

═══════════════════════════════════════════════════════════════════════════════

## 1. Technical Overview

This document specifies the architecture, component design, state
management, data models, simulation logic, gamification implementation,
audio pipeline, and quality standards for the **"Angles Around a Point"**
interactive lesson module within Intellia's Grade 5 Math program.

The module is a **React 18** application (Vite + JSX), structured
identically to the reference repository
`https://github.com/dsamyak/equal`, and styled to match
`https://equal-tau.vercel.app/`. It will be linked from the course index
whose structure the requester will upload
(`https://intelliasg.com/courses/grade-3-math` layout, adapted for Grade 5).

Audio narration uses **ElevenLabs exclusively** (no browser Web Speech API
fallback), implementing the pipeline described in the supplied
`audio_generation_pipeline.md` ("Number Bonds Audio & Narration Pipeline"),
adapted for this lesson's scripts.

═══════════════════════════════════════════════════════════════════════════════

## 2. Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| UI Framework | React 18 (JSX, Vite) | Matches `equal` repo structure |
| State Management | `useState` + `useReducer` | Sufficient for single-module complexity |
| Styling | CSS Modules + Tailwind | Matches existing repo CSS approach |
| Icons | Lucide React | Available in artifact environment |
| Animation | CSS keyframes + transitions | No external dependency needed |
| SVG Diagrams | Inline SVG (React) | For angle-wedge / point diagrams |
| Persistence | `localStorage` | Session state, no backend needed |
| Audio (Primary) | ElevenLabs API | Premium, consistent voice (Alice) |
| Audio (Playback) | HTML5 Audio API (`new Audio()`) | Browser-native, no library needed |
| Math | Vanilla JS | No library required |
| Build Tool | Vite | Matches repo (`vite.config.js` present) |

═══════════════════════════════════════════════════════════════════════════════

## 3. Project Structure (mirrors the `equal` repo)

```
angles-around-a-point/
├── public/
│   ├── assets/
│   │   ├── audio/                      # Pre-generated .mp3 files (ElevenLabs)
│   │   │   ├── audio_wonder_hook_0.mp3
│   │   │   ├── audio_story_panel1_0.mp3
│   │   │   ├── audio_story_panel2_0.mp3
│   │   │   ├── audio_story_panel3_0.mp3
│   │   │   ├── audio_story_panel4_0.mp3
│   │   │   ├── audio_story_panel5_0.mp3
│   │   │   ├── audio_story_panel6_0.mp3
│   │   │   ├── audio_station_a_instruction_0.mp3
│   │   │   ├── audio_station_b_instruction_0.mp3
│   │   │   ├── audio_station_c_instruction_0.mp3
│   │   │   ├── audio_correct_0.mp3
│   │   │   ├── audio_reflect_prompt_0.mp3
│   │   │   └── ... (all phase phrases pre-generated)
│   │   └── images/
│   │       ├── mascot-idle.svg
│   │       ├── mascot-happy.svg
│   │       ├── mascot-thinking.svg
│   │       ├── mascot-celebrate.svg
│   │       └── world-map-bg.svg
├── src/
│   ├── main.jsx                         # React entry point
│   ├── App.jsx                          # Root component, global state (useReducer)
│   ├── App.css                          # Global styles (mirrors equal-tau CSS)
│   ├── components/
│   │   ├── IntroScreen.jsx              # Welcome + lesson overview + phase dot tracker
│   │   ├── ProgressMap.jsx              # 5-phase dot tracker (top bar)
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx          # Phase 1: Hook animation + ElevenLabs narration
│   │   │   ├── StoryPhase.jsx           # Phase 2: Illustrated narrative panels
│   │   │   ├── SimulatePhase.jsx        # Phase 3: Simulation station wrapper
│   │   │   ├── PlayPhase.jsx            # Phase 4: IntelliPlay™ quiz engine
│   │   │   └── ReflectPhase.jsx         # Phase 5: Journal + completion badge
│   │   ├── simulations/
│   │   │   ├── SpinCircleStation.jsx    # Station A: drag wedges to close 360° circle
│   │   │   ├── BalanceLineStation.jsx   # Station B: see-saw arm balancing to 180°
│   │   │   └── MirrorMatchStation.jsx   # Station C: vertically-opposite match + equation
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx     # Polymorphic dispatcher → type-specific component
│   │   │   ├── FindPointAngleQ.jsx      # Q1: find missing angle at a point
│   │   │   ├── FindLineAngleQ.jsx       # Q2: find missing angle on a straight line
│   │   │   ├── TrueFalseSumQ.jsx        # Q3: True/False — angles sum correctly?
│   │   │   ├── VerticalOppositeQ.jsx    # Q4: find vertically opposite angle
│   │   │   ├── WordProblemPointQ.jsx    # Q5: real-world point-sum word problem
│   │   │   ├── PictureSumMCQ.jsx        # Q6: tap diagram that sums correctly
│   │   │   ├── AlgebraicPointQ.jsx      # Q7: multi-step algebraic (find x)
│   │   │   ├── LineThreePartQ.jsx       # Q8: three angles on a straight line
│   │   │   ├── ReasoningWhyMCQ.jsx      # Q9: conceptual "why" MCQ
│   │   │   ├── MixedApplicationQ.jsx    # Q10: combined point + line + vertical
│   │   │   └── HintOverlay.jsx          # Hint 1 & 2 + animated explanation after 3 fails
│   │   ├── gamification/
│   │   │   ├── XPTracker.jsx            # XP bar + floating XP animation
│   │   │   ├── StarRating.jsx           # 1–3 star rating per world
│   │   │   ├── BadgePanel.jsx           # Badge unlock toast + panel
│   │   │   ├── StreakCounter.jsx        # Fire streak counter
│   │   │   └── WorldMap.jsx             # 10-world progress map (horizontal scroll)
│   │   └── shared/
│   │       ├── Mascot.jsx               # LearnFlow robot with mood states
│   │       ├── AngleDiagram.jsx         # Reusable SVG: wedges/arcs around a point
│   │       ├── LineDiagram.jsx          # Reusable SVG: straight-line angle pair
│   │       ├── CrossingLinesDiagram.jsx # Reusable SVG: 2 crossing lines, 4 angles
│   │       ├── WedgeTray.jsx            # Draggable angle-wedge source tray
│   │       ├── NumberPad.jsx            # Large tap-friendly digit input (0–9)
│   │       └── FeedbackOverlay.jsx      # Correct/incorrect overlay with animation
│   ├── data/
│   │   ├── questionBank.js              # 100 question objects (all types)
│   │   └── storyContent.js              # Story phase panel data (text + visuals)
│   ├── hooks/
│   │   ├── useAudio.js                  # ElevenLabs + HTML5 Audio playback hook
│   │   ├── useGameState.js              # Gamification state hook
│   │   └── useLocalStorage.js           # Session persistence hook (24hr resume)
│   └── utils/
│       ├── audioMap.js                  # AUTO-GENERATED: text → .mp3 path map
│       ├── shuffle.js                   # Fisher–Yates randomisation
│       ├── scoring.js                   # XP + star calculation + distractor gen
│       ├── angleMath.js                 # Angle-sum / vertical-opposite helper functions
│       └── badgeEngine.js               # Badge unlock condition logic
├── scripts/
│   ├── generate_audio.js                # Offline ElevenLabs audio pre-generation
│   └── clean_audio.js                   # Remove orphaned .mp3 files
├── api/
│   └── elevenlabs.js                    # ElevenLabs proxy (if server-side key needed)
├── index.html
├── package.json
├── vite.config.js
└── .gitignore
```

═══════════════════════════════════════════════════════════════════════════════

## 4. Application State Architecture

### 4.1 Global State (`App.jsx` — `useReducer`)

```javascript
const initialState = {
  // Navigation
  phase: 'intro',              // 'intro'|'wonder'|'story'|'simulate'|'play'|'reflect'|'results'
  storyPanel: 0,                // 0–5 (6 story panels)
  currentSimStation: 0,         // 0=SpinCircle, 1=BalanceLine, 2=MirrorMatch
  simStationsComplete: [false, false, false],
  simRound: 0,                  // Round index within current station (0–3)

  // Play / Challenge phase
  questionSet: [],              // 100 shuffled Question objects
  currentQuestion: 0,           // 0–99
  currentWorld: 0,               // 0–9 (10 worlds)
  worldScores: Array(10).fill(null),
  hintsUsed: 0,
  attemptCount: 0,               // Attempts on current question (max 3)

  // Gamification
  xp: 0,
  totalStars: 0,
  streak: 0,
  maxStreak: 0,
  badges: [],                    // Array of unlocked badge IDs
  mirrorMatchNoHintCount: 0,     // Tracks "Mirror Master" badge progress
  straightLineStreak: 0,         // Tracks "Straight Shooter" badge progress

  // Session metadata
  phaseComplete: {
    wonder: false, story: false, simulate: false,
    play: false, reflect: false,
  },
  sessionId: crypto.randomUUID(),

  // Settings
  audioEnabled: true,             // ElevenLabs narration on/off
  musicEnabled: false,            // Background ambient music (off by default)
};
```

### 4.2 Reducer Action Types

```javascript
const ACTIONS = {
  SET_PHASE: 'SET_PHASE',
  NEXT_STORY_PANEL: 'NEXT_STORY_PANEL',
  ADVANCE_SIM_STATION: 'ADVANCE_SIM_STATION',
  COMPLETE_SIM_STATION: 'COMPLETE_SIM_STATION',
  NEXT_SIM_ROUND: 'NEXT_SIM_ROUND',
  LOAD_QUESTIONS: 'LOAD_QUESTIONS',
  ANSWER_CORRECT: 'ANSWER_CORRECT',
  ANSWER_INCORRECT: 'ANSWER_INCORRECT',
  USE_HINT: 'USE_HINT',
  NEXT_QUESTION: 'NEXT_QUESTION',
  UNLOCK_BADGE: 'UNLOCK_BADGE',
  COMPLETE_PHASE: 'COMPLETE_PHASE',
  TOGGLE_AUDIO: 'TOGGLE_AUDIO',
  TOGGLE_MUSIC: 'TOGGLE_MUSIC',
  RESTORE_SESSION: 'RESTORE_SESSION',
  RESET_SESSION: 'RESET_SESSION',
};
```

### 4.3 Key Reducer Logic

```javascript
// ANSWER_CORRECT dispatch
case ACTIONS.ANSWER_CORRECT: {
  const xpEarned = calcXP(state.attemptCount + 1, state.hintsUsed, state.streak);
  const newStreak = state.streak + 1;
  const worldIndex = Math.floor(state.currentQuestion / 10);
  const newWorldScore = (state.worldScores[worldIndex] || 0) + 1;
  const updatedWorldScores = [...state.worldScores];
  updatedWorldScores[worldIndex] = newWorldScore;

  return {
    ...state,
    xp: state.xp + xpEarned,
    streak: newStreak,
    maxStreak: Math.max(state.maxStreak, newStreak),
    worldScores: updatedWorldScores,
    totalStars: calcTotalStars(updatedWorldScores),
    hintsUsed: 0,
    attemptCount: 0,
  };
}

// ANSWER_INCORRECT dispatch
case ACTIONS.ANSWER_INCORRECT: {
  return {
    ...state,
    streak: 0,
    attemptCount: state.attemptCount + 1,
  };
}
```

═══════════════════════════════════════════════════════════════════════════════

## 5. Question Data Model

### 5.1 Question Schema

```typescript
interface Question {
  id: string;                    // e.g. "Q1_003", "Q7_008"
  type: QuestionType;            // One of 10 enum values (see below)
  world: number;                 // 0–9 (which world this belongs to)
  difficulty: 1 | 2 | 3;         // 1=easy, 2=medium, 3=hard

  // Core geometry values
  factType: 'point360' | 'line180' | 'verticalOpposite' | 'mixed';
  knownAngles: number[];         // Angles given in the diagram
  missingAngle: number;          // The angle to be found
  totalRule: 360 | 180;          // Which sum rule applies (mixed = both)

  // Rendering
  questionText: string;          // Full narrated question text (ElevenLabs reads this)
  visual: VisualType;            // 'pointDiagram' | 'lineDiagram' | 'crossLines' | 'picture' | 'sentence'

  // MCQ
  options?: (number|string)[];   // 4 MCQ options (always includes correctAnswer)

  // Hints
  hint1: string;                 // Shown after 1 wrong attempt
  hint2: string;                 // Shown after 2 wrong attempts (animation trigger)
  explanation: string;           // Full text explanation after 3 fails (read aloud)

  // Word problems only
  characterName?: string;
  objectName?: string;           // 'pizza', 'pinwheel', 'kite', 'fan', 'road'

  // True/False only
  isTrue?: boolean;

  // Answer
  correctAnswer: number | string;
}

type QuestionType =
  | 'find_point_angle'      // Q1: find missing angle at a point (360°)
  | 'find_line_angle'       // Q2: find missing angle on a straight line (180°)
  | 'true_false_sum'        // Q3: True/False — do angles sum correctly?
  | 'vertical_opposite'     // Q4: find vertically opposite angle
  | 'word_problem_point'    // Q5: real-world point-sum word problem
  | 'picture_sum_mcq'       // Q6: tap the diagram that sums correctly
  | 'algebraic_point'       // Q7: multi-step algebraic (find x)
  | 'line_three_part'       // Q8: three angles on a straight line
  | 'reasoning_why'         // Q9: conceptual "why" MCQ
  | 'mixed_application';    // Q10: combined point + line + vertical

type VisualType =
  | 'pointDiagram'    // SVG wedges around a point (AngleDiagram)
  | 'lineDiagram'     // SVG straight line with two angle arcs (LineDiagram)
  | 'crossLines'      // SVG two crossing lines, 4 angles (CrossingLinesDiagram)
  | 'picture'         // Static real-world illustration card
  | 'sentence';       // "___ + ___ = 360°" with highlighted blank
```

### 5.2 Sample Question Objects

```javascript
// Q1 — Find Missing Angle at a Point
{
  id: "Q1_001",
  type: "find_point_angle",
  world: 0,
  difficulty: 1,
  factType: "point360",
  knownAngles: [120, 150],
  missingAngle: 90,
  totalRule: 360,
  questionText: "Three angles meet at a point: 120 degrees, 150 degrees, and an unknown angle. What is the missing angle?",
  visual: "pointDiagram",
  hint1: "Add the two angles you know: 120 + 150.",
  hint2: "120 + 150 = 270. Now subtract from 360: 360 - 270 = 90.",
  explanation: "Angles around a point add up to 360 degrees. 360 - 120 - 150 = 90.",
  options: [90, 100, 110, 120],
  correctAnswer: 90,
}

// Q5 — Word Problem (Point Sum, Real World)
{
  id: "Q5_004",
  type: "word_problem_point",
  world: 4,
  difficulty: 2,
  factType: "point360",
  knownAngles: [70, 65, 75, 60],
  missingAngle: 90,
  totalRule: 360,
  questionText: "Sarah's pizza has 5 slices meeting at the centre. Four of them measure 70, 65, 75, and 60 degrees. What is the fifth slice's angle?",
  visual: "picture",
  characterName: "Sarah",
  objectName: "pizza",
  hint1: "Add up the four angles you know first.",
  hint2: "70 + 65 + 75 + 60 = 270. Now subtract from 360: 360 - 270 = 90.",
  explanation: "All five slices meet at the centre point, so they must add up to 360 degrees. 360 - 270 = 90.",
  options: [80, 85, 90, 95],
  correctAnswer: 90,
}

// Q7 — Algebraic (Find x)
{
  id: "Q7_006",
  type: "algebraic_point",
  world: 5,
  difficulty: 3,
  factType: "point360",
  knownAngles: [90, 130],
  missingAngle: 70,   // corresponds to 2x = 140, x = 70... adjust per design
  totalRule: 360,
  questionText: "Three angles at a point are 2x degrees, 90 degrees, and 130 degrees. If they add up to 360 degrees, find x.",
  visual: "sentence",
  hint1: "First add the two known angles: 90 + 130.",
  hint2: "90 + 130 = 220. So 2x = 360 - 220 = 140. Divide by 2 to find x.",
  explanation: "2x + 90 + 130 = 360, so 2x = 140, and x = 70.",
  options: [60, 65, 70, 75],
  correctAnswer: 70,
}

// Q4 — Vertically Opposite Angle
{
  id: "Q4_002",
  type: "vertical_opposite",
  world: 2,
  difficulty: 1,
  factType: "verticalOpposite",
  knownAngles: [48],
  missingAngle: 48,
  totalRule: 180,
  questionText: "Two straight lines cross at a point. One angle measures 48 degrees. What is the angle directly opposite it?",
  visual: "crossLines",
  hint1: "Vertically opposite angles are always equal.",
  hint2: "The angle across from 48 degrees is also 48 degrees.",
  explanation: "Vertically opposite angles are always equal, so the opposite angle is also 48 degrees.",
  options: [42, 48, 132, 138],
  correctAnswer: 48,
}
```

═══════════════════════════════════════════════════════════════════════════════

## 6. Angle Diagram SVG Components

### 6.1 `AngleDiagram.jsx` — wedges/arcs around a point

```javascript
// AngleDiagram.jsx — reusable SVG for N angles around a point summing to 360°
const AngleDiagram = ({
  angles,           // array of angle values in degrees, e.g. [120, 150, 90]
  missingIndex,     // index of the unknown angle, or -1 if none
  animated = false,
  size = 'medium',  // 'small' | 'medium' | 'large'
}) => {
  const radius = size === 'large' ? 120 : size === 'medium' ? 90 : 64;
  const cx = radius + 20;
  const cy = radius + 20;
  const svgSize = (radius + 20) * 2;

  let startAngle = -90; // start at top, degrees, SVG convention (0 = 3 o'clock)
  const wedges = angles.map((deg, i) => {
    const endAngle = startAngle + deg;
    const path = describeArc(cx, cy, radius, startAngle, endAngle);
    const midAngle = (startAngle + endAngle) / 2;
    const labelPos = polarToCartesian(cx, cy, radius * 0.65, midAngle);
    const wedge = {
      path,
      color: `hsl(${(i * 60) % 360}, 70%, 65%)`,
      deg,
      labelPos,
      isMissing: i === missingIndex,
    };
    startAngle = endAngle;
    return wedge;
  });

  return (
    <svg viewBox={`0 0 ${svgSize} ${svgSize}`} xmlns="http://www.w3.org/2000/svg"
         style={{ maxWidth: '100%', height: 'auto' }}>
      {wedges.map((w, i) => (
        <g key={i} className={animated ? 'wedge-sweep-in' : ''}
           style={{ animationDelay: `${i * 150}ms` }}>
          <path d={w.path} fill={w.isMissing ? 'transparent' : w.color}
                stroke={w.color} strokeWidth="2"
                strokeDasharray={w.isMissing ? '6,4' : '0'} />
          <text x={w.labelPos.x} y={w.labelPos.y} textAnchor="middle"
                fontSize="16" fontWeight="600" fill="#333">
            {w.isMissing ? '?' : `${w.deg}°`}
          </text>
        </g>
      ))}
      <circle cx={cx} cy={cy} r="4" fill="#333" />
      <text x={cx} y={svgSize - 8} textAnchor="middle" fontSize="15"
            fill="#333" fontWeight="bold">
        {`${angles.map(a => (a === angles[missingIndex] ? '?' : `${a}°`)).join(' + ')} = 360°`}
      </text>
    </svg>
  );
};

// Helper: convert polar coordinates to cartesian
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

// Helper: build SVG arc path (pie-slice wedge) between two angles
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return [
    `M ${cx} ${cy}`,
    `L ${start.x} ${start.y}`,
    `A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    'Z',
  ].join(' ');
}
```

### 6.2 `LineDiagram.jsx` — straight-line angle pair (180°)

- Renders a horizontal line with a single ray from a midpoint, splitting
  it into two labelled angle arcs
- `missingSlot: 'left' | 'right'` determines which side shows `?`
- Same `wedge-sweep-in` animation convention as `AngleDiagram`

### 6.3 `CrossingLinesDiagram.jsx` — vertically opposite angles

- Renders two crossing straight lines forming 4 quadrant angles (a, b, c, d)
- Accepts `highlightPair: [0,2] | [1,3] | null` to visually connect the
  vertically-opposite pair with a dotted arc (used by Station C's "Match"
  step)
- Each quadrant angle is tappable; emits `onSelect(index)` for the match
  interaction

### 6.4 Animation Variants

- `animated=true` → CSS `wedgeSweepIn` keyframe: each wedge/arc sweeps
  into place with a 150ms stagger per wedge
- `shake` variant → CSS `shake` keyframe applied to the `<svg>` wrapper on
  a wrong answer
- `bounce` variant → CSS `bounceIn` keyframe applied to the `<svg>`
  wrapper on a correct answer

═══════════════════════════════════════════════════════════════════════════════

## 7. Simulation Station Component Specs

### 7.1 `SpinCircleStation.jsx` — Station A (Concrete)

**State:**
```javascript
const [roundConfig, setRoundConfig] = useState(getStationARound(state.simRound));
// roundConfig: { knownAngles: [90, 120], missingAngle: 150 }

const [placedWedges, setPlacedWedges] = useState([]); // wedges placed so far
const [runningTotal, setRunningTotal] = useState(0);
```

**Interaction (Drag):**
- `WedgeTray` renders draggable wedge chips, each with a resizable handle
  (snaps to 5° increments, range 5°–355°)
- Dropping a wedge onto the circle appends it to `placedWedges` at the
  next available angular position
- `runningTotal` recalculates on every drop/resize

**Interaction (Tap fallback):**
- Tap a wedge chip in the tray → wedge becomes "selected" (glows)
- Tap the circle → wedge snaps into the next open position
- Tap-and-hold on the wedge's edge + arrow buttons → resize by ±5°

**Completion Check:**
```javascript
const isComplete = runningTotal === 360 && placedWedges.length === roundConfig.knownAngles.length + 1;
```
- Submit button appears only when the circle is visually closed (no gap)
- On submit correct: mascot spins and cheers, ElevenLabs plays celebration audio
- On submit incorrect (over/under 360): wobble + narration "Not quite a
  full turn yet — let's adjust!"

**Station A Rounds (4 rounds, randomised order):**
```javascript
[
  { knownAngles: [90, 120], missingAngle: 150 },
  { knownAngles: [80, 95, 100], missingAngle: 85 },
  { knownAngles: [110, 70, 90], missingAngle: 90 },
  { knownAngles: [60, 70, 80, 95], missingAngle: 55 },
]
```

### 7.2 `BalanceLineStation.jsx` — Station B (Pictorial)

**State:**
```javascript
const [pivotPosition, setPivotPosition] = useState(50); // 0-100 slider
const [leftAngle, setLeftAngle] = useState(90);
const [rightAngle, setRightAngle] = useState(90);
const [fixedRound, setFixedRound] = useState(getStationBRound(state.simRound));
// fixedRound: { fixedSide: 'left', fixedValue: 65, targetValue: 115 }
```

**Interaction:**
- Student drags the pivot arm (implemented as a range input styled as a
  see-saw) left/right
- `leftAngle` / `rightAngle` recompute live: `rightAngle = 180 - leftAngle`
- A "Lock it in!" button submits the current position within a small
  tolerance (±2°) of the target

**Feedback:**
- Balanced within tolerance → mascot claps, "Balanced perfectly — that's
  a half turn!"
- Outside tolerance → "So close! A straight line always totals 180°. Try
  again!"

**Rounds (3 rounds per station):**
```javascript
[
  { fixedSide: 'left', fixedValue: 90, targetValue: 90 },
  { fixedSide: 'left', fixedValue: 65, targetValue: 115 },
  { fixedSide: 'right', fixedValue: 38, targetValue: 142 },
]
```

### 7.3 `MirrorMatchStation.jsx` — Station C (Abstract)

**State:**
```javascript
const [diagram, setDiagram] = useState(getStationCRound(state.simRound));
// diagram: { angles: [55, 125, 55, 125], givenIndex: 0, targetIndex: 2, mode: 'vertical' | 'linear' }
const [selectedPair, setSelectedPair] = useState([]);
const [matchConfirmed, setMatchConfirmed] = useState(false);
const [inputValue, setInputValue] = useState('');
```

**Interaction — Step 1 (Match):**
- Student taps two of the four quadrant angles in `CrossingLinesDiagram`
- Correct vertically-opposite pair → dotted arc animates in, `matchConfirmed = true`
- Incorrect pair → both flash red for 400ms, `selectedPair` resets

**Interaction — Step 2 (Equation):**
- After `matchConfirmed`, an equation bar appears (e.g. `∠x = 55°` or
  `∠a + 125° = 180°`)
- `NumberPad` captures the answer; "Show me the lines" toggles a
  highlight replay of the diagram

**Variants (rotated per round):**
```javascript
[
  { mode: 'vertical', given: 55, findVerticalOpposite: true },
  { mode: 'linear', given: 125, findLinearPair: true },
  { mode: 'twoStep', given: 48, findVerticalOpposite: true, thenFindLinearPair: true },
]
```

ElevenLabs reads the full equation aloud when displayed:
> "Angle x equals fifty-five degrees. Is that right? Type the answer!"

═══════════════════════════════════════════════════════════════════════════════

## 8. Audio Pipeline (ElevenLabs — Matching `audio_generation_pipeline.md`)

### 8.1 Voice Configuration

- **Voice Name:** Alice
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`
- **API Key Var:** `VITE_ELEVENLABS_API_KEY` (in `.env.local`)

### 8.2 Speech Style Settings (identical values to the source pipeline document)

| Style | stability | similarity_boost | style | use_speaker_boost |
|---|---|---|---|---|
| `celebration` | 0.12 | 0.45 | 0.75 | true |
| `encouragement` | 0.16 | 0.50 | 0.65 | true |
| `question` | 0.20 | 0.55 | 0.55 | true |
| `emphasis` | 0.16 | 0.50 | 0.60 | true |
| `thinking` | 0.24 | 0.60 | 0.35 | true |
| `statement` / `instruction` | 0.20 | 0.55 | 0.50 | true |

### 8.3 Offline Pre-generation Script (`scripts/generate_audio.js`)

```javascript
const phrases = [
  // Phase 1 — Wonder
  { text: "John is building a paper pinwheel. It has four blades meeting at the centre point.", style: 'thinking' },
  { text: "He measures three of the angles: ninety, eighty, and seventy degrees. What is the fourth angle?", style: 'question' },
  { text: "Let's discover the secret number that all angles around a point share!", style: 'encouragement' },

  // Phase 2 — Story Panels
  { text: "Sarah cuts a round pizza into slices that all meet at the centre point.", style: 'statement' },
  { text: "No matter how many slices, all the angles at the centre always add up to three hundred and sixty degrees — one full turn!", style: 'emphasis' },
  { text: "Ninety plus one hundred plus ninety-five equals two hundred and eighty-five. So the missing slice must be seventy-five degrees!", style: 'statement' },
  { text: "Now Mike looks at a straight road. Two roads branch off it at angles of one hundred and ten degrees and seventy degrees.", style: 'statement' },
  { text: "A straight line is a half turn — always one hundred and eighty degrees. One hundred and ten plus seventy equals one hundred and eighty. It checks out!", style: 'emphasis' },

  // Phase 3 — Simulation Instructions
  { text: "Drag the wedges around the point until the circle closes at three hundred and sixty degrees.", style: 'instruction' },
  { text: "Drag the arm until the two angles balance to one hundred and eighty degrees.", style: 'instruction' },
  { text: "Tap the two angles that are directly opposite each other across the crossing point.", style: 'instruction' },

  // Phase 4 — Feedback
  { text: "Yes! That's exactly right — you found the missing angle!", style: 'celebration' },
  { text: "Not quite — let's look at the angles again.", style: 'encouragement' },
  { text: "Let's add the angles we know together first.", style: 'thinking' },

  // Phase 5 — Reflect
  { text: "What a journey today! Can you draw a point with three angles and explain why they add up to three hundred and sixty degrees?", style: 'thinking' },
  { text: "Lesson complete! You are a Three Sixty Degree Champion!", style: 'celebration' },

  // Badge unlocks
  { text: "Badge unlocked! You are an Angle Explorer!", style: 'celebration' },
  { text: "Badge unlocked! Circle Builder! You completed all three stations!", style: 'celebration' },
  { text: "Badge unlocked! Three Sixty Degree Champion! You scored over eighty percent!", style: 'celebration' },
];

// Reads .env.local's VITE_ELEVENLABS_API_KEY, hits the ElevenLabs TTS API
// per phrase using the per-style voice_settings table above, rate-limited
// at 500ms between calls, saves .mp3 to public/assets/audio/, and
// auto-generates src/utils/audioMap.js.
```

### 8.4 Audio Mapping (`src/utils/audioMap.js` — auto-generated)

```javascript
// AUTO-GENERATED by scripts/generate_audio.js — do not edit by hand
export const audioMap = {
  "John is building a paper pinwheel. It has four blades meeting at the centre point.":
    "/assets/audio/audio_wonder_hook_0.mp3",
  "Yes! That's exactly right — you found the missing angle!":
    "/assets/audio/audio_correct_0.mp3",
  // ...one entry per pre-generated phrase
};
```

### 8.5 Audio Engine (`src/utils/audio.js`)

```javascript
// Segment helpers (mirroring the reference pipeline's say/ask/cheer/etc.)
export const say        = (text) => ({ text, style: 'statement' });
export const instruct    = (text) => ({ text, style: 'instruction' });
export const ask        = (text) => ({ text, style: 'question' });
export const emphasize   = (text) => ({ text, style: 'emphasis' });
export const think      = (text) => ({ text, style: 'thinking' });
export const cheer       = (text) => ({ text, style: 'encouragement' });
export const celebrate   = (text) => ({ text, style: 'celebration' });

const elevenLabsCache = new Map(); // in-memory; cleared on refresh
let currentQueue = Symbol();       // prevents overlapping narration

export async function getAudioUrl(text, style = 'statement') {
  if (audioMap[text]) return audioMap[text];               // 1. static map
  const cacheKey = `${text}::${style}`;
  if (elevenLabsCache.has(cacheKey)) return elevenLabsCache.get(cacheKey); // 2. memory cache

  const apiKey = import.meta.env.VITE_ELEVENLABS_API_KEY;
  if (!apiKey) return null;                                  // 3. silent skip, no fallback

  const settings = STYLE_SETTINGS[style] ?? STYLE_SETTINGS.statement;
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/Xb7hH8MSUJpSbSDYk0k2`,
      {
        method: 'POST',
        headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text, model_id: 'eleven_multilingual_v2', voice_settings: settings,
        }),
      }
    );
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    elevenLabsCache.set(cacheKey, url);
    return url;
  } catch {
    return null; // never block the UX on network failure
  }
}

export async function narrate(segments, autoAdvance = true) {
  const myQueue = (currentQueue = Symbol());
  for (let i = 0; i < segments.length; i++) {
    if (myQueue !== currentQueue) return; // a newer narrate() call took over
    const { text, style } = segments[i];
    const url = await getAudioUrl(text, style);
    if (i + 1 < segments.length) {
      getAudioUrl(segments[i + 1].text, segments[i + 1].style); // eager preload
    }
    if (url) await playAudio(url, myQueue);
  }
}

export function stopNarration() {
  currentQueue = Symbol(); // invalidates any in-flight narrate() loop
}

function playAudio(url, myQueue) {
  return new Promise((resolve) => {
    const audio = new Audio(url);
    audio.onended = resolve;
    audio.onerror = resolve;
    if (myQueue !== currentQueue) return resolve();
    audio.play().catch(resolve);
  });
}
```

### 8.6 Narration Scripts (`src/utils/narration.js`)

```javascript
import { say, instruct, ask, emphasize, think, cheer, celebrate } from './audio';

export function wonderNarration() {
  return [
    think("John is building a paper pinwheel. It has four blades meeting at the centre point."),
    ask("He measures three of the angles: ninety, eighty, and seventy degrees. What is the fourth angle?"),
    cheer("Let's discover the secret number that all angles around a point share!"),
  ];
}

export function storyNarration() {
  return [
    say("Sarah cuts a round pizza into slices that all meet at the centre point."),
    emphasize("No matter how many slices, all the angles at the centre always add up to three hundred and sixty degrees — one full turn!"),
    say("Ninety plus one hundred plus ninety-five equals two hundred and eighty-five. So the missing slice must be seventy-five degrees!"),
    say("Now Mike looks at a straight road. Two roads branch off it at angles of one hundred and ten degrees and seventy degrees."),
    emphasize("A straight line is a half turn — always one hundred and eighty degrees. One hundred and ten plus seventy equals one hundred and eighty. It checks out!"),
  ];
}

export function stationAIntroNarration() {
  return [instruct("Drag the wedges around the point until the circle closes at three hundred and sixty degrees.")];
}

export function stationBIntroNarration() {
  return [instruct("Drag the arm until the two angles balance to one hundred and eighty degrees.")];
}

export function stationCIntroNarration() {
  return [instruct("Tap the two angles that are directly opposite each other across the crossing point.")];
}

export function reflectPromptNarration() {
  return [think("What a journey today! Can you draw a point with three angles and explain why they add up to three hundred and sixty degrees?")];
}

// NOTE: Only paragraph/question text is ever narrated. Titles, headings,
// and phase labels ("Phase 3: Simulate", "Station A") are NEVER passed
// to narrate() — enforced by code review checklist in Section 15.
```

### 8.7 Audio Cleanup (`scripts/clean_audio.js`)

- Imports `audioMap.js` to determine all valid referenced `.mp3` paths
- Scans `public/assets/audio/` for all `.mp3` files
- Deletes any `.mp3` not present in `audioMap` (orphaned files)
- Run after any phrase deletion or text edit in `generate_audio.js`

### 8.8 Workflow: Updating or Adding Narration (identical to source pipeline)

1. Add the new exact text + intended style to the `phrases` array in
   `scripts/generate_audio.js`
2. Run `node scripts/generate_audio.js` to hit ElevenLabs, save the `.mp3`,
   and update `audioMap.js`
3. Optionally run `node scripts/clean_audio.js` to remove orphaned files
4. Add the identical text string to the relevant function in
   `src/utils/narration.js`, using the matching helper (`say`, `ask`,
   `instruct`, etc.)
5. Wire the component:
```javascript
import { narrate, stopNarration } from '../utils/audio';
import { wonderNarration } from '../utils/narration';

useEffect(() => {
  if (audioEnabled) narrate(wonderNarration());
  return () => stopNarration();
}, [audioEnabled]);
```
*Note: the text passed to `say()`/`ask()`/etc. must perfectly match the
text rendered in the UI component (1:1 strict parity, per Section 11.4 of
the PRD).*

### 8.9 Dynamic Generation (Play Phase)

Practice questions not present in `audioMap.js` are generated dynamically
via `getAudioUrl()`, using the same per-style settings, and cached in
`elevenLabsCache` for the remainder of the session. If
`VITE_ELEVENLABS_API_KEY` is absent, narration is silently skipped — there
is no browser Web Speech API fallback.

═══════════════════════════════════════════════════════════════════════════════

## 9. Randomisation Engine

### 9.1 Fisher–Yates Shuffle (`utils/shuffle.js`)

```javascript
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function generateSessionQuestions(bank) {
  const byType = {};
  bank.forEach(q => {
    if (!byType[q.type]) byType[q.type] = [];
    byType[q.type].push(q);
  });
  // Pick 10 from each type (shuffled), then shuffle the combined 100
  const selected = Object.values(byType)
    .flatMap(qs => shuffleArray(qs).slice(0, 10));
  return shuffleArray(selected);
}
```

### 9.2 MCQ Distractor Generation (`utils/scoring.js`)

```javascript
export function generateDistractors(correct, min = 0, max = 360, count = 3) {
  const distractors = new Set();
  // Strategy: plausible arithmetic-slip values
  // e.g. subtracting from 180 instead of 360, or off by a common increment
  const candidates = [
    180 - correct,             // "used the wrong total" slip
    correct + 10, correct - 10,
    correct + 5, correct - 5,
  ].filter(v => v >= min && v <= max && v !== correct);

  shuffleArray(candidates).forEach(v => {
    if (distractors.size < count) distractors.add(v);
  });
  while (distractors.size < count) {
    const d = correct + (distractors.size + 1) * 5;
    if (d <= max && d !== correct) distractors.add(d);
  }
  return shuffleArray([correct, ...distractors]);
}
```

### 9.3 Angle Math Helpers (`utils/angleMath.js`)

```javascript
export function sumsToPoint(angles) {
  return angles.reduce((a, b) => a + b, 0) === 360;
}

export function sumsToLine(angles) {
  return angles.reduce((a, b) => a + b, 0) === 180;
}

export function findMissingAtPoint(knownAngles) {
  return 360 - knownAngles.reduce((a, b) => a + b, 0);
}

export function findMissingOnLine(knownAngle) {
  return 180 - knownAngle;
}

export function verticalOpposite(angle) {
  return angle; // vertically opposite angles are always equal
}

export function linearPair(angle) {
  return 180 - angle;
}
```

### 9.4 Session Persistence (24-hour resume)

```javascript
const SESSION_KEY = 'intellia_angles_point_v1';

// On app mount: restore if within 24 hours
const saved = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
if (saved && Date.now() - saved.timestamp < 86400000) {
  dispatch({ type: ACTIONS.RESTORE_SESSION, payload: saved });
}

// On every state change: persist progress
useEffect(() => {
  localStorage.setItem(SESSION_KEY, JSON.stringify({
    phase: state.phase,
    storyPanel: state.storyPanel,
    simStationsComplete: state.simStationsComplete,
    currentQuestion: state.currentQuestion,
    xp: state.xp,
    streak: state.streak,
    maxStreak: state.maxStreak,
    badges: state.badges,
    worldScores: state.worldScores,
    phaseComplete: state.phaseComplete,
    timestamp: Date.now(),
  }));
}, [state]);
```

═══════════════════════════════════════════════════════════════════════════════

## 10. Gamification Implementation

### 10.1 XP Calculation (`utils/scoring.js`)

```javascript
export function calcXP(attemptNumber, hintsUsed, streak) {
  const base = attemptNumber === 1 ? 10 : hintsUsed > 0 ? 5 : 7;
  const streakBonus = streak >= 5 ? 5 : 0;
  return base + streakBonus;
}
```

### 10.2 Star Rating (per world of 10 questions)

```javascript
export function calcStars(correct, total = 10) {
  if (correct >= 9) return 3; // Gold: ≥90%
  if (correct >= 7) return 2; // Silver: ≥70%
  if (correct >= 5) return 1; // Bronze: ≥50% (world unlock gate)
  return 0;                    // Try again
}

export function canUnlockWorld(worldScore) {
  return worldScore !== null && worldScore >= 5;
}

export function calcTotalStars(worldScores) {
  return worldScores.reduce((sum, ws) => sum + (ws !== null ? calcStars(ws) : 0), 0);
}
```

### 10.3 Badge Engine (`utils/badgeEngine.js`)

```javascript
export const BADGES = [
  {
    id: 'angle_explorer',
    label: '🧭 Angle Explorer',
    description: 'Complete Wonder and Story phases',
    condition: (s) => s.phaseComplete.wonder && s.phaseComplete.story,
  },
  {
    id: 'circle_builder',
    label: '🥈 Circle Builder',
    description: 'Complete all 3 Simulation stations',
    condition: (s) => s.simStationsComplete.every(Boolean),
  },
  {
    id: 'three_sixty_champion',
    label: '🥇 360° Champion',
    description: 'Score 80%+ in Play phase',
    condition: (s) => {
      const totalCorrect = s.worldScores.reduce((sum, ws) => sum + (ws || 0), 0);
      return totalCorrect >= 80;
    },
  },
  {
    id: 'perfect_point',
    label: '💎 Perfect Point',
    description: 'Score 10/10 in any world',
    condition: (s) => s.worldScores.some(ws => ws === 10),
  },
  {
    id: 'streak_star',
    label: '🔥 Streak Star',
    description: 'Achieve a streak of 10 consecutive correct answers',
    condition: (s) => s.maxStreak >= 10,
  },
  {
    id: 'full_journey',
    label: '🌟 Full Journey',
    description: 'Complete all 5 phases',
    condition: (s) => Object.values(s.phaseComplete).every(Boolean),
  },
  {
    id: 'mirror_master',
    label: '🎯 Mirror Master',
    description: 'Get 5 vertically-opposite-angle questions correct without a hint',
    condition: (s) => s.mirrorMatchNoHintCount >= 5,
  },
  {
    id: 'straight_shooter',
    label: '➖ Straight Shooter',
    description: 'Answer 5 straight-line (180°) questions correctly in a row',
    condition: (s) => s.straightLineStreak >= 5,
  },
];

export function checkBadges(state) {
  return BADGES
    .filter(b => !state.badges.includes(b.id) && b.condition(state))
    .map(b => b.id);
}

// Call after every state update that could unlock a badge:
const newBadges = checkBadges(newState);
if (newBadges.length > 0) {
  dispatch({ type: ACTIONS.UNLOCK_BADGE, payload: newBadges });
  newBadges.forEach(id => {
    const badge = BADGES.find(b => b.id === id);
    narrate([celebrate(badge.description)]);
  });
}
```

═══════════════════════════════════════════════════════════════════════════════

## 11. CSS Animation Keyframes (matching `equal-tau.vercel.app` style)

```css
@keyframes bounceIn {
  0%   { transform: scale(0.3); opacity: 0; }
  50%  { transform: scale(1.05); opacity: 1; }
  70%  { transform: scale(0.9); }
  100% { transform: scale(1); }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}

@keyframes floatUp {
  0%   { transform: translateY(0) scale(1); opacity: 1; }
  100% { transform: translateY(-60px) scale(1.5); opacity: 0; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 0 0 rgba(74, 144, 217, 0.4); }
  50%      { box-shadow: 0 0 0 12px rgba(74, 144, 217, 0); }
}

@keyframes celebrate {
  0%   { transform: rotate(-5deg) scale(1); }
  25%  { transform: rotate(5deg) scale(1.1); }
  50%  { transform: rotate(-3deg) scale(1.05); }
  75%  { transform: rotate(3deg) scale(1.1); }
  100% { transform: rotate(0deg) scale(1); }
}

@keyframes slideInUp {
  from { transform: translateY(30px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes wedgeSweepIn {
  /* Applied to each angle wedge with staggered delay */
  from { transform: scale(0.4) rotate(-15deg); opacity: 0; }
  to   { transform: scale(1) rotate(0deg); opacity: 1; }
}

@keyframes circleClosePop {
  0%   { transform: scale(0.9); opacity: 0.6; }
  60%  { transform: scale(1.06); }
  100% { transform: scale(1); opacity: 1; }
}

/* Stagger: each wedge/arc gets animation-delay: (index * 150ms) */
```

═══════════════════════════════════════════════════════════════════════════════

## 12. Component Prop Contracts

| Component | Props | Returns |
|---|---|---|
| `AngleDiagram` | `{ angles, missingIndex?, animated?, size? }` | SVG element (inline, responsive) |
| `LineDiagram` | `{ leftAngle, rightAngle, missingSlot?, animated?, size? }` | SVG element |
| `CrossingLinesDiagram` | `{ angles, highlightPair?, onSelect?, size? }` | SVG element with tappable quadrants |
| `WedgeTray` | `{ wedges, onDragStart, onTap, onResize }` | Flex row of draggable/tappable wedge chips |
| `NumberPad` | `{ max, value, onChange, onSubmit }` | Grid of digit buttons (min 44×44px), backspace, submit |
| `Mascot` | `{ mood: 'idle'\|'happy'\|'thinking'\|'celebrating'\|'encouraging' }` | img/svg + CSS animation class mapped to mood |
| `QuestionRenderer` | `{ question: Question, onAnswer: (answer) => void, hints: number }` | Type-specific question component |
| `FeedbackOverlay` | `{ isCorrect: boolean, explanation?: string, xpEarned: number, onContinue: () => void }` | Animated modal overlay (bounceIn correct / shake wrong) |
| `WorldMap` | `{ worldScores: (number\|null)[], currentWorld: number, onSelectWorld: (i) => void }` | Horizontal scrollable world list with star ratings and lock icons |
| `BadgePanel` | `{ badges: string[], newBadgeId?: string }` | Badge grid with unlock toast animation for `newBadgeId` |

═══════════════════════════════════════════════════════════════════════════════

## 13. Performance Requirements

| Metric | Target |
|---|---|
| Initial load time | < 2 seconds (Vite production build) |
| Time to first meaningful paint | < 1 second |
| SVG animation frame rate | 60 fps |
| Memory usage | < 60 MB |
| Bundle size (gzipped) | < 600 KB |
| Lighthouse Performance score | ≥ 90 |
| Lighthouse Accessibility score | ≥ 90 |
| ElevenLabs pre-gen audio TTFB | 0 ms (static .mp3 assets) |
| ElevenLabs dynamic audio TTFB | < 2 seconds (API latency) |

═══════════════════════════════════════════════════════════════════════════════

## 14. Browser & Device Support

| Environment | Support Level |
|---|---|
| Chrome 110+ (desktop) | Full |
| Safari 15+ (iPad) | Full — primary classroom device |
| Firefox 110+ | Full |
| Edge 110+ | Full |
| Android Chrome | Full |
| iOS Safari 15+ | Full |
| IE 11 | Not supported |

Primary test device: iPad (768px, touch) — classroom use context.
Secondary: Desktop Chrome (1280px+).

═══════════════════════════════════════════════════════════════════════════════

## 15. Quality Assurance & Testing Checklist

- [ ] All 100 questions render without runtime errors across all 10 types
- [ ] Fisher–Yates shuffle verified to produce no repeated session order
  across 20 consecutive test runs
- [ ] `AngleDiagram`, `LineDiagram`, `CrossingLinesDiagram` render correctly
  at 2–5 angle counts, including edge cases (e.g. a 5° sliver wedge)
- [ ] Station A: circle-close detection works within ±0° tolerance; wobble
  feedback fires correctly for over/under totals
- [ ] Station B: balance tolerance (±2°) verified against all 3 rounds
- [ ] Station C: vertically-opposite match logic verified against all
  4-angle configurations (0/2 and 1/3 pairs)
- [ ] Every narrated string in `narration.js` has a 1:1 exact match in the
  corresponding UI component (automated string-diff check in CI)
- [ ] No title, heading, or phase label is ever passed to `narrate()`
  (lint rule / code-review checklist item)
- [ ] `audioMap.js` contains no orphaned or missing entries after running
  `clean_audio.js`
- [ ] All 8 badges unlock under their exact stated conditions and not
  before
- [ ] World-unlock gate (≥6/10) verified for all 10 worlds
- [ ] Session resume restores state correctly within the 24-hour window and
  correctly discards it after expiry
- [ ] WCAG AA colour-contrast audit passed on all phase-band colours and
  text
- [ ] Full keyboard-only pass (Tab + Enter) completes all 5 phases without
  a mouse/touch input
- [ ] Responsive layout verified at 375px, 768px, and 1280px+ breakpoints
- [ ] Lighthouse Performance and Accessibility scores both ≥ 90 on
  production build

═══════════════════════════════════════════════════════════════════════════════

**Document Version:** 1.0 | August 2026
**Product:** Intellia — Grade 5 Math, Geometry Unit
**Lesson Title:** Angles Around a Point
**Reference UI:** `https://equal-tau.vercel.app/`
**Reference Repo:** `https://github.com/dsamyak/equal`
**Audio Pipeline Source:** `audio_generation_pipeline.md` (Number Bonds
Audio & Narration Pipeline), adapted for this lesson's scripts
**Parent Course Page:** `https://intelliasg.com/courses/grade-3-math`
*(structure reused for the Grade 5 course index)*
**Lesson URL:** `https://intelliasg.com/courses/grade-5-math/lessons/angles-around-a-point/`
