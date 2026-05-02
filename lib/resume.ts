import { readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import type { ResumeData } from "@/types/resume";

const resumePath = path.join(process.cwd(), "content/resume.json");

export const getResumeData = cache(async (): Promise<ResumeData> => {
  const source = await readFile(resumePath, "utf8");

  return JSON.parse(source) as ResumeData;
});
