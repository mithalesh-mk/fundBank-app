export type LessonContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "diagram"; text: string }
  | { type: "list"; items: string[] }
  | { type: "faq"; items: { q: string; a: string }[] };

export type LessonArticle = {
  id: string;
  title: string;
  timeMinutes: number;
  content: LessonContentBlock[];
};
