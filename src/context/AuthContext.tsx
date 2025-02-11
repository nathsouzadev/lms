"use client";

import { Path } from "@/lib/courseTypes";
import { mockUsers } from "@/lib/mockData";
import { User } from "@/lib/types";
import { mockPaths } from "@/lib/courseMockData";
import { createContext, useState } from "react";

interface AuthContextProps {
  users: User[];
  setUsers: (users: User[]) => void;
  paths: Path[];
  setPaths: (paths: Path[]) => void;
  score: number;
  setScore: (score: number) => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [paths, setPaths] = useState<Path[]>(mockPaths);
  const [score, setScore] = useState(0);

  return (
    <AuthContext.Provider
      value={{ users, setUsers, paths, setPaths, score, setScore }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
