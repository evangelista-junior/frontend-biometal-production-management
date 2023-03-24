import { AuthContext } from "./AuthContext";
import { User } from "../../store/types/user";
import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from "react";

type Props = {
  children: JSX.Element
}

export const AuthProvider = ({children}:Props) => {
  const [user, setUser] = useState(null)
  const Api = useApi()

  useEffect(() => {
    const validateToken = async () =>{
      const storageData = localStorage.getItem('authToken');

      if (storageData){
        const data = await Api.validateToken(storageData)
        if(data.user){
          setUser(data.user)
        }
      }
    }

    validateToken()
  }, [])

  const signin = async (user: string, password: string) => {
    const data = await Api.signin(user, password)
    if(data.user && data.token){
      setUser(data.user)
      setToken(data.token)
      return true
    }
    return false
  }

  const setToken = (token:string) => {
    localStorage.setItem('authToken', token);
  }

  const signout = async () => {
    await Api.signout();
    setUser(null);
    setToken("");
  }

  return(
    <AuthContext.Provider value={{user, signin, signout}}>
      {children}
    </AuthContext.Provider>
  )
}