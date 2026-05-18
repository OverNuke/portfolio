export const PRIMARY_TAPE_ITEMS: { cat: string; name: string }[] = [
  { cat: "LANG",   name: "JavaScript" },
  { cat: "LANG",   name: "Python" },
  { cat: "FRMWK",  name: "Express" },
  { cat: "FRMWK",  name: "Flutter" },
  { cat: "PLAT",   name: "Firebase" },
  { cat: "DEVOPS", name: "Docker" },
  { cat: "VCS",    name: "Git" },
  { cat: "API",    name: "Postman" },
  { cat: "DB",     name: "MySQL" },
];

export const ALT_TAPE_LOGOS: { src: string; alt: string }[] = [
  { src: "/dev-icons/expressjs-light.svg", alt: "Express.js" },
  { src: "/dev-icons/python.svg",          alt: "Python"     },
  { src: "/dev-icons/flutter.svg",         alt: "Flutter"    },
  { src: "/dev-icons/firebase.svg",        alt: "Firebase"   },
  { src: "/dev-icons/docker.svg",          alt: "Docker"     },
  { src: "/dev-icons/git.svg",             alt: "Git"        },
  { src: "/dev-icons/postman.svg",         alt: "Postman"    },
  { src: "/dev-icons/vscode.svg",          alt: "VS Code"    },
  { src: "/dev-icons/mysql.svg",           alt: "MySQL"      },
];

export const TAPE_FOOT_STATS: { label: string; value: string }[] = [
  { label: "Languages",  value: "04" },
  { label: "Frameworks", value: "04" },
  { label: "Tools",      value: "03" },
];

export const TAPE_META = {
  track: "Track 01 — Primary Stack",
  bpm: 42,
};
