"use client";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Path } from "@/lib/courseTypes";
import { useRouter, redirect } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, CheckCircle } from "lucide-react";

interface CourseProps {
  id: string;
}

export const Course = ({ id }: CourseProps) => {
  const { sendAnswer, getPathById } = useAuth();

  const path = getPathById(id) as Path;

  const [currentQuestion, setCurrentQuestion] = useState(path.answers.length);
  const [selectedAnswer, setSelectedAnswer] = useState("");

  const isLastQuestion = currentQuestion + 1 === path.questions.length;

  const router = useRouter();

  const answer = () => {
    sendAnswer(path.id, path.questions[currentQuestion].id, selectedAnswer);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer("");
  };

  if (path.completed) {
    redirect("/courses");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{path.title}</CardTitle>
          <CardDescription>
            Question {currentQuestion + 1} of {path.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{path.questions[currentQuestion].text}</p>
          <RadioGroup
            onValueChange={(value) => setSelectedAnswer(value)}
            value={selectedAnswer}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
          </RadioGroup>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch space-y-2">
          <Button
            onClick={answer}
            className="w-full"
            disabled={selectedAnswer === ""}
          >
            {isLastQuestion ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" /> Finish Course
              </>
            ) : (
              "Confirm Answer"
            )}
          </Button>
          <Button
            onClick={() => router.push("/courses")}
            variant="outline"
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
