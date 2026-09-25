export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  workArrangement: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  postingDate: string;
}

export const ACTIVE_JOB_OPENINGS: JobOpening[] = [];

export const CAREERS_OVERVIEW = {
  headline: "Build modern software, cloud, and data solutions with AAROHA",
  subheadline:
    "We are always looking for curious engineers, data specialists, and solution architects who take pride in crafting clean, scalable technology.",
  benefits: [
    { title: "Enterprise Projects", description: "Work on real cloud, data, and software systems for growing businesses." },
    { title: "Continuous Learning", description: "Direct access to senior mentors and upskilling opportunities across new technologies." },
    { title: "Collaborative Culture", description: "Direct team communication, daily standups, and transparent delivery practices." },
  ],
};
