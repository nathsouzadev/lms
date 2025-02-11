import { Path } from "@/lib/courseTypes";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface PathCardPros {
  path: Path;
}

export const PathCard = ({ path }: PathCardPros) => {
  const completedQuestions = path.answers.length;
  const progressPercentage = (completedQuestions / path.questions.length) * 100;
  const isUnlocked = path.unlocked;

  const router = useRouter();

  return (
    <Card
      key={path.id}
      className={`w-full max-w-sm mx-auto ${!isUnlocked ? "opacity-50" : ""}`}
    >
      <CardHeader>
        <CardTitle>{path.title}</CardTitle>
        <CardDescription>
          {isUnlocked
            ? `${completedQuestions} of ${path.questions.length} completed`
            : "Locked"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="w-full" />
      </CardContent>
      <CardFooter>
        {/* <Button onClick={() => startPath(path)} disabled={!isUnlocked || progress?.completed}> */}
        <Button onClick={() => router.push(`courses/${path.id}`)}>
          {path.completed
            ? "Completed"
            : completedQuestions > 0
            ? "Continue"
            : "Start"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export const Paths = () => {
  const { paths } = useAuth();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {paths.map((path) => (
        <PathCard path={path} key={path.id} />
      ))}
    </div>
  );
};
