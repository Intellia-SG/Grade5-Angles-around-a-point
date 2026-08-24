# Product Requirements Document (PRD)

## Angles Around a Point | Grade 5 Math — Geometry
### Intellia SG | Global Primary Mathematics Curriculum

═══════════════════════════════════════════════════════════════════════════════

## 1. Executive Summary

This document defines the product requirements for the **"Angles Around a
Point"** interactive lesson module, a Geometry unit within Intellia's **Grade
5 Math** program. The module teaches 10–11 year old learners that angles
meeting at a single point always add up to **360°**, that angles on a
straight line always add up to **180°**, and that **vertically opposite
angles are equal** — the three foundational angle-relationship facts that
underpin all later angle-chasing and geometric-reasoning work.

The lesson is written for a **global classroom audience** rather than a
single national curriculum. Learning objectives, vocabulary, and question
phrasing are cross-checked against multiple national Grade 5 (age 10–11)
syllabi (see Section 4) so the same module can be assigned to a student in
any of the represented systems.

The product is a standalone web page, intended to be hosted at (or beneath)
the course index the learner uploads and links from:

`https://intelliasg.com/courses/grade-5-math/lessons/angles-around-a-point/`
*(parent course index reference supplied by the requester: https://intelliasg.com/courses/grade-3-math — the URL structure, header, footer, and course-card layout of that page are to be reused as-is, with grade/topic swapped)*

It is built using **React (Vite + JSX, JavaScript/CSS)** and is designed to
**strictly mirror** the visual language, phase structure, component
anatomy, and interaction patterns established at:

- Reference UI: `https://equal-tau.vercel.app/`
- Reference Repo: `https://github.com/dsamyak/equal`

Audio narration uses **ElevenLabs exclusively**, following the pipeline
documented in the supplied *"Number Bonds Audio & Narration Pipeline"*
(`audio_generation_pipeline.md`) — Voice: **Alice**, Voice ID:
`Xb7hH8MSUJpSbSDYk0k2`, Model: `eleven_multilingual_v2`, with the exact
per-style voice-setting table from that document (Section 9).

The module follows Intellia's 5-phase learner journey (plus an Intro
screen), simulation-first, learn-then-practice pedagogy:

```
Phase 0 — INTRO      → Welcome screen + 5-phase progress map
Phase 1 — WONDER     → Curiosity hook
Phase 2 — STORY      → Narrative-based concept introduction
Phase 3 — SIMULATE   → Sandbox-style interactive simulation (3 stations)
Phase 4 — PLAY       → IntelliPlay™ gamified practice (100 randomised questions)
Phase 5 — REFLECT    → Journal / LearnFlow AI prompt + completion badge
```

═══════════════════════════════════════════════════════════════════════════════

## 2. Product Vision & Goals

### Vision
To make the concept of angles meeting at a point intuitive, visual, and
joyful for 10–11 year old learners anywhere in the world — building a
concrete → pictorial → abstract (CPA) bridge from *spinning, snapping angle
pieces* to *solving 360° / 180° equations* — through an interactive
protractor-style simulation, an illustrated story, and adaptive gamified
practice.

### Goals

| Goal | Metric |
|---|---|
| Learning Completion | ≥85% of students complete all 5 phases |
| Practice Engagement | ≥90% attempt at least 10 practice questions |
| Score Achievement | Average challenge score ≥75% on first attempt |
| Session Duration | Average engagement ≥15 minutes per session |
| Curriculum Alignment | 100% aligned to the Global Grade 5 Angle-Facts framework (Section 4) |
| Phase Progression | ≥80% reach the Play phase in a single session |
| Simulation Interaction Rate | ≥95% attempt all 3 simulation stations |
| Misconception Reduction | ≤10% of learners answer "angles at a point can add to any number" incorrectly after Phase 3 |

═══════════════════════════════════════════════════════════════════════════════

## 3. Target Users

### Primary: Grade 5 Students (Age 10–11)
- Ready for light algebraic reasoning ("find the unknown angle **x**")
- Learn best with a manipulable, snapping, visual protractor before facing
  bare equations
- Motivated by streaks, world maps, and badges rather than raw scores
- Global context: names, objects, and settings are deliberately
  **country-neutral** (clocks, pizza slices, road junctions, ceiling fans,
  kites, bicycle wheels) so the lesson travels across markets

### Secondary: Parents & Teachers
- Assign as classwork, homework, or a substitute-teacher activity
- Expect alignment language that maps clearly onto their own local standard
- Monitor via the in-page phase-completion indicators (no login required
  in v1.0)

═══════════════════════════════════════════════════════════════════════════════

## 4. Curriculum Alignment — Global Grade 5 Angle-Facts Framework

**Topic:** Angles Around a Point (Geometry strand)
**Programme:** Intellia Grade 5 Math — Geometry Unit
**Lesson URL:** `https://intelliasg.com/courses/grade-5-math/lessons/angles-around-a-point/`

Because the module targets a **global** learner base, the objectives below
are synthesised from, and cross-checked against, several widely-used
national Grade 5 (age 10–11) mathematics frameworks rather than a single
country's syllabus:

- **Singapore MOE Primary Mathematics Syllabus** — Primary 5, Geometry:
  "angles on a straight line," "angles at a point," "vertically opposite
  angles"
- **UK National Curriculum (England), Key Stage 2, Year 5/6** — Geometry:
  Properties of Shapes: "angles at a point and one whole turn (total 360°),"
  "angles at a point on a straight line and ½ a turn (total 180°),"
  "vertically opposite angles"
- **CBSE / NCERT (India), Class 5–6** — Understanding Elementary Shapes:
  angle measurement, straight angle, complete angle
- **Common Core State Standards (USA)** — extended slightly ahead of grade
  level (CCSS formally places angle-sum relationships at Grade 7,
  7.G.B.5), included here as enrichment so the module also serves as a
  bridge unit for CCSS classrooms
- **Australian Curriculum, Year 5/6** — Measurement and Geometry: "angles
  are classified... measured in degrees using a protractor," angle
  relationships at a point

**Global Learning Objectives Covered:**

| # | Objective |
|---|---|
| LO1 | Recognise that angles meeting at a single point always add up to 360° |
| LO2 | Recognise that angles on a straight line always add up to 180° |
| LO3 | Recognise that vertically opposite angles (formed by two crossing lines) are always equal |
| LO4 | Find an unknown angle at a point, given the other angles, using the 360° fact |
| LO5 | Find an unknown angle on a straight line, given the other angle(s), using the 180° fact |
| LO6 | Use a digital protractor / angle-arm simulation to measure, build, and verify angle facts |
| LO7 | Solve multi-step problems that combine the point fact, the line fact, and vertically opposite angles in one diagram |
| LO8 | Apply angle facts to real-world contexts (clock hands, pizza slices, road junctions, bicycle wheels, ceiling fans, kite frames) |
| LO9 | Justify (in simple language) *why* the facts must be true — informal geometric reasoning, not proof |

**Global Syllabus CPA Progression for This Lesson:**

```
Concrete  → Digital angle-arm / protractor manipulative: spin and snap
            angle wedges around a point (simulated fully on-screen)
Pictorial → Diagrams of angles at a point / on a line, labelled with
            arcs and degree values, some values hidden
Abstract  → "∠a + ∠b + ∠c = 360°"; "65° + x = 180°"; solving for the
            unknown
```

**Angle Ranges:**

| Level | Range | Notes |
|---|---|---|
| Easy | 2–3 angles at a point, whole-number values, total = 360°; whole-number values on a line, total = 180° | Values are multiples of 5° |
| Medium | 3–4 angles at a point; includes vertically-opposite pairs | Values are multiples of 5°, one unknown |
| Hard | 4–5 angles at a point; combined point + line + vertical diagrams; simple algebraic unknown *x* | Values may include non-multiples of 5°; multi-step |

**Vocabulary Focus (age-appropriate, globally neutral):**

> "angle," "degree (°)," "point," "vertex," "straight line," "full turn,"
> "half turn," "vertically opposite angles," "unknown angle," "sum,"
> "protractor," "adjacent angles"

═══════════════════════════════════════════════════════════════════════════════

## 5. The 5-Phase Learner Journey (Intellia Model)

```
┌────────────────────────────────────────────────────────────────────────────┐
│ INTRO SCREEN → Progress Map (5-step visual tracker, top bar)                │
│ Welcome: "Hi! Today we're exploring Angles Around a Point! 🧭"             │
│ Lesson badge shown (locked). 5 glowing phase dots visible.                  │
└────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1 — WONDER (≈ 1–2 min)                                                │
│                                                                              │
│ Hook: "John is building a paper pinwheel. It has 4 blades meeting at the   │
│ centre point. He measures three of the angles: 90°, 80°, 70°. What's the  │
│ fourth angle, so the blades fit perfectly around the centre?"              │
│                                                                              │
│ Visual: Animated pinwheel blades snapping into place around a centre dot   │
│ Animation: Blades rotate in one by one; a gap glows where the unknown is   │
│ Narration (ElevenLabs): Alice voice reads the hook warmly                  │
│ → Mascot (LearnFlow robot) appears with a curious expression               │
│ → "Let's discover the secret number that ALL angles around a point share!" │
└────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2 — STORY (≈ 2–3 min)                                                 │
│                                                                              │
│ Narrative: Sarah and Mike are at a pizza party, then a busy road junction. │
│ Panel 1: "Sarah cuts a round pizza into slices that all meet at the        │
│           centre point. 🍕"                                                │
│ Panel 2: "No matter how many slices, all the angles at the centre always  │
│           add up to 360° — one FULL turn!"                                │
│ Panel 3: Circle diagram appears — 4 wedges, angles 90°, 100°, 95°, and a   │
│           dashed "?" wedge                                                 │
│ Panel 4: "90 + 100 + 95 = 285. So the missing slice must be 360 − 285 =    │
│           75°!"                                                            │
│ Panel 5: "Now Mike looks at a straight road. Two roads branch off it at    │
│           angles of 110° and 70°. 🛣️"                                     │
│ Panel 6: "A straight line is a HALF turn — always 180°. 110 + 70 = 180.    │
│           It checks out!"                                                  │
│                                                                              │
│ → Illustrated story panels (animated slide-in), ElevenLabs narration       │
│ → Key vocabulary highlighted: "full turn," "half turn," "360°," "180°"     │
│ → Angle diagram introduced visually (wedge clusters around a point)        │
└────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3 — SIMULATE (≈ 5–6 min)                                              │
│                                                                              │
│ 3 Interactive Stations — student must complete all 3 to advance            │
│                                                                              │
│ Station A — "Spin the Circle" (Concrete)                                    │
│   Drag colourful angle wedges around a centre point until the circle       │
│   closes exactly at 360°. Live degree read-out updates as wedges rotate.   │
│                                                                              │
│ Station B — "Balance the Line" (Pictorial)                                  │
│   A straight line with a swinging angle arm. Student drags the arm until   │
│   the two angles shown balance to 180° — a see-saw visual reinforces the   │
│   "half turn" idea.                                                        │
│                                                                              │
│ Station C — "Mirror Match" (Abstract)                                      │
│   Two crossing lines create 4 angles. Student first taps the two pairs of  │
│   vertically opposite (equal) angles, then fills a missing value in an     │
│   equation such as "∠a + ∠b = 180°" or "∠x = 65°".                        │
│                                                                              │
│ → Mascot reacts to each completed station                                  │
│ → ElevenLabs narrates each station's instruction and feedback              │
└────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4 — PLAY (≈ 6–8 min)                                                  │
│                                                                              │
│ IntelliPlay™ Level: 100 randomised questions across 10 worlds              │
│ 10 questions per world, world unlocks at ≥6/10 correct                    │
│ Stars (1–3), XP, badges, and streak-fire counter active                   │
│ → Mastery gates the world map; encouragement-first feedback               │
└────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
┌────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5 — REFLECT (≈ 1–2 min)                                               │
│                                                                              │
│ Journal prompt: "Draw a point with 3 angles around it. Can you explain    │
│ why they must add up to 360°?"                                            │
│ Or: LearnFlow AI chat — type/speak your understanding                     │
│ Lesson-complete badge unlocks here. Summary of XP + badges shown.         │
│ → "Share with your teacher!" button (screenshot / export)                 │
└────────────────────────────────────────────────────────────────────────────┘
```

═══════════════════════════════════════════════════════════════════════════════

## 6. Phase 3 — Simulation Design (Detailed)

### 6.1 Station A — "Spin the Circle" (Concrete)

**Visual:**
- A large circular dial with a bright centre point (the vertex)
- A tray of draggable coloured angle wedges (arcs), each with a numeric
  degree handle that can be stretched or rotated
- A live degree counter in the middle: "Total so far: 240° / 360°"

**Interaction:**
- Student drags wedges from the tray and snaps them edge-to-edge around
  the centre point
- Each wedge can be resized by dragging its outer edge (snaps to 5°
  increments)
- OR tap-to-place + tap-to-resize (accessibility mode)
- A running total updates live; the last gap shows as a dashed "?" wedge

**Feedback:**
- Circle closes at exactly 360° → mascot spins and cheers, "Perfect! One
  full turn — 360°!" 🎉
- Circle over/under 360° on submit → gentle wobble + "Not quite a full
  turn yet — let's adjust!"

**Variants per round (randomised):**
- Round 1: 3 wedges — 90°, 120°, find the 3rd (150°)
- Round 2: 4 wedges — 80°, 95°, 100°, find the 4th (85°)
- Round 3: 3 wedges, one already vertically opposite a shown angle
- Round 4: 5 wedges, mixed values, find one unknown

### 6.2 Station B — "Balance the Line" (Pictorial)

**Visual:**
- A horizontal straight line with a see-saw-style pivot arm sitting on top
  of a point on the line
- Two angle zones on either side of the arm, each showing a live degree
  value as the arm swings
- A "balance meter" showing how close the two angles are to summing to
  180°

**Interaction:**
- Student drags the pivot arm left/right; both angle values update
  live and in real time
- A "Lock it in!" button submits the current position
- 3 rounds show a partially-fixed arm (one angle given) where the student
  must swing to the exact matching position

**Teaching goal:**
- A straight line is a half turn (180°) — reinforced kinaesthetically by
  the seesaw visual before any numbers are required

**Feedback:**
- Balanced at exactly 180° → mascot claps, "Balanced perfectly — that's a
  half turn!"
- Off-balance → "So close! A straight line always totals 180°. Try again!"

**Rounds (3 rounds per station, increasing precision demand):**
- Round 1: One angle fixed at 90° (find 90°) — visually obvious midpoint
- Round 2: One angle fixed at 65° (find 115°)
- Round 3: One angle fixed at 38° (find 142°) — finer motor control needed

### 6.3 Station C — "Mirror Match" (Abstract)

**Visual:**
```
        \   /
         \ /
    a  ×  b        (two straight lines crossing at a point,
         / \         creating 4 labelled angles a, b, c, d)
        /   \
       c     d
```
- Two crossing lines form four angles, each shaded a distinct colour
- One angle value is always given; the other three are either given,
  hidden, or replaced with letters (a, b, c, x)

**Interaction — Step 1 (Match):**
- Student taps the two angle pairs that are **vertically opposite**
  (i.e., directly across the crossing point from each other)
- Correct pairs glow and connect with a dotted arc; incorrect pairs flash
  red briefly

**Interaction — Step 2 (Equation):**
- After matching, a fill-in equation appears, e.g. `∠a + 65° = 180°` or
  `∠x = 48°`
- Number pad (large, tap-friendly, 0–9) used to enter the answer
- "Show me the lines" hint button re-highlights the diagram

**Variants (rotated per round):**
- Round 1: Find a vertically opposite angle directly (given 55°, find its
  match)
- Round 2: Find an adjacent (linear-pair) angle using the 180° fact
- Round 3: Two-step — find one angle via vertical-opposite, then use it to
  find a linear-pair partner

ElevenLabs narrates each equation aloud when displayed.

═══════════════════════════════════════════════════════════════════════════════

## 7. Phase 4 — Question Bank (100 Randomised Questions)

### 7.1 Question Types (10 types × 10 questions = 100 total)

| Type | Description | Example |
|---|---|---|
| Q1 | Find missing angle at a point (2 known, find 3rd) | Three angles meet at a point: 120°, 150°, and ?°. What is the missing angle? |
| Q2 | Find missing angle on a straight line | Two angles on a straight line are 65° and ?°. Find the missing angle. |
| Q3 | True or False — do the angles add up correctly? | "100° + 130° + 140° = 360°" — True or False? |
| Q4 | Vertically opposite angle | Two lines cross. One angle is 48°. What is its vertically opposite angle? |
| Q5 | Real-world word problem (point) | Sarah's pizza has 5 slices meeting at the centre. Four measure 70°, 65°, 75°, 60°. What is the fifth slice's angle? |
| Q6 | Picture-based MCQ — tap the diagram that sums correctly | [Diagram set] Which set of angles correctly sums to 360° around a point? |
| Q7 | Multi-step algebraic — angles at a point | Three angles at a point are 2x°, 90°, and 130°. If they total 360°, find x. |
| Q8 | Straight-line, three-part | Three angles on a straight line are 40°, ?°, and 75°. Find the missing angle. |
| Q9 | Conceptual reasoning MCQ | Why do angles around a point always add up to 360°? |
| Q10 | Mixed application (point + line + vertical) | A diagram shows two crossing lines and one more ray from the same point. Find two different unknown angles. |

### 7.2 Question Distribution by Difficulty

| Type | Count | Easy | Medium | Hard |
|---|---|---|---|---|
| Q1 | 10 | 5 | 3 | 2 |
| Q2 | 10 | 5 | 3 | 2 |
| Q3 | 10 | 4 | 4 | 2 |
| Q4 | 10 | 4 | 4 | 2 |
| Q5 | 10 | 3 | 4 | 3 |
| Q6 | 10 | 4 | 4 | 2 |
| Q7 | 10 | 2 | 4 | 4 |
| Q8 | 10 | 4 | 4 | 2 |
| Q9 | 10 | 5 | 3 | 2 |
| Q10 | 10 | 2 | 4 | 4 |
| **Total** | **100** | **38** | **37** | **25** |

### 7.3 Angle Ranges

- **Easy:** 2–3 angles at a point, values in multiples of 5°, totals exactly
  360° or 180°
- **Medium:** 3–4 angles, includes vertically-opposite pairs, one unknown
- **Hard:** 4–5 angles, combined diagrams, simple algebraic unknown *x*,
  values may not be multiples of 5°

### 7.4 Global Names & Real-World Objects Used in Word Problems

**Names (globally neutral, first-name only):** John, Mike, Sarah, Emma,
Liam, Ava, Noah, Zara, Carlos, Yuki, Fatima, Lucas, Priya, Mia, Omar, Chloe

**Objects/Contexts:** pizza slices, pinwheels, bicycle wheels, ceiling fan
blades, clock hands, kite frames, road junctions/signposts, umbrella
spokes, pie charts, windmill blades

**Settings:** birthday party, school playground, science fair, park, garage
workshop, kitchen, road crossing — deliberately country-neutral, no
region-specific food or festival references

### 7.5 Global-Aligned Language Requirements

All questions use vocabulary consistent across the reference syllabi
(Section 4):

- "angle," "point," "degree (°)," "full turn," "half turn"
- "vertically opposite angles," "straight line," "adjacent angle"
- "find the missing/unknown angle," "the angles add up to"

Sentence structures avoid idioms or region-specific references so the
lesson can be used unmodified in any of the referenced national contexts.

═══════════════════════════════════════════════════════════════════════════════

## 8. Gamification Design

### 8.1 Reward System

- **Stars (⭐):** Earned per 10-question world (1–3 stars based on score)
- **XP Points:** 10 XP correct first try | 7 XP second try | 5 XP with hint used
- **Streak 🔥:** Fire counter for consecutive correct answers
- **Streak Bonus:** +5 XP per correct answer when streak ≥ 5

### 8.2 Badges (Unlockable)

| Badge | Condition |
|---|---|
| 🧭 "Angle Explorer" | Complete Wonder + Story phases |
| 🥈 "Circle Builder" | Complete all 3 Simulation stations |
| 🥇 "360° Champion" | Score ≥80% on Play phase |
| 💎 "Perfect Point" | Score 10/10 in any world |
| 🔥 "Streak Star" | Achieve a streak of 10 consecutive correct answers |
| 🌟 "Full Journey" | Complete all 5 phases (lesson complete badge) |
| 🎯 "Mirror Master" | Get 5 vertically-opposite-angle questions correct without a hint |
| ➖ "Straight Shooter" | Answer 5 straight-line (180°) questions correctly in a row |

### 8.3 Feedback Mechanics

**✅ Correct:**
- Bounce animation on answer card + mascot happy mood
- ElevenLabs celebration audio: "Yes! That's exactly right — you found the
  missing angle! 🎉"
- XP floats up from answer card (+10 / +7 / +5)
- Streak fire counter increments

**❌ Incorrect (Attempt 1):**
- Gentle shake animation on answer card
- ElevenLabs gentle voice: "Not quite — let's look at the angles again 🧭"
- Hint 1 activates: relevant fact reminder ("Remember: angles at a point
  add up to 360°")

**❌ Incorrect (Attempt 2):**
- Stronger shake + Hint 2: animated diagram highlights the known angles
  and the gap
- ElevenLabs: "Let's add the angles we know together first."

**❌ Incorrect (Attempt 3):**
- Answer revealed with animated explanation (mascot walks through the sum)
- ElevenLabs: full explanation read aloud
- No score penalty — encouragement only

No negative scoring. Encouragement-first approach always.

### 8.4 World Map (IntelliPlay™ Level Progression)

| World | Theme | Coverage |
|---|---|---|
| 1 | "Pinwheel Park" | Q1–10, 2–3 angles at a point, easy |
| 2 | "Pizza Plaza" | Q11–20, straight-line basics, easy |
| 3 | "Bicycle Lane" | Q21–30, true/false + vertically opposite, easy-med |
| 4 | "Kite Meadow" | Q31–40, real-world word problems, medium |
| 5 | "Fan Factory" | Q41–50, picture-based MCQ, medium |
| 6 | "Windmill Hills" | Q51–60, algebraic unknowns, medium-hard |
| 7 | "Crossroads City" | Q61–70, straight-line 3-part, hard |
| 8 | "Reasoning Ridge" | Q71–80, conceptual "why" questions, hard |
| 9 | "Puzzle Junction" | Q81–90, mixed application, hard |
| 10 | "Angle Palace" | Q91–100, hardest, all types mixed |

Unlock gate: ≥6/10 correct (1-star minimum) required to advance to next
world. 3 stars in a world unlocks a hidden "Bonus Challenge" (3 extra
questions).

### 8.5 Mascot (LearnFlow AI Companion)

- **Character:** Friendly robot — "LearnFlow" (matching Intellia branding)
- **Mood States:** idle | curious | happy | thinking | celebrating | encouraging
- **Appearances:** Wonder hook, Story narration, Simulation feedback, Reflect phase
- **Reactions:** Correct answer, badge unlock, streak milestone, world completion
- **Audio:** All mascot speech via ElevenLabs Alice voice (pre-generated .mp3)

═══════════════════════════════════════════════════════════════════════════════

## 9. Audio & Narration Design

*(Mirrors the supplied "Number Bonds Audio & Narration Pipeline" exactly —
same provider, voice, model, and per-style settings, adapted to this
lesson's script content.)*

### 9.1 Voice Profile & Settings

- **Voice Provider:** ElevenLabs
- **Voice Name:** Alice (Clear, Engaging Educator)
- **Voice ID:** `Xb7hH8MSUJpSbSDYk0k2`
- **Model:** `eleven_multilingual_v2`

### 9.2 Voice Settings by Style (unchanged from the source pipeline doc)

| Style | Stability | Similarity Boost | Style | Speaker Boost |
|---|---|---|---|---|
| `celebration` | 0.12 | 0.45 | 0.75 | ✅ |
| `encouragement` | 0.16 | 0.50 | 0.65 | ✅ |
| `question` | 0.20 | 0.55 | 0.55 | ✅ |
| `emphasis` | 0.16 | 0.50 | 0.60 | ✅ |
| `thinking` | 0.24 | 0.60 | 0.35 | ✅ |
| `statement` / `instruction` | 0.20 | 0.55 | 0.50 | ✅ |

### 9.3 Content Policy: Paragraphs & Questions ONLY

> **IMPORTANT:** Audio is generated ONLY for paragraph text and questions.
> Titles, headings, and section labels are NEVER narrated. This prevents
> repetitive title reading and keeps narration focused on educational
> content.

### 9.4 Pipeline Components (identical roles to the reference doc)

- **A. Offline Generation (`scripts/generate_audio.js`)** — Pre-generates
  all Wonder / Story / Simulate / Reflect / badge-unlock lines as static
  `.mp3` assets using the per-style ElevenLabs settings above.
- **B. Audio Mapping (`src/utils/audioMap.js`)** — Auto-generated
  text → `.mp3` path dictionary; exact-string lookup, bypasses dynamic
  generation for all pre-known lines.
- **C. Audio Cleanup (`scripts/clean_audio.js`)** — Deletes orphaned
  `.mp3` files no longer referenced by `audioMap.js`.
- **D. Audio Engine (`src/utils/audio.js`)** — `say()`, `ask()`,
  `cheer()`, `emphasize()`, `think()`, `celebrate()`, `instruct()` segment
  helpers; `getAudioUrl()` cache-first lookup; `narrate()` queue with
  eager i+1 preloading; `stopNarration()`.
- **E. Narration Scripts (`src/utils/narration.js`)** — Phase-mapped
  functions: `wonderNarration()`, `storyNarration()`,
  `stationAIntroNarration()`, `stationBIntroNarration()`,
  `stationCIntroNarration()`, `reflectQuestionNarration()`, etc.
  **Only paragraph/question text — never titles.** Maintains 1:1 strict
  parity with on-screen UI text.

### 9.5 Sample Narration Script (excerpt)

| Phase | Style | Line |
|---|---|---|
| Wonder | thinking | "John is building a paper pinwheel. It has four blades meeting at the centre point." |
| Wonder | question | "He measures three of the angles: ninety, eighty, and seventy degrees. What is the fourth angle?" |
| Story Panel 1 | statement | "Sarah cuts a round pizza into slices that all meet at the centre point." |
| Story Panel 2 | emphasis | "No matter how many slices, all the angles at the centre always add up to three hundred and sixty degrees — one full turn!" |
| Station A instruction | instruction | "Drag the wedges around the point until the circle closes at three hundred and sixty degrees." |
| Correct feedback | celebration | "Yes! That's exactly right — you found the missing angle!" |
| Reflect prompt | thinking | "What a journey today! Can you draw a point with three angles and explain why they add up to three hundred and sixty degrees?" |

### 9.6 Dynamic Fallback

Practice questions (Phase 4) not present in `audioMap.js` are generated
on-the-fly via the ElevenLabs API (or the `/api/elevenlabs` proxy) using
the same per-style settings, then cached in memory for the session.

═══════════════════════════════════════════════════════════════════════════════

## 10. UX & Visual Design Requirements

### 10.1 Visual Theme

- **Brand:** Intellia SG — Think. Explore. Become.
- **Reference UI:** `https://equal-tau.vercel.app/` (mirror exactly)
- **Reference Repo:** `https://github.com/dsamyak/equal`
- **Colours:** Match `equal-tau.vercel.app` exactly
  - Primary blue: consistent with existing Intellia lessons
  - Accent gold/yellow for rewards and stars
  - Soft coral/red for wrong-answer shake states
  - White card backgrounds, soft drop shadows
  - Phase-band colours distinct per phase (matching Intellia journey infographic)
- **Typography:** Rounded, playful — Nunito or Fredoka One
- **Illustrations:** Cartoon-style, globally-neutral imagery (no
  region-specific festivals, food, or dress)
- **Angle Wedges:** Circular/arc SVG components, coloured distinctly from
  each other, snapping visually into place

### 10.2 Layout Structure (mirrors equal-tau.vercel.app)

- **Top Bar:** Intellia logo | Lesson title "Angles Around a Point" | 5-phase dot tracker
- **Main Area:** Phase content (fills screen, responsive, smooth phase transitions)
- **Bottom Bar:** XP counter | Star count | Streak fire | Phase navigation arrows
- **Sidebar:** Hidden on mobile; shown on tablet+ as vertical phase map

### 10.3 Angle Diagram Visual Component (Primary Visual)

Used throughout all phases. Visual spec:

- A centre point (vertex) with 2–5 coloured wedge/arc segments radiating outward
- Each wedge labelled with its degree value beneath its arc
- A connecting label underneath the whole diagram: `"90° + 120° + 150° = 360°"`
- Wedges animate in (sweep-in rotation) when the diagram first renders
- Missing value shown as a dashed-border wedge with "?" inside

### 10.4 Accessibility

- Large tap targets (minimum 44×44px on all interactive elements)
- WCAG AA colour contrast on all text elements
- All narration via ElevenLabs (premium, consistent voice)
- Keyboard navigable (Tab + Enter for all interactions)
- No mandatory time pressure (optional timer toggle in challenge mode only)
- Drag interactions have touch-equivalent tap+tap fallback

### 10.5 Responsive Design

- Primary: iPad / tablet (768px+) — classroom context
- Secondary: Desktop browser (1024px+)
- Tertiary: Mobile (375px+) — stacked single-column layout

═══════════════════════════════════════════════════════════════════════════════

## 11. Content Requirements

### 11.1 Simulation Visuals

- Angle diagrams: SVG-rendered wedges/arcs around a point, with degree
  labels
- Object motifs: pinwheel blades, pizza slices, bicycle spokes, fan
  blades, kite struts (rotated per session for variety)
- Station B see-saw: line + pivot arm, swinging in real time
- Station C crossing-lines diagram: large bold typography, one
  highlighted unknown per round

### 11.2 Question Bank Coverage

- All 10 question types × 10 questions = 100 unique question objects in
  `questionBank.js`
- Questions randomised per session using Fisher–Yates shuffle
- No two sessions present the same question order
- MCQ distractors always plausible (values that would result from a common
  arithmetic slip, e.g. subtracting from 180° instead of 360°)

### 11.3 Word Problem Format (Global style)

**Point-sum sense:**
> "[Name]'s [object] has angles meeting at the centre point. [n-1] of them
> measure [values]. What is the missing angle, so they add up to a full
> turn?"

**Straight-line sense:**
> "[Name] sees two angles on a straight [road/edge/line]. One measures
> [value]. What is the other angle?"

**Vertically-opposite sense:**
> "Two [lines/roads] cross at a point. One angle measures [value]. What is
> the angle directly opposite it?"

### 11.4 Audio Script Parity (1:1 Strict Parity Rule)

Every on-screen text string that is narrated must match the narration.js
text exactly — same words, same punctuation. This prevents confusion for
young learners who are simultaneously listening and reading. Any UI text
change requires updating both the `generate_audio.js` phrases array and
the `narration.js` file.

═══════════════════════════════════════════════════════════════════════════════

## 12. Success Criteria (v1.0)

| Criterion | Target |
|---|---|
| All 100 questions randomised correctly | ✅ Required |
| All 3 simulation stations functional | ✅ Required |
| All 5 phases navigable end-to-end | ✅ Required |
| Gamification (XP, stars, 8 badges) working | ✅ Required |
| World map 10-world progression logic correct | ✅ Required |
| ElevenLabs audio plays for all phase narration | ✅ Required |
| Audio pipeline (pre-gen + dynamic) functional | ✅ Required |
| Mobile/tablet responsive layout | ✅ Required |
| Global Grade 5 angle-facts framework 100% covered | ✅ Required |
| Loads in < 3 seconds (Vite production build) | ✅ Required |
| WCAG AA accessible | ✅ Required |
| UI matches equal-tau.vercel.app structure | ✅ Required |
| Hosted correctly beneath the intelliasg.com course index | ✅ Required |

═══════════════════════════════════════════════════════════════════════════════

## 13. Out of Scope (v1.0)

- Teacher dashboard / backend analytics
- Student login / account persistence across devices
- Multiplayer or class competition features
- Parent progress report emails
- Print worksheet generation
- Interior/exterior angles of polygons, angle bisectors, or triangle angle
  sum (separate future modules)
- Formal geometric proof writing
- Assessment against a full curriculum (broader test engine)

═══════════════════════════════════════════════════════════════════════════════

**Document Version:** 1.0 | August 2026
**Product:** Intellia — Grade 5 Math, Geometry Unit
**Lesson Title:** Angles Around a Point
**Curriculum:** Global Grade 5 Angle-Facts Framework (Singapore MOE / UK
National Curriculum / CBSE / Common Core enrichment / Australian
Curriculum)
**Reference UI:** `https://equal-tau.vercel.app/`
**Reference Repo:** `https://github.com/dsamyak/equal`
**Audio Pipeline:** ElevenLabs (Alice, `Xb7hH8MSUJpSbSDYk0k2`,
`eleven_multilingual_v2`) — per `audio_generation_pipeline.md`
**Parent Course Page:** `https://intelliasg.com/courses/grade-3-math` *(structure to be reused for the Grade 5 course index)*
**Lesson URL:** `https://intelliasg.com/courses/grade-5-math/lessons/angles-around-a-point/`
