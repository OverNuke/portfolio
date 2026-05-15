import type { Project } from "@/types";

export type ProjectCategory =
  | "Backend"
  | "Mobile"
  | "Module"
  | "Frontend"
  | "Project";

const CATEGORY_RULES: Array<{ tags: readonly string[]; category: ProjectCategory }> = [
  { tags: ["flutter", "dart", "swift", "kotlin", "react native"], category: "Mobile" },
  { tags: ["odoo"], category: "Module" },
  { tags: ["express", "django", "flask", "fastapi", "node.js", "mysql", "postgresql", "postgres", "docker"], category: "Backend" },
  { tags: ["next.js", "react", "vue", "svelte", "tailwind", "shaders", "typescript"], category: "Frontend" },
];

export function getProjectCategory(project: Project): ProjectCategory {
  if (project.medium) {
    const m = project.medium.toLowerCase();
    if (m.includes("front")) return "Frontend";
    if (m.includes("back")) return "Backend";
    if (m.includes("mobile")) return "Mobile";
    if (m.includes("module")) return "Module";
  }
  const lower = project.tags.map((t) => t.toLowerCase());
  for (const rule of CATEGORY_RULES) {
    if (rule.tags.some((t) => lower.includes(t))) return rule.category;
  }
  return "Project";
}

export function getProjectStatus(project: Project): "Live" | "Private" {
  return project.repo && project.repo !== "#" ? "Live" : "Private";
}

export function splitProjects(projects: readonly Project[]) {
  const featured = projects.find((p) => p.featured) ?? projects[0];
  const tiles = projects.filter((p) => p !== featured).slice(0, 3);
  return { featured, tiles };
}
