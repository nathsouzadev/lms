"use client"

import { useState, useEffect } from "react"
import { paths } from "@/lib/courseMockData"
import type { UserProgress, Path, Question } from "@/lib/courseTypes"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, CheckCircle } from "lucide-react"

export default function CoursesPage() {
  const [userProgress, setUserProgress] = useState<UserProgress>({})
  const [currentPath, setCurrentPath] = useState<Path | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [userScore, setUserScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null)

  useEffect(() => {
    const savedProgress = localStorage.getItem("userProgress")
    if (savedProgress) {
      setUserProgress(JSON.parse(savedProgress))
    }

    const savedScore = localStorage.getItem("userScore")
    if (savedScore) {
      setUserScore(Number.parseInt(savedScore, 10))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("userProgress", JSON.stringify(userProgress))
  }, [userProgress])

  useEffect(() => {
    localStorage.setItem("userScore", userScore.toString())
  }, [userScore])

  const isPathUnlocked = (pathIndex: number) => {
    if (pathIndex === 0) return true
    const previousPath = paths[pathIndex - 1]
    return userProgress[previousPath.id]?.completed
  }

  const startPath = (path: Path) => {
    setCurrentPath(path)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
  }

  const handleAnswerSelection = (answer: boolean) => {
    setSelectedAnswer(answer)
  }

  const handleConfirmAnswer = () => {
    if (selectedAnswer === null || !currentPath) return

    const updatedProgress = {
      ...userProgress,
      [currentPath.id]: {
        ...userProgress[currentPath.id],
        answers: {
          ...userProgress[currentPath.id]?.answers,
          [currentPath.questions[currentQuestionIndex].id]: selectedAnswer,
        },
      },
    }

    setUserProgress(updatedProgress)

    if (currentQuestionIndex < currentPath.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedAnswer(null)
    }
  }

  const handleFinishCourse = () => {
    if (!currentPath) return

    const updatedProgress = {
      ...userProgress,
      [currentPath.id]: {
        ...userProgress[currentPath.id],
        completed: true,
      },
    }

    setUserProgress(updatedProgress)
    setUserScore((prevScore) => prevScore + 1)
    setCurrentPath(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
  }

  const handleBack = () => {
    if (currentPath) {
      const updatedProgress = {
        ...userProgress,
        [currentPath.id]: {
          ...userProgress[currentPath.id],
          answers: {
            ...userProgress[currentPath.id]?.answers,
          },
        },
      }
      setUserProgress(updatedProgress)
    }

    setCurrentPath(null)
    setCurrentQuestionIndex(0)
    setSelectedAnswer(null)
  }

  const renderQuestion = (question: Question) => {
    const isLastQuestion = currentPath && currentQuestionIndex === currentPath.questions.length - 1

    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>{currentPath?.title}</CardTitle>
          <CardDescription>
            Question {currentQuestionIndex + 1} of {currentPath?.questions.length}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{question.text}</p>
          <RadioGroup
            onValueChange={(value) => handleAnswerSelection(value === "yes")}
            value={selectedAnswer === null ? undefined : selectedAnswer ? "yes" : "no"}
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
          {isLastQuestion ? (
            <Button onClick={handleFinishCourse} className="w-full" disabled={selectedAnswer === null}>
              <CheckCircle className="mr-2 h-4 w-4" /> Finish Course
            </Button>
          ) : (
            <Button onClick={handleConfirmAnswer} className="w-full" disabled={selectedAnswer === null}>
              Confirm Answer
            </Button>
          )}
          <Button onClick={handleBack} variant="outline" className="w-full">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Courses
          </Button>
        </CardFooter>
      </Card>
    )
  }

  const renderPathCard = (path: Path, index: number) => {
    const isUnlocked = isPathUnlocked(index)
    const progress = userProgress[path.id]
    const completedQuestions = progress ? Object.values(progress.answers).filter(Boolean).length : 0
    const progressPercentage = (completedQuestions / path.questions.length) * 100

    return (
      <Card key={path.id} className={`w-full max-w-sm mx-auto ${!isUnlocked ? "opacity-50" : ""}`}>
        <CardHeader>
          <CardTitle>{path.title}</CardTitle>
          <CardDescription>
            {isUnlocked ? `${completedQuestions} of ${path.questions.length} completed` : "Locked"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={progressPercentage} className="w-full" />
        </CardContent>
        <CardFooter>
          <Button onClick={() => startPath(path)} disabled={!isUnlocked || progress?.completed}>
            {progress?.completed ? "Completed" : completedQuestions > 0 ? "Continue" : "Start"}
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Learning Paths</h1>
      <p className="mb-4">Your current score: {userScore}</p>
      {currentPath ? (
        renderQuestion(currentPath.questions[currentQuestionIndex])
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {paths.map((path, index) => renderPathCard(path, index))}
        </div>
      )}
    </div>
  )
}

