import type { Article } from "@/modules/articles/article.types";
import { relativeDate, sample } from "./helpers";

export const articles: Article[] = [
  {
    id: "a-1",
    slug: "lions-roar-to-a-6-wicket-win-over-milano-xi",
    title: "Lions roar to a 6-wicket win over Milano XI",
    excerpt:
      "A dominant chase powered by the top order sealed the victory in just 8.2 overs.",
    content: `<p>The Brescia Lions produced a commanding display at the Brescia Cricket Ground, chasing down 108 with six wickets in hand and more than an over to spare.</p>
<p>After the bowlers restricted Milano XI to 108/7, the openers set the tone with a brisk partnership that took the game away from the visitors inside the first four overs. The captain anchored the middle overs before the finishers wrapped up the chase in style.</p>
<p>The win keeps the Lions at the top of the table. The next challenge comes quickly, and the squad will take confidence from a complete performance with bat and ball.</p>`,
    category: "Match Report",
    image: sample("31723741"),
    publishedAt: relativeDate(-8, 21, 0),
    published: true,
    featured: true,
  },
  {
    id: "a-2",
    slug: "brescia-lions-unveil-new-crest-the-story-behind-it",
    title: "Brescia Lions unveil new crest — The Story Behind It",
    excerpt:
      "Un simbolo, una città, una famiglia. The meaning behind every element of our crest.",
    content: `<p>Every element of the new Brescia Lions crest tells part of our story. The golden crowned lion stands for pride and leadership, while the Colosseum reminds us of the Italian roots of the game we love.</p>
<p>The Italian tricolour flows behind the lion, tying the club to the whole country, and the golden cricket ball at its side shows what we are here to do: play the game at the highest level.</p>
<p>Together they carry our message: one city, one identity. #OrgoglioDiBrescia</p>`,
    category: "Announcement",
    image: sample("6532362"),
    publishedAt: relativeDate(-11, 10, 0),
    published: true,
    featured: false,
  },
  {
    id: "a-3",
    slug: "squad-announced-for-italia-t10-2026-season",
    title: "Squad announced for Italia T10 2026 season",
    excerpt:
      "The franchise confirms its 15-member squad with two new signings.",
    content: `<p>Brescia Lions have named their 15-member squad for the Italia T10 2026 season, blending experienced campaigners with young local talent.</p>
<p>Two new signings join the group, strengthening both the fast-bowling attack and the middle order. The coaching staff says the squad has been built for depth, with every role covered.</p>
<p>Fans can meet the full squad on the Squad page.</p>`,
    category: "Squad",
    image: sample("28697897"),
    publishedAt: relativeDate(-15, 9, 30),
    published: true,
    featured: false,
  },
  {
    id: "a-4",
    slug: "preview-lions-take-on-roma-strikers-away",
    title: "Preview: Lions take on Roma Strikers away",
    excerpt:
      "A tough trip to Roma Stadium awaits as the Lions look to extend their lead at the top.",
    content: `<p>The Lions travel to Roma Stadium for a key fixture against the Strikers, a side that beat us earlier in the season.</p>
<p>The squad has trained hard all week, focusing on powerplay bowling and strike rotation in the middle overs. The captain says the group is ready for the challenge.</p>
<p>Expect a big crowd and a high-scoring contest under the lights.</p>`,
    category: "Preview",
    image: sample("36293965"),
    publishedAt: relativeDate(-5, 12, 0),
    published: true,
    featured: false,
  },
  {
    id: "a-5",
    slug: "fan-day-at-brescia-cricket-ground",
    title: "Fan Day at Brescia Cricket Ground",
    excerpt:
      "Families, young players and supporters joined the squad for a day of cricket and celebration.",
    content: `<p>Hundreds of supporters filled the Brescia Cricket Ground for our first Fan Day, meeting the players, trying their hand at batting and bowling and taking photos with the squad.</p>
<p>Young players from local schools took part in a coaching session led by the team, a reminder that the Lions are a club built on and for the community.</p>
<p>Thank you to everyone who came. See you at the next home match!</p>`,
    category: "Community",
    image: sample("17628715"),
    publishedAt: relativeDate(-19, 15, 0),
    published: true,
    featured: false,
  },
  {
    id: "a-6",
    slug: "lions-battle-past-torino-kings-in-a-thriller",
    title: "Lions battle past Torino Kings in a thriller",
    excerpt:
      "A late surge with the bat and a tight final over secured another two points at home.",
    content: `<p>The Lions held their nerve in a low-scoring thriller against Torino Kings at home, winning by seven wickets after a disciplined bowling performance.</p>
<p>The spinners squeezed the middle overs and the fielding was sharp throughout. The chase was calm and clinical, led by an unbeaten half-century from the opener.</p>
<p>Another strong team effort, and another step towards the top spot.</p>`,
    category: "Match Report",
    image: sample("30387502"),
    publishedAt: relativeDate(-17, 20, 0),
    published: true,
    featured: false,
  },
  {
    id: "a-7",
    slug: "draft-new-training-facilities-announced",
    title: "New training facilities announced",
    excerpt: "Details of the upgraded practice nets coming this winter.",
    content: `<p>Draft article. Not visible on the public website.</p>`,
    category: "Announcement",
    image: sample("36676877"),
    publishedAt: relativeDate(-1, 9, 0),
    published: false,
    featured: false,
  },
];
