export const STORY_PANELS = [
  {
    id: 1,
    title: "1. The Great Pizza Discovery 🍕",
    text: "Sarah is cutting a large circular pizza for her friends. All the slice points meet at the exact centre of the pizza.",
    highlightText: "Notice how all the angle points touch at one single spot in the middle!",
    visualType: "pizza",
    image: "/images/story/story_panel_1.png",
    angles: [90, 100, 95, 75],
    equationText: "90° + 100° + 95° + 75° = 360°",
    ruleTag: "Angles around a point = 360°"
  },
  {
    id: 2,
    title: "2. The Full Turn Secret 🔄",
    text: "No matter how many slices Sarah cuts, if you go all the way around the central point, you complete one full rotation.",
    highlightText: "One full turn is ALWAYS 360 degrees!",
    visualType: "circle-turn",
    image: "/images/story/story_panel_2.png",
    angles: [120, 150, 90],
    equationText: "120° + 150° + 90° = 360°",
    ruleTag: "1 Full Turn = 360°"
  },
  {
    id: 3,
    title: "3. Finding the Hidden Slice 🔍",
    text: "If Sarah knows three slice angles are 90°, 100°, and 95°, she can subtract their sum from 360° to find the missing slice!",
    highlightText: "360° - (90° + 100° + 95°) = 360° - 285° = 75°",
    visualType: "missing-slice",
    image: "/images/story/story_panel_3.png",
    angles: [90, 100, 95, 75],
    missingIndex: 3,
    equationText: "360° - 285° = 75°",
    ruleTag: "Find Unknown: 360° - Known Sum"
  },
  {
    id: 4,
    title: "4. Mike's Straight Road Junction 🛣️",
    text: "Mike is watching traffic at a T-junction. A straight road forms a half turn across a flat line point.",
    highlightText: "A straight line is a half turn — it always adds up to 180°!",
    visualType: "straight-line",
    image: "/images/story/story_panel_4.png",
    angles: [110, 70],
    equationText: "110° + 70° = 180°",
    ruleTag: "Angles on a straight line = 180°"
  },
  {
    id: 5,
    title: "5. The Crossing Paths Rule ✂️",
    text: "When two straight lines cross each other, the angles opposite each other across the vertex point are identical twins!",
    highlightText: "Vertically opposite angles are ALWAYS EQUAL!",
    visualType: "crossing-lines",
    image: "/images/story/story_panel_5.png",
    angles: [55, 125, 55, 125],
    equationText: "Top 55° = Bottom 55° | Left 125° = Right 125°",
    ruleTag: "Vertically Opposite Angles = Equal"
  },
  {
    id: 6,
    title: "6. Your Geometry Superpower ⚡",
    text: "Now you have the 3 key secrets: Point = 360°, Straight Line = 180°, Opposite = Equal. You are ready to solve any angle puzzle!",
    highlightText: "Let's test these superpowers in the interactive simulation stations!",
    visualType: "summary",
    image: "/images/story/story_panel_6.png",
    angles: [90, 90, 90, 90],
    equationText: "360° | 180° | Opposite = Equal",
    ruleTag: "Mastery Ready!"
  }
];

