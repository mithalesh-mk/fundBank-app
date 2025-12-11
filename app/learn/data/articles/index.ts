import { LessonArticle } from "./types";
import mf1 from "./mf-1";

export interface ArticlesMap {
  [key: string]: LessonArticle;
}

export const articles: ArticlesMap = {
  "mf-1": mf1
};
