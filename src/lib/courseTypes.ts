export type Question = {
  id: string;
  text: string;
};

type Answer = {
  id: string;
  questionId: string;
  answer: string;
};

export type Path = {
  id: string;
  title: string;
  questions: Question[];
  answers: Answer[];
  unlocked: boolean;
  completed: boolean;
};
