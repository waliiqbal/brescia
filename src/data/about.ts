import type { About } from "@/modules/about/about.types";
import { sample } from "./helpers";

export const about: About = {
  heading: "About the Lions",
  paragraphs: [
    "Brescia Lions is a professional cricket franchise representing the spirit, pride, and passion of Brescia, Italy, in the inaugural season of the Italia T10 League.",
    "Rooted in the identity of our city and driven by a passion for cricket, Brescia Lions brings together international talent, competitive ambition, and a vision to grow the game in Italy.",
  ],
  image: sample("37623643"),
  stats: [
    { label: "Founded", value: "2026" },
    { label: "Players", value: "15" },
    { label: "Matches", value: "0" },
    { label: "Wins", value: "0" },
  ],

  history: [
    "Brescia Lions is a professional cricket franchise representing the spirit, pride, and passion of Brescia, Italy, in the inaugural season of the Italia T10 League.",
    "Rooted in the identity of our city and driven by a passion for cricket, Brescia Lions brings together international talent, competitive ambition, and a vision to grow the game in Italy. We aim to create a team that goes beyond the boundary ropes, connecting cricket fans, local communities, and people from diverse backgrounds through the power of sport.",
    "Our vision is to build a competitive and recognisable cricket franchise that represents Brescia with pride, embraces international cricket culture, and contributes to the growth of the sport across Italy and Europe.",
    "With experienced leadership, talented players, and a commitment to excellence, Brescia Lions is ready to begin its journey in the Italia T10 League. Every match is an opportunity to compete, inspire, and build a legacy that our city can call its own.",
  ],
  historyClosing: [
    "For us, Brescia is more than a destination. It is our identity, our inspiration, and the home of our ambitions.",
    "This is Brescia. This is our pride. This is Brescia Lions.",
  ],
  historyImage: sample("31739439"),

  owner: {
    name: "Mian Asif",
    image: "/images/about/owner-mian-asif.jpg",
    kicker: "Visionary. Entrepreneur. Pioneer.",
    paragraphs: [
      "Mian Asif, Owner of Brescia Lions, is an international entrepreneur with 20+ years of global business experience in the Diamond Estate industry.",
      "Beyond business, he is the man who single-handedly transformed tape-ball cricket from the streets into a structured, professional industry.",
      "What started as a pure passion for tape-ball cricket, has been built into a recognized cricket industry across Pakistan, a name that today stands in front of the entire nation. A complete ecosystem of league, players, grounds and commercial cricket, built single-handedly.",
    ],
    closing: [
      "Now, the same vision comes to Italy.",
      "From Pakistan's tape-ball revolution to Italy's T10 revolution, the journey of building cricket continues with Brescia Lions.",
    ],
    signature: "Mian Asif — Owner of Brescia Lions.",
  },

  crestIntro:
    "Every part of our crest tells a piece of the story. Together they carry the message that sits at the heart of the club: one symbol, one city, one family.",
  crestElements: [
    {
      title: "The Crown",
      subtitle: "We are not here to participate. We are here to rule.",
      text: "The crown is a declaration. It stands for royalty, dominance and championship mentality. Brescia Lions are not just built to compete. We are built to RULE Italia T10.",
    },
    {
      title: "The Lion",
      subtitle: "Gold mane. Green heart. Crowned King.",
      text: "Our lion represents victory with its golden mane and pride for Brescia with its green heart. Fierce, proud, and unbreakable.",
    },
    {
      title: "The Colors",
      text: "DARK GREEN: The pride of Brescia. Deep, rich, powerful.\nGOLD: Victory, ambition and legacy. We shine like champions.\nITALIAN TRICOLOUR: Green, White, Red. Orgoglio d'Italia.",
    },
    {
      title: "The Colosseum & Italian Flag",
      subtitle: "Made in Italy. Made for Italy",
      text: "The Colosseum represents eternal strength and Italian heritage. Paired with the flowing Italian Tricolour in the background, it anchors our identity. Our roots are Italian. Our pride is Italian. Orgoglio d'Italia.",
    },
    {
      title: "Gold Ball & Laurel",
      subtitle: "We play for glory",
      text: "The GOLD cricket ball is our game - premium and precious. The GOLDEN LAUREL wreath comes from ancient Rome, worn by champions. Together they mean we play for legacy, we play to be crowned.",
    },
  ],

  mission:
    "To represent the city of Brescia with pride, grow cricket across Lombardy and give local players, young and old, a place to play, learn and compete at the highest level.",
  vision:
    "To become one of the leading cricket clubs in Italy, known for its community, its talent pathway and an identity that every person in Brescia is proud of.",

  management: [
    {
      id: "st-1",
      name: "Giorgio Lombardi",
      role: "Club President",
      bio: "Founder of the club and lifelong supporter of Brescia sport.",
    },
    {
      id: "st-2",
      name: "Chiara Bellini",
      role: "General Manager",
      bio: "Leads the day-to-day running of the club, from fixtures to partnerships.",
    },
    {
      id: "st-3",
      name: "Roberto Santoro",
      role: "Team Manager",
      bio: "Looks after the squad, travel and everything the players need on match day.",
    },
  ],
  coaching: [
    {
      id: "co-1",
      name: "David Collins",
      role: "Head Coach",
      bio: "Experienced coach with a focus on smart, aggressive T10 cricket.",
      profile:
        "David leads the Lions' coaching team and has overall charge of selection, tactics and match-day decisions. He builds teams around clear roles and fearless, aggressive cricket, and has a reputation for getting the best out of young players.\n\nHis aim for the Lions is simple: play with courage, think clearly under pressure and keep improving every week.",
      experience: "15 years",
      speciality: "T10 strategy",
    },
    {
      id: "co-2",
      name: "Paolo Benedetti",
      role: "Batting Coach",
      bio: "Works with the top order on powerplay strategy and strike rotation.",
      profile:
        "Paolo works with every batter in the squad, from the openers to the finishers. His sessions focus on powerplay planning, rotating the strike and playing the situation, not just the ball.\n\nA former league opener himself, he is known for patient, detailed one-to-one work in the nets.",
      experience: "12 years",
      speciality: "Powerplay batting",
    },
    {
      id: "co-3",
      name: "Imran Siddiqui",
      role: "Bowling Coach",
      bio: "Builds the Lions attack, from pace at the top to spin through the middle.",
      profile:
        "Imran designs the Lions bowling plans, from the new ball to the final over. He works on pace, accuracy and variations with the fast bowlers and on flight and control with the spinners.\n\nHe is also the person who analyses the opposition before every match.",
      experience: "10 years",
      speciality: "Death bowling",
    },
    {
      id: "co-4",
      name: "Elena Marchetti",
      role: "Fitness & Fielding Coach",
      bio: "Keeps the squad fit, sharp and the best fielding side in the league.",
      profile:
        "Elena looks after the physical side of the team: strength, speed, recovery and injury prevention. She also runs the daily fielding drills that have made the Lions one of the sharpest fielding sides in the league.\n\nPlayers say her sessions are the hardest of the week, and the most useful.",
      experience: "8 years",
      speciality: "Fielding & conditioning",
    },
    {
      id: "co-5",
      name: "Rahul Mehta",
      role: "Spin Bowling Coach",
      bio: "Works with the spinners on flight, turn and control in the middle overs.",
      profile:
        "Rahul looks after the Lions spin department. He works with the slow bowlers on flight, grip and variations, and on how to bowl to a plan against aggressive T10 batters.\n\nA former club spinner, he is known for his patient, detailed feedback after every session.",
      experience: "11 years",
      speciality: "Spin & variations",
    },
    {
      id: "co-6",
      name: "Giulia Rinaldi",
      role: "Physiotherapist",
      bio: "Keeps the players healthy and gets injured players back on the field safely.",
      profile:
        "Giulia is responsible for the health of the squad. She runs the pre-match warm-ups, treats knocks and strains, and designs the recovery plans that bring injured players back safely.\n\nShe also teaches the players simple daily habits that keep them fit through a long season.",
      experience: "9 years",
      speciality: "Injury recovery",
    },
    {
      id: "co-7",
      name: "Matteo Barbieri",
      role: "Youth Development Coach",
      bio: "Runs the Lions school and youth programme and finds the next local stars.",
      profile:
        "Matteo leads the Lions youth programme, working with local schools and junior sessions at the Brescia Cricket Ground. His job is to introduce children to cricket and to find and develop the next generation of Lions.\n\nMany of the club's young players first came to the game through his sessions.",
      experience: "7 years",
      speciality: "Junior coaching",
    },
  ],
};
