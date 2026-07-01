export type Project = {
  title: string;
  summary: string;
  stack: string[];
  githubUrl?: string;
  youtubeUrl?: string;
  demoUrl?: string;
};

export type ClassDetailSection = {
  title: string;
  items: string[];
};

export type ClassLocation = {
  inPerson?: string;
  online?: string;
  announcement?: string;
};

export type ClassDetail = {
  overview: string;
  sessionLength: string;
  location: ClassLocation;
  groupSize?: string;
  pricingDetail: string;
  timelineNote?: string;
  sections: ClassDetailSection[];
  showHeaderPrice?: boolean;
  showHeaderStatus?: boolean;
};

export const classVenueName = "Evergreen Branch Library";
export const classVenueInPersonLine = `In person at ${classVenueName}`;
export const classVenueOnlineLine = "Online (video call)";
export const inPersonClassLocation: ClassLocation = { inPerson: classVenueInPersonLine };
export const oneOnOneClassLocation: ClassLocation = {
  inPerson: classVenueInPersonLine,
  online: classVenueOnlineLine
};
export const comingSoonClassLocation: ClassLocation = {
  announcement: "Format and location to be announced"
};

export type ClassOffering = {
  title: string;
  titleSubline?: string;
  slug: string;
  category: "Rubik's Cubing" | "Python" | "C++";
  format: "1-on-1" | "Group";
  level: "Beginner" | "Intermediate" | "Advanced";
  status: "Open" | "Coming Soon";
  summary: string;
  priceBadge?: string;
  showPriceBadge?: boolean;
  showStatusBadge?: boolean;
  detail: ClassDetail;
};

export type Testimonial = {
  name: string;
  highlight: string;
  text: string;
};

export type HomeStat = {
  label: string;
  value: number;
  suffix?: string;
};

export type Achievement = {
  label: string;
  certificateUrl?: string;
};

export const siteIdentity = {
  brandName: "Bhargava Gumpula",
  siteTitle: "Bhargava Gumpula | Portfolio and Classes",
  siteDescription: "Projects, cubing achievements, and classes by Bhargava Gumpula."
};

export const promoBanner = {
  code: "SUMMER100",
  /** Last day the banner is shown (inclusive), America/Los_Angeles */
  expiresOn: "2026-07-16",
  message: "Use code SUMMER100 at checkout for 100% off group classes · Expires July 16"
};

export const externalLinks = {
  github: "https://github.com/bhargava-gumpula",
  linkedin: "https://www.linkedin.com/in/bhargava-gumpula-5000b9300/",
  wca: "https://www.worldcubeassociation.org/persons/2019GUMP01",
  youtube: "https://www.youtube.com/@BhargavaGumpula"
};

export const highlights: HomeStat[] = [
  { label: "Projects", value: 2, suffix: "+" },
  { label: "Competitions", value: 8, suffix: "+" },
  { label: "Certifications", value: 3, suffix: "" }
];

export const profileMetrics = {
  fastest3x3Seconds: 7.8,
  average3x3Seconds: 11,
  competitions: 8
};

export const homeContent = {
  heroEyebrow: "Cubing + Computer Science + Teaching",
  heroTitle: "Hi, I am Bhargava Gumpula.",
  heroDescription:
    "I build computer science projects, compete in cubing, and teach Rubik's Cube, Python, C, C++, Data Structures, and Algorithms through practical and structured classes.",
  primaryCtaLabel: "View Classes",
  primaryCtaHref: "/classes",
  secondaryCtaLabel: "See Projects",
  secondaryCtaHref: "/projects",
  projectsSection: {
    eyebrow: "Featured Projects",
    title: "Proof through real project work",
    description: "These projects demonstrate practical coding and problem-solving."
  },
  classesSection: {
    eyebrow: "Classes",
    title: "Learning options you can join now",
    description: "Choose 1-on-1 or group classes depending on your goals."
  },
  testimonialsSection: {
    eyebrow: "Testimonials",
    title: "What learners say",
    description: "Testimonials are coming soon."
  }
};

export const aboutContent = {
  eyebrow: "About",
  title: "Computer science builder, cubing competitor, and instructor",
  description:
    "I combine technical problem-solving, USACO experience, competitive cubing, and practical teaching to help learners grow with confidence.",
  bioParagraphs: [
    "I am Bhargava Gumpula, a computer science learner and builder who enjoys creating real, useful projects. My strongest languages are Python, C, and C++. I am well-versed in data structures and algorithms, and I also work with SQL, HTML, CSS, JavaScript, and Flask.",
    "In cubing, I actively compete and continue improving through regular practice and events. My fastest 3x3 solve is 7.8 seconds, and my average is around 11 seconds. I also solve many puzzle types beyond 3x3, including 2x2, 4x4, 5x5, Pyraminx, Skewb, Megaminx, and more.",
    "On this website, I share projects, teach Rubik's Cube and programming classes, and build a long-term learning community."
  ],
  profilePlaceholderText: "Profile image area. Replace with your personal photo when ready.",
  skillsTitle: "Skills and Focus Areas",
  skills: [
    "Python",
    "C",
    "C++",
    "SQL",
    "HTML",
    "CSS",
    "JavaScript",
    "Flask",
    "USACO Bronze",
    "Competitive Cubing",
    "Data Structures",
    "Algorithms"
  ],
  achievementsTitle: "Achievements",
  achievements: [
    {
      label: "Harvard CS50x: Introduction to Computer Science",
      certificateUrl: "/certificates/cs50x-certificate.pdf"
    },
    {
      label: "Harvard CS50P: Introduction to Programming with Python",
      certificateUrl: "/certificates/cs50p-certificate.pdf"
    },
    {
      label: "Codio C++ certification completed",
      certificateUrl: "/certificates/codio-cpp-certificate.pdf"
    },
    { label: "USACO Bronze level participant" },
    { label: "8+ cubing competitions and counting" },
    { label: "Fastest 3x3 solve: 7.8 seconds" }
  ] satisfies Achievement[]
};

export const projectsPageContent = {
  eyebrow: "Projects",
  title: "Selected projects from CS50 work",
  description: "Each project includes practical functionality and a demo video."
};

export const classesPageContent = {
  eyebrow: "Classes",
  title: "Rubik's Cubing and Python classes",
  description:
    "Join 1-on-1 or group sessions. 1-on-1 is available in person or online. Group classes are in person only.",
  ctaTitle: "Have a question?",
  ctaDescription: "Reach out about classes, scheduling, or anything else.",
  ctaLabel: "Contact",
  ctaHref: "/contact"
};

export const contactPageContent = {
  eyebrow: "Contact",
  title: "Ask a question",
  description: "Use this form for general questions, collaborations, or anything else you would like to discuss."
};

export const projects: Project[] = [
  {
    title: "Web-based LED Controller (Raspberry Pi)",
    summary:
      "Built for Harvard CS50x. Controls an LED array from a web interface with per-LED control and animation patterns like circular spin and random flashing.",
    stack: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Raspberry Pi"],
    githubUrl: "https://github.com/bhargava-gumpula/cs50/tree/main/project",
    youtubeUrl: "https://www.youtube.com/watch?v=UnIvxDrQVKg"
  },
  {
    title: "Online Grocery Store Implementation",
    summary:
      "Built for Harvard CS50P. Includes multi-user account handling, product catalog, cart updates, card checkout, and transaction logging with balance validation.",
    stack: ["Python", "File Storage", "Account System"],
    youtubeUrl: "https://www.youtube.com/watch?v=BkqTLnhLsCg"
  }
];

export const classes: ClassOffering[] = [
  {
    title: "Rubik's Cubing (1-on-1)",
    slug: "rubiks-cubing-1-on-1",
    category: "Rubik's Cubing",
    format: "1-on-1",
    level: "Beginner",
    status: "Open",
    priceBadge: "$20",
    summary:
      "Private sessions in person or online, tailored from sub-90 seconds through sub-20 second goals. Most learners need about 4–6 classes to learn the cube.",
    detail: {
      overview:
        "One-on-one Rubik's Cube coaching built around your current speed and goals. Sessions are structured, practical, and paced for you — whether you are solving for the first time or pushing toward faster times.",
      sessionLength: "45 minutes per session",
      location: oneOnOneClassLocation,
      pricingDetail: "$20 per session",
      showHeaderPrice: false,
      showHeaderStatus: false,
      timelineNote: "Most learners need about 4-6 sessions to reach their speed goal.",
      sections: [
        {
          title: "What you get",
          items: [
            "Private coaching with feedback on every step",
            "A clear path from first solve through faster methods",
            "Homework-style practice goals between sessions",
            "Flexible pacing based on your progress"
          ]
        },
        {
          title: "Speed tracks and methods",
          items: [
            "Sub 90 seconds — beginner's method (layer-by-layer)",
            "Sub 60 seconds — optimized layer-by-layer (efficient cross and first two layers)",
            "Sub 45 seconds — 2-look OLL and 2-look PLL with finger tricks",
            "Sub 30 seconds — intuitive F2L",
            "Sub 20 seconds — full CFOP (cross, F2L, OLL, and PLL)"
          ]
        }
      ]
    }
  },
  {
    title: "Rubik's Cubing (Group)",
    slug: "rubiks-cubing-group",
    category: "Rubik's Cubing",
    format: "Group",
    level: "Beginner",
    status: "Open",
    priceBadge: "$10",
    summary:
      "In-person group sessions with step-by-step progression from sub-90 through sub-20 second tracks. Most learners need about 4–6 classes to learn the cube.",
    detail: {
      overview:
        "Small in-person group classes for learners who want structure, community, and steady progress on the Rubik's Cube. Each session builds on the last with clear demonstrations and guided practice.",
      sessionLength: "45 minutes per session",
      location: inPersonClassLocation,
      groupSize: "5–8 students",
      pricingDetail: "$10 per session",
      showHeaderPrice: false,
      showHeaderStatus: false,
      timelineNote: "Most learners need about 4-6 sessions to reach their speed goal.",
      sections: [
        {
          title: "What you get",
          items: [
            "Step-by-step instruction in a small group setting",
            "Shared practice with peers at a similar stage",
            "Structured progression through speed tracks",
            "Hands-on help during every session"
          ]
        },
        {
          title: "Speed tracks and methods",
          items: [
            "Sub 90 seconds — beginner's method (layer-by-layer)",
            "Sub 60 seconds — optimized layer-by-layer (efficient cross and first two layers)",
            "Sub 45 seconds — 2-look OLL and 2-look PLL with finger tricks",
            "Sub 30 seconds — intuitive F2L",
            "Sub 20 seconds — full CFOP (cross, F2L, OLL, and PLL)"
          ]
        }
      ]
    }
  },
  {
    title: "Python Fundamentals",
    titleSubline: "(1-on-1)",
    slug: "python-fundamentals-1-on-1",
    category: "Python",
    format: "1-on-1",
    level: "Beginner",
    status: "Open",
    priceBadge: "$25",
    summary:
      "Private Python mentoring in person or online for students who want individualized pacing and targeted support.",
    detail: {
      overview:
        "Private Python fundamentals coaching for students who want focused help building real coding skills. Lessons adapt to your pace, questions, and projects.",
      sessionLength: "45 minutes per session",
      location: oneOnOneClassLocation,
      pricingDetail: "$25 per session",
      showHeaderPrice: false,
      showHeaderStatus: false,
      sections: [
        {
          title: "What you get",
          items: [
            "One-on-one instruction tailored to your level",
            "Clear explanations with live coding examples",
            "Practice problems matched to what you just learned",
            "Guidance on debugging and reading error messages"
          ]
        },
        {
          title: "Topics covered",
          items: [
            "Python basics and how to run programs",
            "Variables, data types, and input/output",
            "Conditionals and loops",
            "Functions and organizing code",
            "Basic data structures",
            "Classes and introductory object-oriented ideas",
            "Small projects that combine multiple concepts"
          ]
        }
      ]
    }
  },
  {
    title: "Python Fundamentals (Group)",
    slug: "python-fundamentals-group",
    category: "Python",
    format: "Group",
    level: "Beginner",
    status: "Open",
    priceBadge: "$15",
    summary:
      "In-person group class covering Python basics: variables, loops, conditionals, functions, classes, and practical coding foundations.",
    detail: {
      overview:
        "A beginner-friendly in-person group class for learning Python from the ground up. Sessions combine short explanations, live coding, and hands-on exercises so concepts stick.",
      sessionLength: "45 minutes per session",
      location: inPersonClassLocation,
      groupSize: "5–8 students",
      pricingDetail: "$15 per session",
      showHeaderPrice: false,
      showHeaderStatus: false,
      sections: [
        {
          title: "What you get",
          items: [
            "Structured weekly-style progression in a small group",
            "In-class coding exercises with instructor support",
            "A foundation for school projects and future CS classes",
            "Peer learning in a focused classroom setting"
          ]
        },
        {
          title: "Topics covered",
          items: [
            "Python basics and how to run programs",
            "Variables, data types, and input/output",
            "Conditionals and loops",
            "Functions and organizing code",
            "Basic data structures",
            "Classes and introductory object-oriented ideas",
            "Small projects that combine multiple concepts"
          ]
        }
      ]
    }
  },
  {
    title: "Data Structures and Algorithms",
    slug: "data-structures-and-algorithms",
    category: "C++",
    format: "Group",
    level: "Intermediate",
    status: "Coming Soon",
    summary: "Upcoming track focused on DSA fundamentals and problem-solving skills for competitive programming.",
    detail: {
      overview:
        "An upcoming group track for students ready to move beyond syntax into data structures, algorithms, and competitive programming-style problem solving. Full syllabus and schedule will be posted before registration opens.",
      sessionLength: "45 minutes per session (planned)",
      location: comingSoonClassLocation,
      groupSize: "Small group (planned)",
      pricingDetail: "Pricing to be announced",
      sections: [
        {
          title: "Planned focus areas",
          items: [
            "Core data structures — arrays, stacks, queues, trees, and graphs",
            "Algorithm patterns and time complexity basics",
            "Problem decomposition and implementation practice",
            "Preparation for contests such as USACO"
          ]
        },
        {
          title: "Who this is for",
          items: [
            "Students comfortable with at least one programming language",
            "Learners preparing for CS competitions or advanced coursework",
            "Anyone who wants stronger analytical coding skills"
          ]
        }
      ]
    }
  },
  {
    title: "Introduction to C++",
    slug: "introduction-to-cpp",
    category: "C++",
    format: "Group",
    level: "Beginner",
    status: "Coming Soon",
    summary: "Upcoming beginner-friendly C++ class for syntax, core concepts, and coding fundamentals.",
    detail: {
      overview:
        "An upcoming beginner group class for learning C++ syntax, core programming concepts, and the habits needed for more advanced computer science work. Details will be posted before registration opens.",
      sessionLength: "45 minutes per session (planned)",
      location: comingSoonClassLocation,
      groupSize: "Small group (planned)",
      pricingDetail: "Pricing to be announced",
      sections: [
        {
          title: "Planned focus areas",
          items: [
            "C++ syntax and program structure",
            "Variables, types, conditionals, and loops",
            "Functions and basic code organization",
            "Introductory memory and debugging concepts",
            "Practice problems that build toward DSA topics"
          ]
        },
        {
          title: "Who this is for",
          items: [
            "Beginners who want a strong typed-language foundation",
            "Python learners ready to add C++ to their toolkit",
            "Students preparing for advanced CS or competition tracks"
          ]
        }
      ]
    }
  }
];

export function getClassBySlug(slug: string): ClassOffering | undefined {
  return classes.find((classItem) => classItem.slug === slug);
}

export const testimonials: Testimonial[] = [];

export function getClassRegistrationTitle(classItem: ClassOffering): string {
  return classItem.titleSubline ? `${classItem.title} ${classItem.titleSubline}` : classItem.title;
}

export function parsePriceBadgeToCents(priceBadge: string): number {
  const match = priceBadge.match(/\$(\d+(?:\.\d{2})?)/);
  if (!match) return 0;
  return Math.round(parseFloat(match[1]) * 100);
}
