
// src/utils/cv.ts
import * as pdfjsLib from "pdfjs-dist";

export async function extractTextFromPDF(file: File): Promise<string> {
  const ab = await file.arrayBuffer();

  // Run PDF.js on the main thread -> no worker import needed
  const pdf = await (pdfjsLib as any).getDocument({
    data: new Uint8Array(ab),
    disableWorker: true,         // <- key line
  }).promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((it: any) => ("str" in it ? it.str : "")).join(" ") + "\n";
  }
  return text;
}

// keep the rest (analyzeCV, highlightKeywords) as-is

export function analyzeCV(text: string) {
  const lower = text.toLowerCase()
  const skillsDict = [
    'javascript','typescript','react','vue','angular','html','css','tailwind','vite','webpack',
    'node','express','nestjs','java','spring','go','python','django','fastapi','flask',
    'sql','mysql','postgres','mongodb','redis','graphql','rest','api','docker','kubernetes',
    'aws','gcp','azure','linux','git','github','gitlab','ci','cd','terraform',
    'pandas','numpy','matplotlib','power bi','tableau','excel','spark','hadoop',
    'machine learning','deep learning','pytorch','tensorflow','nlp','computer vision',
    'testing','selenium','cypress','jest','playwright','qa','automation',
    'figma','ui','ux','product','scrum','agile','jira','communication'
  ]
  const found = new Set<string>()
  for (const s of skillsDict) {
    if (lower.includes(s)) found.add(s)
  }

  const roles = [
    { id: 'frontend', title: 'Frontend Developer', skills: ['javascript','typescript','react','html','css','tailwind','vite'] },
    { id: 'backend', title: 'Backend Developer', skills: ['node','express','sql','mongodb','api','docker'] },
    { id: 'fullstack', title: 'Fullstack Developer', skills: ['javascript','react','node','express','sql','docker'] },
    { id: 'data-analyst', title: 'Data Analyst', skills: ['python','pandas','sql','excel','power bi','tableau'] },
    { id: 'ai-engineer', title: 'AI/ML Engineer', skills: ['python','pytorch','tensorflow','machine learning','deep learning','nlp'] },
    { id: 'qa', title: 'QA Automation', skills: ['testing','selenium','cypress','jest','automation'] },
    { id: 'devops', title: 'DevOps Engineer', skills: ['aws','docker','kubernetes','ci','cd','linux','terraform'] },
    { id: 'product', title: 'Product Designer/Manager', skills: ['figma','ui','ux','product','scrum','agile','communication'] },
  ]

  const scores = roles.map(r => {
    const overlap = r.skills.filter(s => found.has(s)).length
    const score = overlap / r.skills.length
    return { ...r, overlap, score }
  }).sort((a,b)=> b.score - a.score)

  return { skills: Array.from(found), roleMatches: scores }
}

export function highlightKeywords(text: string, keywords: string[]) {
  const set = new Set(keywords.map(k=>k.toLowerCase()))
  return text.split(/\s+/).map(w => {
    if (set.has(w.toLowerCase().replace(/[^a-zA-Z]+/g,''))) {
      return `**${w}**`
    }
    return w
  }).join(' ')
}
