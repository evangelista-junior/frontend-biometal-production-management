import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { Login } from "../../pages/Login";

type Props = {
  children: JSX.Element
}

export const RequireAuth = ({children}: Props) => {
  const auth = useContext(AuthContext)

  if(!auth.user){
    return <Login />
  }
  return children
}