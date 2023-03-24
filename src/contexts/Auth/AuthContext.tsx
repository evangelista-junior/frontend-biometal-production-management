import { createContext } from "react";
import { User } from "../../store/types/user";

export type AuthContext = {
  user: null | User;
  signin: (user: string, password: string) => Promise<boolean>;
  signout: () => void;
}

export const AuthContext = createContext<AuthContext>(null!)