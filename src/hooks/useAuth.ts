import { AuthContext } from "@/context/AuthContext";
import { Path } from "@/lib/courseTypes";
import { User } from "@/lib/types";
import { useContext } from "react";

export const useAuth = () => {
  const { users, setUsers, paths, setPaths, score, setScore } =
    useContext(AuthContext);

  const editUser = (user: User) => {
    const updatedUsers = users.map((u) => (u.id === user.id ? user : u));
    setUsers(updatedUsers);
  };

  const createUser = (user: Omit<User, "id">) => {
    const id = (users.length + 1).toString();
    const newUser = { ...user, id };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id: string) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const getPathById = (id: string) => paths.find((path) => path.id === id);

  const finishPath = (pathId: string, newPaths: Path[]) => {
    const pathIndex = newPaths.findIndex((path) => path.id === pathId);
    const updatedPaths = [...newPaths];
    const path = updatedPaths[pathIndex];

    if (path.answers.length === path.questions.length) {
      updatedPaths[pathIndex] = { ...updatedPaths[pathIndex], completed: true };
      updatedPaths[pathIndex + 1] = {
        ...updatedPaths[pathIndex + 1],
        unlocked: true,
      };
      setScore(score + 1);
    }

    setPaths(updatedPaths);
  };

  const sendAnswer = (pathId: string, questionId: string, answer: string) => {
    const updatedPaths = paths.map((path) => {
      if (path.id === pathId) {
        const answerId = (path.answers.length + 1).toString();
        const newAnswer = { id: answerId, questionId, answer };
        const updatedAnswers = [...path.answers, newAnswer];

        return { ...path, answers: updatedAnswers };
      }
      return path;
    });

    finishPath(pathId, updatedPaths);
  };

  return {
    users,
    setUsers,
    editUser,
    createUser,
    deleteUser,
    paths,
    sendAnswer,
    getPathById,
    score,
  };
};
