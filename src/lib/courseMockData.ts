import type { Path } from "./courseTypes"

export const paths: Path[] = [
  {
    id: "path1",
    title: "Web Development Basics",
    questions: [
      { id: "q1_1", text: "Do you understand HTML basics?" },
      { id: "q1_2", text: "Can you create a simple CSS stylesheet?" },
      { id: "q1_3", text: "Are you familiar with JavaScript fundamentals?" },
    ],
  },
  {
    id: "path2",
    title: "Frontend Frameworks",
    questions: [
      { id: "q2_1", text: "Have you worked with React before?" },
      { id: "q2_2", text: "Do you understand component-based architecture?" },
      { id: "q2_3", text: "Can you manage state in a frontend application?" },
    ],
  },
  {
    id: "path3",
    title: "Backend Development",
    questions: [
      { id: "q3_1", text: "Are you familiar with server-side programming?" },
      { id: "q3_2", text: "Have you worked with databases before?" },
      { id: "q3_3", text: "Do you understand RESTful API principles?" },
    ],
  },
]

