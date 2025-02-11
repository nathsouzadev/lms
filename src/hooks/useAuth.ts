import { AuthContext } from "@/context/AuthContext";
import { User } from "@/lib/types";
import { useContext } from "react";

export const useAuth = () => {
  const { users, setUsers } = useContext(AuthContext);

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

  return { users, setUsers, editUser, createUser, deleteUser };
};
