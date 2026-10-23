import type { About } from "@/modules/about/about.types";
import { sample } from "./helpers";

export const about: About = {
  heading: "About the Lions",
  paragraphs: [
    "Brescia Lions represent the pride of Brescia — a club built on passion, unity and the spirit of Italian cricket. Our crest unites the Colosseum, the Italian tricolour and the golden lion: one city, one identity.",
    "We aim to grow cricket across Lombardy and develop local talent to compete at the highest level.",
  ],
  image: sample("37623643"),
  stats: [
    { label: "Founded", value: "2026" },
    { label: "Players", value: "15" },
    { label: "Matches", value: "6" },
    { label: "Wins", value: "5" },
  ],

  history: [
    "Brescia Lions were founded in 2026 by a group of local cricket lovers who shared one dream: to give the city of Brescia a team it could call its own. What began as weekend games on a borrowed ground quickly grew into a proper club with a squad, a coaching staff and a loyal following.",
    "In our very first season in the Italia T10, the Lions took the league by surprise, winning five of our first six matches and climbing to the top of the table. More important than the results, the club has brought together players of many backgrounds under one badge.",
    "Today the Lions are building for the long term: a youth programme for local schools, regular fan days at the Brescia Cricket Ground and a clear ambition to make cricket a part of everyday life in Lombardy.",
  ],
  historyImage: sample("31739439"),

  crestIntro:
    "Every part of our crest tells a piece of the story. Together they carry the message that sits at the heart of the club: one symbol, one city, one family.",
  crestElements: [
    {
      title: "The Golden Lion",
      text: "Pride, courage and leadership. The lion has long been a symbol of Brescia, and it leads the club on the field.",
    },
    {
      title: "The Crown",
      text: "A mark of ambition. We play to win and to carry ourselves like champions in every match.",
    },
    {
      title: "The Colosseum",
      text: "Our Italian roots. A reminder of the history and tradition that stand behind the game we play today.",
    },
    {
      title: "The Tricolour",
      text: "Green, white and red. The flag ties the club to the whole country and to Italian cricket as it grows.",
    },
    {
      title: "The Cricket Ball",
      text: "The reason we are here. A golden ball for a club that plays the game at the highest level.",
    },
    {
      title: "The Laurel Wreath",
      text: "Victory and honour, the reward for hard work, discipline and playing for each other.",
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
    },
    {
      id: "co-2",
      name: "Paolo Benedetti",
      role: "Batting Coach",
      bio: "Works with the top order on powerplay strategy and strike rotation.",
    },
    {
      id: "co-3",
      name: "Imran Siddiqui",
      role: "Bowling Coach",
      bio: "Builds the Lions attack, from pace at the top to spin through the middle.",
    },
    {
      id: "co-4",
      name: "Elena Marchetti",
      role: "Fitness & Fielding Coach",
      bio: "Keeps the squad fit, sharp and the best fielding side in the league.",
    },
  ],
};
