import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const API_KEY = process.env.ELEVENLABS_API_KEY || process.env.VITE_ELEVENLABS_API_KEY || 'sk_0af55b573c54fe31387443150c45624fed865ccc914cd486';
const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice - Clear Educator
const API_URL = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;

const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'assets', 'audio');
const MAP_FILE = path.join(__dirname, '..', 'src', 'utils', 'audioMap.js');

const STYLE_SETTINGS = {
  celebration: { stability: 0.12, similarity_boost: 0.45, style: 0.75, use_speaker_boost: true },
  encouragement: { stability: 0.16, similarity_boost: 0.50, style: 0.65, use_speaker_boost: true },
  question: { stability: 0.20, similarity_boost: 0.55, style: 0.55, use_speaker_boost: true },
  emphasis: { stability: 0.16, similarity_boost: 0.50, style: 0.60, use_speaker_boost: true },
  thinking: { stability: 0.24, similarity_boost: 0.60, style: 0.35, use_speaker_boost: true },
  statement: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true },
  instruction: { stability: 0.20, similarity_boost: 0.55, style: 0.50, use_speaker_boost: true }
};

const PHRASES = [
  // Home Welcome
  {
    key: "Welcome to Angles Around a Point! Let's master full turns, straight lines, and opposite angle twins!",
    style: "celebration",
    filename: "audio_welcome_home_0.mp3"
  },
  // Wonder Phase
  {
    key: "John is building a paper pinwheel. It has four blades meeting at the centre point.",
    style: "thinking",
    filename: "audio_wonder_hook_0.mp3"
  },
  {
    key: "He measures three of the angles: ninety, eighty, and seventy degrees. What is the fourth angle?",
    style: "question",
    filename: "audio_wonder_hook_1.mp3"
  },
  {
    key: "Let's discover the secret number that all angles around a point share!",
    style: "encouragement",
    filename: "audio_wonder_hook_2.mp3"
  },
  {
    key: "Can you discover the secret angle that closes the pinwheel around the center?",
    style: "question",
    filename: "audio_wonder_prompt_0.mp3"
  },
  {
    key: "Not quite! Add 90 + 80 + 70 = 240. What number makes 240 + ? = 360?",
    style: "thinking",
    filename: "audio_wonder_retry_0.mp3"
  },
  {
    key: "Brilliant! Ninety plus eighty plus seventy plus one hundred and twenty equals three hundred and sixty degrees! All angles around a point always total three hundred and sixty degrees!",
    style: "celebration",
    filename: "audio_wonder_success_0.mp3"
  },
  // Story Panels
  {
    key: "Sarah cuts a round pizza into slices that all meet at the centre point.",
    style: "statement",
    filename: "audio_story_panel1_0.mp3"
  },
  {
    key: "Notice how all the angle points touch at one single spot in the middle!",
    style: "emphasis",
    filename: "audio_story_panel1_1.mp3"
  },
  {
    key: "No matter how many slices Sarah cuts, if you go all the way around the central point, you complete one full rotation.",
    style: "statement",
    filename: "audio_story_panel2_0.mp3"
  },
  {
    key: "One full turn is ALWAYS three hundred and sixty degrees!",
    style: "emphasis",
    filename: "audio_story_panel2_1.mp3"
  },
  {
    key: "If Sarah knows three slice angles are ninety, one hundred, and ninety-five degrees, she can subtract their sum from three hundred and sixty degrees!",
    style: "statement",
    filename: "audio_story_panel3_0.mp3"
  },
  {
    key: "Ninety plus one hundred plus ninety-five equals two hundred and eighty-five. So the missing slice must be seventy-five degrees!",
    style: "statement",
    filename: "audio_story_panel3_1.mp3"
  },
  {
    key: "Mike is watching traffic at a T-junction. A straight road forms a half turn across a flat line point.",
    style: "statement",
    filename: "audio_story_panel4_0.mp3"
  },
  {
    key: "A straight line is a half turn — it always adds up to one hundred and eighty degrees!",
    style: "emphasis",
    filename: "audio_story_panel4_1.mp3"
  },
  {
    key: "When two straight lines cross each other, the angles opposite each other across the vertex point are identical twins!",
    style: "statement",
    filename: "audio_story_panel5_0.mp3"
  },
  {
    key: "Vertically opposite angles are ALWAYS EQUAL!",
    style: "emphasis",
    filename: "audio_story_panel5_1.mp3"
  },
  {
    key: "Now you have the three key secrets: Point = 360 degrees, Straight Line = 180 degrees, Opposite = Equal.",
    style: "statement",
    filename: "audio_story_panel6_0.mp3"
  },
  {
    key: "Let's test these superpowers in the interactive simulation stations!",
    style: "encouragement",
    filename: "audio_story_panel6_1.mp3"
  },
  // Simulation Stations
  {
    key: "Drag the wedges around the point until the circle closes at three hundred and sixty degrees.",
    style: "instruction",
    filename: "audio_station_a_instruction_0.mp3"
  },
  {
    key: "Awesome! You built a complete three hundred and sixty degree circle turn!",
    style: "celebration",
    filename: "audio_station_a_success_0.mp3"
  },
  {
    key: "Drag the arm until the two angles balance to one hundred and eighty degrees.",
    style: "instruction",
    filename: "audio_station_b_instruction_0.mp3"
  },
  {
    key: "Perfect balance! Angles on a straight line always sum to one hundred and eighty degrees!",
    style: "celebration",
    filename: "audio_station_b_success_0.mp3"
  },
  {
    key: "Tap the two angles that are directly opposite each other across the crossing point.",
    style: "instruction",
    filename: "audio_station_c_instruction_0.mp3"
  },
  {
    key: "Spot on! Vertically opposite angle twins are always equal!",
    style: "celebration",
    filename: "audio_station_c_success_0.mp3"
  },
  // System & Reflect
  {
    key: "Yes! That's exactly right — you found the missing angle!",
    style: "encouragement",
    filename: "audio_correct_0.mp3"
  },
  {
    key: "What a journey today! Can you draw a point with three angles and explain why they add up to three hundred and sixty degrees?",
    style: "thinking",
    filename: "audio_reflect_prompt_0.mp3"
  },
  {
    key: "Great reflection! You explained how angles meeting at a point form one full rotation of three hundred and sixty degrees.",
    style: "encouragement",
    filename: "audio_reflect_success_0.mp3"
  },
  {
    key: "Lesson complete! You are a Three Sixty Degree Champion!",
    style: "celebration",
    filename: "audio_lesson_complete_0.mp3"
  }
];

async function generateAudio() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  console.log(`🚀 Starting ElevenLabs offline audio pre-generation...`);
  console.log(`📁 Saving to: ${OUTPUT_DIR}\n`);

  const generatedMap = {};

  for (let i = 0; i < PHRASES.length; i++) {
    const item = PHRASES[i];
    const filePath = path.join(OUTPUT_DIR, item.filename);
    const publicPath = `/assets/audio/${item.filename}`;

    console.log(`[${i + 1}/${PHRASES.length}] Generating: "${item.key.slice(0, 45)}..."`);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'xi-api-key': API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: item.key,
          model_id: 'eleven_multilingual_v2',
          voice_settings: STYLE_SETTINGS[item.style] || STYLE_SETTINGS.statement
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error (${response.status}): ${errorText}`);
        continue;
      }

      const buffer = await response.arrayBuffer();
      fs.writeFileSync(filePath, Buffer.from(buffer));
      generatedMap[item.key] = publicPath;
      console.log(`   ✅ Saved -> ${publicPath}`);

      await new Promise(r => setTimeout(r, 600));
    } catch (err) {
      console.error(`❌ Failed to generate audio for "${item.key}":`, err.message);
    }
  }

  const mapCode = `// Pre-generated static map from text to offline audio assets
export const audioMap = ${JSON.stringify(generatedMap, null, 2)};
`;

  fs.writeFileSync(MAP_FILE, mapCode, 'utf-8');
  console.log(`\n✨ Successfully updated ${MAP_FILE} with ${Object.keys(generatedMap).length} offline audio assets!`);
}

generateAudio();
