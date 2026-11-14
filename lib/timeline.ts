export type Country = "US" | "ES" | "GB";

export type Degree = {
  country: Country;
  place?: string;
  years: string;
  degree: string;
  school?: string;
  note?: string;
};

export type TimelineEntry = {
  kind: "work" | "education";
  year: string;
  period: string;
  title: string;
  org?: string;
  summary?: string;
  projectSlugs?: string[];
  link?: { label: string; href: string };
  degrees?: Degree[];
};

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    year: "2024",
    period: "Sep 2024 to Jun 2026",
    title: "Software Engineer",
    org: "Rivio AI",
    summary:
      "AI procurement software. I owned the product's Next.js frontend, worked on the team's AI agent, built the internal admin portal, and connected the product to the systems customers already used.",
    projectSlugs: [
      "ai-agent-renewals",
      "internal-admin-portal",
      "zip-sync-investigation",
    ],
  },
  {
    kind: "work",
    year: "2024",
    period: "Jun 2024 to Sep 2024",
    title: "Software Engineer",
    org: "Ultralight (formerly Vibrant Practice)",
    summary:
      "Authentication and clinician-facing interfaces for an EHR platform built on Medplum and FHIR.",
  },
  {
    kind: "work",
    year: "2023",
    period: "Dec 2023 to Feb 2024",
    title: "React Native Engineer",
    org: "Try Reeve",
    summary: "An iOS app built with React Native, Expo, and TypeScript.",
  },
  {
    kind: "work",
    year: "2023",
    period: "Oct 2023 to Nov 2023",
    title: "Full Stack Developer",
    org: "Make it MVP",
    summary:
      "An AI group-chat app with React, Firestore, and the OpenAI API. Named MVP of the team.",
  },
  {
    kind: "education",
    year: "2023",
    period: "Jun 2023 to Oct 2023",
    title: "BrainStation",
    summary: "Where I made the switch to software.",
    degrees: [
      {
        country: "US",
        place: "Miami, Florida",
        years: "Jun to Sep 2023",
        degree: "Diploma, Software Engineering",
      },
      {
        country: "US",
        years: "Sep to Oct 2023",
        degree: "Certificate, Artificial Intelligence",
      },
    ],
    link: {
      label: "Earlier projects",
      href: "https://star-rise-587.notion.site/Portfolio-Graciela-Manzanares-16c72ddc3c6f49eead7dfb50eebeba55",
    },
  },
  {
    kind: "work",
    year: "2022",
    period: "Feb 2022 to May 2023",
    title: "New Product Introduction Engineer",
    org: "Nuro",
    summary:
      "Took radar, camera, and microphone assemblies for autonomous vehicles from prototype to production.",
  },
  {
    kind: "work",
    year: "2019",
    period: "Feb 2019 to Feb 2022",
    title: "Manufacturing Engineer, then Senior",
    org: "Wisk (formerly Kitty Hawk)",
    summary:
      "Production tooling and shop-floor workflows for the Cora autonomous aircraft.",
  },
  {
    kind: "work",
    year: "2014",
    period: "2014 to 2019",
    title: "Manufacturing Engineering",
    org: "C&H Enterprises, Ibérica del Espacio, SJSU Aerodynamics Lab",
    summary:
      "New product introduction, and thermal control panels for satellites built for NASA, ESA, and JAXA.",
  },
  {
    kind: "work",
    year: "2013",
    period: "2013 to 2014",
    title: "Internships",
    org: "Viasat Telematics, Empresarios Agrupados, Tecnatom",
    summary:
      "Including my first software work: a GPS fleet-tracking system in Java.",
  },
  {
    kind: "education",
    year: "2008",
    period: "2008 to 2017",
    title: "Engineering degrees",
    degrees: [
      {
        country: "US",
        place: "San José, California",
        years: "2016 to 2017",
        degree: "M.S. Aerospace Engineering",
        school: "San José State University",
      },
      {
        country: "ES",
        place: "Madrid, Spain",
        years: "2008 to 2015",
        degree:
          "M.S. Industrial Engineering, and a bachelor's in Industrial Engineering (Mechanical)",
        school: "Comillas Pontifical University",
        note: "Study abroad at the University of Miami and the University of Illinois Urbana-Champaign",
      },
      {
        country: "GB",
        place: "Wrexham, Wales, UK",
        years: "2011 to 2012",
        degree: "B.Eng (Hons) Aeronautical and Mechanical Engineering, First Class",
        school: "Wrexham University",
      },
    ],
  },
];
