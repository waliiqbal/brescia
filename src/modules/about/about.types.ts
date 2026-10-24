export interface AboutStat {
  label: string;
  value: string;
}

export interface CrestElement {
  title: string;
  subtitle?: string;
  /** Lines are split on "\n"; a "LABEL: text" line shows the label in gold. */
  text: string;
}

export interface StaffMember {
  id: string;
  /** Used in the profile page address (/squad/staff/<slug>). */
  slug?: string;
  name: string;
  role: string;
  /** Short line shown on the card. */
  bio?: string;
  /** Longer profile text shown on the staff page. */
  profile?: string;
  experience?: string;
  speciality?: string;
  image?: string;
}

export interface Owner {
  name: string;
  /** Small gold line above the name. */
  kicker: string;
  paragraphs: string[];
  /** Large gold closing lines. */
  closing: string[];
  /** Sign-off line under the closing text. */
  signature: string;
  image?: string;
}

export interface About {
  /** Home page intro. */
  heading: string;
  paragraphs: string[];
  image: string;
  stats: AboutStat[];
  /** About Us page. */
  history: string[];
  /** Short closing lines shown in large gold text under the history. */
  historyClosing: string[];
  historyImage: string;
  owner: Owner;
  crestIntro: string;
  crestElements: CrestElement[];
  mission: string;
  vision: string;
  management: StaffMember[];
  coaching: StaffMember[];
}
