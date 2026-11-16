export type Country = "US" | "ES" | "GB";

export type Credential = { name: string; years: string };

export type Degree = {
  country: Country;
  place?: string;
  school?: string;
  credentials: Credential[];
  note?: string;
};

export type ExternalLink = {
  label: string;
  href: string;
  kind: "code" | "video";
};

export type SideProject = {
  name: string;
  label?: string;
  links: ExternalLink[];
};

export type TimelineEntry = {
  kind: "work" | "education";
  year: string;
  period: string;
  title: string;
  org?: string;
  summary?: string;
  projectSlugs?: string[];
  links?: ExternalLink[];
  sideProjects?: SideProject[];
  degrees?: Degree[];
  foundation?: boolean;
  grouped?: boolean;
};

export const timeline: TimelineEntry[] = [
  {
    kind: "work",
    year: "2026",
    period: "Jun 2026 to Jul 2026",
    title: "Software Engineer",
    org: "Alquimista",
    summary:
      "Built an attribution product end to end for a course creator: it traces each sale back to the YouTube video, email, or post that drove it.",
    projectSlugs: ["content-attribution"],
  },
  {
    kind: "work",
    year: "2024",
    period: "Sep 2024 to Jun 2026",
    title: "Software Engineer",
    org: "Rivio AI",
    summary:
      "Worked across the stack at an AI procurement startup. I owned the Next.js frontend, built AI-agent workflows and internal tools, and contributed to the Python services and integrations connecting the product to customers’ existing systems.",
    projectSlugs: [
      "ai-agent-renewals",
      "internal-admin-portal",
      "chat-threads",
    ],
  },
  {
    kind: "work",
    year: "2024",
    period: "Jun 2024 to Sep 2024",
    title: "Software Engineer",
    org: "Ultralight (formerly Vibrant Practice)",
    summary:
      "Built authentication flows and clinician-facing interfaces for an EHR platform using Medplum and FHIR.",
  },
  {
    kind: "work",
    year: "2023",
    period: "Dec 2023 to Feb 2024",
    title: "React Native Engineer",
    org: "Try Reeve",
    summary:
      "Built an iOS app with React Native, Expo, and TypeScript that lets people record audio and revisit personal memories.",
    links: [
      {
        label: "Demo",
        href: "https://www.loom.com/share/7a3cf3e80de4429a8e287f6e36026141",
        kind: "video",
      },
    ],
  },
  {
    kind: "work",
    year: "2023",
    period: "Oct 2023 to Nov 2023",
    title: "Full Stack Developer",
    org: "Make it MVP",
    summary:
      "Built an AI-powered group chat app with React, Firestore, and the OpenAI API. Named team MVP.",
    links: [
      {
        label: "Demo",
        href: "https://www.loom.com/share/4f71c508ea4145988a3921b8c928c2e3",
        kind: "video",
      },
    ],
  },
  {
    kind: "education",
    year: "2023",
    period: "Jun 2023 to Oct 2023",
    org: "BrainStation",
    title:
      "Diploma, Software Engineering · Certificate, Artificial Intelligence",
    summary: "Where I made the switch to software.",
    sideProjects: [
      {
        name: "Calm Companion",
        label: "Capstone",
        links: [
          {
            label: "Code",
            href: "https://github.com/gracigraz/calm-companion",
            kind: "code",
          },
          {
            label: "Demo",
            href: "https://www.loom.com/share/22178aa9e9b74887a369db31d872840a",
            kind: "video",
          },
        ],
      },
      {
        name: "BrainFlix",
        links: [
          {
            label: "Code",
            href: "https://github.com/gracigraz/graciela-manzanares-brainflix",
            kind: "code",
          },
          {
            label: "API",
            href: "https://github.com/gracigraz/graciela-manzanares-brainflix-api",
            kind: "code",
          },
          {
            label: "Demo",
            href: "https://www.loom.com/share/612991362a774c5ca21fd3d0075e6488",
            kind: "video",
          },
        ],
      },
      {
        name: "BandSite",
        links: [
          {
            label: "Code",
            href: "https://github.com/gracigraz/graciela-manzanares-bandsite",
            kind: "code",
          },
          {
            label: "Demo",
            href: "https://www.loom.com/share/78ee7900575a471b98b68f6590033c45",
            kind: "video",
          },
        ],
      },
      {
        name: "InStock",
        label: "Team project",
        links: [
          {
            label: "Code",
            href: "https://github.com/gracigraz/instock",
            kind: "code",
          },
          {
            label: "API",
            href: "https://github.com/gracigraz/instock-api",
            kind: "code",
          },
          {
            label: "Demo",
            href: "https://www.loom.com/share/1d302c6a8d5c4de3a856c644e465ed16",
            kind: "video",
          },
        ],
      },
      {
        name: "Industry project",
        label: "Team project for a cruise line client",
        links: [
          {
            label: "Code",
            href: "https://github.com/gracigraz/industry-project",
            kind: "code",
          },
        ],
      },
    ],
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
      "Developed production tooling and shop-floor workflows for the Cora autonomous aircraft.",
  },
  {
    kind: "work",
    year: "2014",
    period: "2014 to 2019",
    title: "Manufacturing Engineering",
    org: "C&H Enterprises, Ibérica del Espacio",
    grouped: true,
    summary:
      "Worked on new product introduction and thermal-control panels for satellites built for NASA, ESA, and JAXA.",
  },
  {
    kind: "work",
    year: "2013",
    period: "2013 to 2014",
    title: "Internships",
    org: "Viasat Telematics, Empresarios Agrupados, Tecnatom",
    grouped: true,
    summary:
      "Including my first software work: a GPS fleet-tracking system in Java.",
  },
  {
    kind: "education",
    year: "2008",
    period: "2008 to 2017",
    title: "Engineering degrees",
    foundation: true,
    degrees: [
      {
        country: "US",
        place: "San José, California",
        credentials: [
          {
            name: "M.S. Aerospace Engineering, GPA 3.8",
            years: "2016 to 2017",
          },
        ],
        school: "San José State University",
        note: "Aerodynamics lab assistant: designed and ran wind and water tunnel experiments",
      },
      {
        country: "ES",
        place: "Madrid, Spain",
        credentials: [
          {
            name: "M.S. + B.S. Industrial Engineering (Mechanical)",
            years: "2008 to 2015",
          },
        ],
        school: "Comillas Pontifical University",
        note: "Study abroad at the University of Miami and the University of Illinois Urbana-Champaign",
      },
      {
        country: "GB",
        place: "Wrexham, Wales, UK",
        credentials: [
          {
            name: "B.Eng (Hons) Aeronautical and Mechanical Engineering, First Class",
            years: "2011 to 2012",
          },
        ],
        school: "Wrexham University",
      },
    ],
  },
];
