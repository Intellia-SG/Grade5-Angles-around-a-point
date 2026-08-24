import { say, instruct, ask, emphasize, think, cheer, celebrate } from './audio';

export function homeWelcomeNarration() {
  return [
    celebrate("Welcome to Angles Around a Point! Let's master full turns, straight lines, and opposite angle twins!")
  ];
}

export function wonderNarration() {
  return [
    think("John is building a paper pinwheel. It has four blades meeting at the centre point."),
    ask("He measures three of the angles: ninety, eighty, and seventy degrees. What is the fourth angle?"),
    cheer("Let's discover the secret number that all angles around a point share!")
  ];
}

export function storyNarration(panelIndex = 0) {
  switch (panelIndex) {
    case 0:
      return [
        say("Sarah cuts a round pizza into slices that all meet at the centre point."),
        emphasize("Notice how all the angle points touch at one single spot in the middle!")
      ];
    case 1:
      return [
        say("No matter how many slices Sarah cuts, if you go all the way around the central point, you complete one full rotation."),
        emphasize("One full turn is ALWAYS three hundred and sixty degrees!")
      ];
    case 2:
      return [
        say("If Sarah knows three slice angles are ninety, one hundred, and ninety-five degrees, she can subtract their sum from three hundred and sixty degrees!"),
        say("Ninety plus one hundred plus ninety-five equals two hundred and eighty-five. So the missing slice must be seventy-five degrees!")
      ];
    case 3:
      return [
        say("Mike is watching traffic at a T-junction. A straight road forms a half turn across a flat line point."),
        emphasize("A straight line is a half turn — it always adds up to one hundred and eighty degrees!")
      ];
    case 4:
      return [
        say("When two straight lines cross each other, the angles opposite each other across the vertex point are identical twins!"),
        emphasize("Vertically opposite angles are ALWAYS EQUAL!")
      ];
    case 5:
    default:
      return [
        say("Now you have the three key secrets: Point = 360 degrees, Straight Line = 180 degrees, Opposite = Equal."),
        cheer("Let's test these superpowers in the interactive simulation stations!")
      ];
  }
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

export function lessonCompleteNarration() {
  return [celebrate("Lesson complete! You are a Three Sixty Degree Champion!")];
}
