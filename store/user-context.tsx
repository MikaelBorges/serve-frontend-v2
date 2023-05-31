import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/router"

const UserContext = createContext({
  isLogged: null,
  connectUser: () => {},
  disconnectUser: () => {}
})

export const UserContextProvider = ({ children }) => {
  const router = useRouter()
  const [userIsLogged, setUserIsLogged] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) setUserIsLogged(true)
    else setUserIsLogged(false)
  }, [])

  const connectUserHandler = () => {
    setUserIsLogged(true)
    localStorage.setItem("token", "token")
    router.push("/")
  }

  const disconnectUserHandler = () => {
    setUserIsLogged(false)
    localStorage.removeItem("token")
    router.push("/")
  }

  const context = {
    isLogged: userIsLogged,
    connectUser: connectUserHandler,
    disconnectUser: disconnectUserHandler
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserContext
