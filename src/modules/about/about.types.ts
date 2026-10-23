export interface AboutStat {
  label: string;
  value: string;
}

export interface CrestElement {
  title: string;
  text: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
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
  historyImage: string;
  crestIntro: string;
  crestElements: CrestElement[];
  mission: string;
  vision: string;
  management: StaffMember[];
  coaching: StaffMember[];
}
