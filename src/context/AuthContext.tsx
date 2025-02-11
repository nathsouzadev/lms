"use client";

import { mockUsers } from "@/lib/mockData";
import { User } from "@/lib/types";
import { createContext, useState } from "react";

interface AuthContextProps {
  users: User[];
  setUsers: (users: User[]) => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>(mockUsers);

  return (
    <AuthContext.Provider value={{ users, setUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
