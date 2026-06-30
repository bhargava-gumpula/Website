export type Project = {
  title: string;
  summary: string;
  stack: string[];
  githubUrl?: string;
  youtubeUrl?: string;
  demoUrl?: string;
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
    description: "Choose 1-on-1 or group classes depending on your goals.",
    scheduleNote: "Class schedule coming soon."
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
  datesNote: "Class schedule coming soon.",
  ctaTitle: "Ready to join a class?",
  ctaDescription: "Send your goals and preferred format. I will follow up with the next available slot.",
  ctaLabel: "Register Interest",
  ctaHref: "/contact"
};

export const contactPageContent = {
  eyebrow: "Contact",
  title: "Ask a question or register for classes",
  description: "Use this form to request class details, ask questions, or discuss collaborations."
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
      "Private sessions in person or online, tailored from sub-90 seconds through sub-20 second goals. Most learners need about 4–6 classes to learn the cube."
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
      "In-person group sessions with step-by-step progression from sub-90 through sub-20 second tracks. Most learners need about 4–6 classes to learn the cube."
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
      "Private Python mentoring in person or online for students who want individualized pacing and targeted support."
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
      "In-person group class covering Python basics: variables, loops, conditionals, functions, classes, and practical coding foundations."
  },
  {
    title: "Data Structures and Algorithms",
    slug: "data-structures-and-algorithms",
    category: "C++",
    format: "Group",
    level: "Intermediate",
    status: "Coming Soon",
    summary: "Upcoming track focused on DSA fundamentals and problem-solving skills for competitive programming."
  },
  {
    title: "Introduction to C++",
    slug: "introduction-to-cpp",
    category: "C++",
    format: "Group",
    level: "Beginner",
    status: "Coming Soon",
    summary: "Upcoming beginner-friendly C++ class for syntax, core concepts, and coding fundamentals."
  }
];

export const testimonials: Testimonial[] = [];

export function getClassRegistrationTitle(classItem: ClassOffering): string {
  return classItem.titleSubline ? `${classItem.title} ${classItem.titleSubline}` : classItem.title;
}

export function parsePriceBadgeToCents(priceBadge: string): number {
  const match = priceBadge.match(/\$(\d+(?:\.\d{2})?)/);
  if (!match) return 0;
  return Math.round(parseFloat(match[1]) * 100);
}
