import type { Article } from "@/modules/articles/article.types";

// Stories created by "Load demo content" in the admin dashboard.
export type SeedArticle = Omit<Article, "isDemo" | "imagePublicId">;

export const articles: SeedArticle[] = [
  {
    id: "a-1",
    slug: "brescia-lions-appoint-mohammad-hafeez-as-head-coach",
    title:
      "Brescia Lions Appoint Mohammad Hafeez as Head Coach for Inaugural Italia T10 League Season",
    excerpt:
      "Former Pakistan captain and legendary all-rounder Mohammad Hafeez will lead the Lions in their first Italia T10 League campaign.",
    content: `<p><img src="/images/news/hafeez-head-coach-poster.jpg" alt="Mohammad Hafeez, Head Coach of Brescia Lions" /></p>
<p>Brescia Lions are delighted to announce the appointment of former Pakistan captain and legendary all-rounder Mohammad Hafeez as Head Coach for the franchise's inaugural season in the Italia T10 League.</p>
<p>Hafeez brings extensive international experience, tactical knowledge and a deep understanding of modern cricket to the Brescia Lions setup. His appointment marks an important step as the franchise prepares to make its mark in the competition.</p>
<p>A highly respected figure in Pakistan cricket, Hafeez represented his country for 18 years across international cricket, featuring in 392 international matches and scoring 12,780 runs while taking 253 wickets. He was a key member of Pakistan's squad that won the ICC Champions Trophy in 2017 and established himself as one of the country's prominent all-rounders, particularly in limited-overs cricket.</p>
<p>Transitioning into coaching and team leadership, Hafeez has continued to contribute to the game beyond his playing career. He served as Director of the Pakistan Men's National Cricket Team in 2023–24 and is an ICC Level III Coach. He is currently serving as Head Coach of SNGPL, a role he has held since 2024. Under his leadership, SNGPL won the President's Cup in 2024, adding a significant achievement to his coaching career.</p>
<p>Speaking on the appointment, Brescia Lions Owner Mian Asif Nadeem said:</p>
<blockquote><p>“We are delighted to welcome Mohammad Hafeez as the Head Coach of Brescia Lions for our inaugural season in the Italia T10 League. His experience as an international cricketer, his understanding of the modern game and his coaching credentials make him a valuable addition to our franchise. We believe his leadership will play an important role in building a competitive team and establishing the right culture from the outset. We look forward to beginning this journey together and representing Brescia with pride.”</p></blockquote>
<p>With Hafeez at the helm, Brescia Lions look forward to building a strong foundation for their first campaign, combining international expertise with ambition as they prepare to compete in the Italia T10 League.</p>`,
    category: "Announcement",
    image: "/images/news/hafeez-head-coach-cover.jpg",
    publishedAt: new Date().toISOString(),
    published: true,
    featured: true,
  },
  {
    id: "a-2",
    slug: "brescia-lions-announce-signing-of-johnson-charles",
    title: "Brescia Lions Announce Signing of Johnson Charles for Inaugural Italia T10 2026",
    excerpt:
      "West Indies international star Johnson Charles joins the Lions for the inaugural edition of Italia T10 2026.",
    content: `<p><img src="/images/news/johnson-charles-poster.jpg" alt="Welcome Johnson Charles to Brescia Lions" /></p>
<p>Brescia, Italy — Brescia Lions are pleased to officially announce the signing of West Indies international star Johnson Charles for the inaugural edition of Italia T10 2026.</p>
<p>The signing marks a significant addition to the Brescia Lions squad, with Charles bringing extensive international experience, explosive batting ability, and a proven record of success in global franchise cricket.</p>
<p>A two-time ICC Men's T20 World Cup champion with the West Indies, Johnson Charles has established himself as a dynamic top-order batter capable of delivering match-winning performances on the biggest stages. His impressive career also includes championship success in the Pakistan Super League (PSL), Caribbean Premier League (CPL), and Lanka Premier League (LPL), highlighting his experience in some of the world's most competitive T20 competitions.</p>
<p>Known for his aggressive stroke play, ability to accelerate the scoring rate, and experience under pressure, Charles is expected to bring valuable firepower and leadership to the Brescia Lions setup as the team prepares for the historic first edition of Italia T10.</p>
<p>Brescia Lions remain committed to building a competitive squad that combines international quality with ambition, professionalism, and a winning mentality. The acquisition of a player of Charles's calibre reflects the club's determination to make a strong statement in the tournament and deliver an exciting campaign for its supporters.</p>
<p>The Brescia Lions looks forward to welcoming Johnson Charles to the Lions family and anticipates an exciting journey ahead in Italia T10 2026.</p>`,
    category: "Announcement",
    image: "/images/news/johnson-charles-cover.jpg",
    publishedAt: new Date().toISOString(),
    published: true,
    featured: true,
  },
  {
    id: "a-3",
    slug: "brescia-lions-land-rassie-van-der-dussen",
    title:
      "Brescia Lions Land South African Star Rassie van der Dussen Ahead of Historic Italia T10 2026 Debut",
    excerpt:
      "South African batting star Rassie van der Dussen joins the Lions for the inaugural edition of Italia T10 2026.",
    content: `<p><img src="/images/news/rassie-van-der-dussen-poster.jpg" alt="Welcome Rassie van der Dussen to Brescia Lions" /></p>
<p>BRESCIA, ITALY — Brescia Lions have secured a major international signing ahead of the inaugural Italia T10 2026, bringing South African batting star Rassie van der Dussen into their squad for the tournament's first-ever edition.</p>
<p>The acquisition of one of South Africa's established international batters signals the Lions' intent to make an impact in the competition, adding proven experience, composure, and top-order quality to their campaign.</p>
<p>Van der Dussen has earned international recognition for his consistency, tactical awareness, and ability to perform under pressure. Equally comfortable building an innings or shifting gears when the situation demands, he brings a versatile batting profile to a format where quick decisions and calculated aggression can prove decisive.</p>
<p>His credentials extend beyond international cricket. Van der Dussen was part of the MI Cape Town squad that won the SA20 title, adding franchise silverware to his career achievements. His experience in high-profile T20 competitions provides Brescia Lions with a player familiar with the demands of elite franchise cricket and the importance of delivering in crucial moments.</p>
<p>For a tournament making its debut in 2026, the arrival of an international performer of van der Dussen's stature adds further interest to the Lions' campaign. His technical ability, experience against quality bowling attacks, and adaptable approach could prove particularly valuable in the high-tempo environment of T10 cricket.</p>
<p>The signing also underlines Brescia Lions' ambition to establish themselves as a competitive force from the outset of Italia T10. With the inaugural edition offering teams an opportunity to make their mark in a new cricketing chapter, the Lions are building a squad designed to combine international pedigree with an aggressive approach to the shortest format.</p>
<p>Rassie van der Dussen is a Lion. Brescia Lions now look ahead to Italia T10 2026 with another internationally recognised name ready to represent the club on the tournament's opening stage.</p>
<p>Brescia Lions are preparing for the inaugural edition of Italia T10 2026, aiming to bring competitive cricket, international talent, and an exciting brand of the game to the tournament.</p>`,
    category: "Announcement",
    image: "/images/news/rassie-van-der-dussen-cover.jpg",
    publishedAt: new Date().toISOString(),
    published: true,
    featured: true,
  },
  {
    id: "a-4",
    slug: "brescia-lions-sign-maaz-sadaqat",
    title:
      "Brescia Lions Sign Pakistan's Rising All-Rounder Maaz Sadaqat for Inaugural Italia T10 League Season",
    excerpt:
      "Pakistan international all-rounder Maaz Sadaqat joins the Lions for the inaugural season of the Italia T10 League.",
    content: `<p><img src="/images/news/maaz-sadaqat-poster.jpg" alt="Welcome Maaz Sadaqat to Brescia Lions" /></p>
<p>Brescia Lions are delighted to announce the signing of Pakistan international all-rounder Maaz Sadaqat for the inaugural season of the Italia T10 League.</p>
<p>One of Pakistan cricket's exciting young talents, Sadaqat brings explosive left-handed batting and useful slow left-arm orthodox bowling to the Brescia Lions squad. His ability to contribute with both bat and ball makes him a valuable addition as the franchise prepares for its debut campaign.</p>
<p>Sadaqat has represented Pakistan at the international level and made his ODI debut in March 2026. He gained significant attention following his performances in the 2025 Asia Cup Rising Stars tournament, where he emerged as the leading run-scorer. His progress has continued through domestic and franchise cricket, showcasing his potential as a dynamic modern-day all-rounder.</p>
<p>His arrival adds further quality and versatility to the Brescia Lions lineup as the team looks to make a strong impression in its first appearance in the competition.</p>
<p>Brescia Lions are excited to welcome Maaz Sadaqat to the franchise and look forward to seeing him represent the team in the Italia T10 League.</p>`,
    category: "Announcement",
    image: "/images/news/maaz-sadaqat-cover.jpg",
    publishedAt: new Date().toISOString(),
    published: true,
    featured: true,
  },
];
