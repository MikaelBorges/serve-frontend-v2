import { createContext, useState, useEffect } from "react"
import { useRouter } from "next/router"

const UserContext = createContext({
  userId: "",
  userIsLogged: null,
  connectUser: () => {},
  disconnectUser: () => {}
})

export const UserContextProvider = ({ children }) => {
  const router = useRouter()
  //const [userIsLogged, setUserIsLogged] = useState(null)
  const [userInfo, setUserInfo] = useState({ id: "", isLogged: false })

  useEffect(() => {
    //console.log("userInfo", Object.keys(userInfo).length)
    const token = localStorage.getItem("token")

    /* if (token) setUserIsLogged(true)
    else setUserIsLogged(false) */

    if (token) setUserInfo({ id: "62fc16903edbb27f94be99cf", isLogged: true })
    //else setUserInfo({ id: "", isLogged: false })
  }, [])

  const connectUserHandler = () => {
    setUserInfo({ id: "62fc16903edbb27f94be99cf", isLogged: true })
    //setUserIsLogged(true)
    localStorage.setItem("token", "token")
    router.push("/")
  }

  const disconnectUserHandler = () => {
    setUserInfo({ id: "", isLogged: false })
    //setUserIsLogged(false)
    localStorage.removeItem("token")
    router.push("/")
  }

  const context = {
    userId: userInfo.id,
    userIsLogged: userInfo.isLogged,
    connectUser: connectUserHandler,
    disconnectUser: disconnectUserHandler
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserContext
