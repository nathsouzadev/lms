export type Question = {
  id: string
  text: string
}

export type Path = {
  id: string
  title: string
  questions: Question[]
}

export type UserProgress = {
  [pathId: string]: {
    completed: boolean
    answers: { [questionId: string]: boolean }
  }
}

