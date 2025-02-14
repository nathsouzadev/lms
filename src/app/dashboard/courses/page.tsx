"use client";

import { useState, useEffect } from "react";
import type { Path, Question } from "@/lib/courseTypes";
import { mockPaths } from "@/lib/courseMockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlusCircle, Trash2 } from "lucide-react";

export default function CourseEditPage() {
  const [courses, setCourses] = useState<Path[]>([]);

  useEffect(() => {
    setCourses(mockPaths);
  }, []);

  const addCourse = () => {
    const newCourse: Path = {
      id: (courses.length + 1).toString(),
      title: "New Course",
      questions: [],
      answers: [],
      unlocked: false,
      completed: false,
    };
    setCourses([...courses, newCourse]);
  };

  const updateCourseTitle = (courseId: string, newTitle: string) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId ? { ...course, title: newTitle } : course
      )
    );
  };

  const addQuestion = (courseId: string) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              questions: [
                ...course.questions,
                {
                  id: (course.questions.length + 1).toString(),
                  text: "New Question",
                },
              ],
            }
          : course
      )
    );
  };

  const updateQuestion = (
    courseId: string,
    questionId: string,
    newText: string
  ) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              questions: course.questions.map((q) =>
                q.id === questionId ? { ...q, text: newText } : q
              ),
            }
          : course
      )
    );
  };

  const deleteQuestion = (courseId: string, questionId: string) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? {
              ...course,
              questions: course.questions.filter((q) => q.id !== questionId),
            }
          : course
      )
    );
  };

  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Edit Courses</h1>
      <Button onClick={addCourse} className="mb-4">
        <PlusCircle className="mr-2 h-4 w-4" /> Add New Course
      </Button>
      <Accordion type="single" collapsible className="w-full">
        {courses.map((course) => (
          <AccordionItem key={course.id} value={course.id}>
            <AccordionTrigger>
              <Input
                value={course.title}
                onChange={(e) => updateCourseTitle(course.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="mr-2"
              />
            </AccordionTrigger>
            <AccordionContent>
              <Card>
                <CardHeader>
                  <CardTitle>Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  {course.questions.map((question: Question) => (
                    <div key={question.id} className="flex items-center mb-2">
                      <Input
                        value={question.text}
                        onChange={(e) =>
                          updateQuestion(course.id, question.id, e.target.value)
                        }
                        className="mr-2"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteQuestion(course.id, question.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button onClick={() => addQuestion(course.id)}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add Question
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => deleteCourse(course.id)}
                  >
                    Delete Course
                  </Button>
                </CardFooter>
              </Card>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
