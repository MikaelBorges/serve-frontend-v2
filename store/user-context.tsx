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
  const [userInfo, setUserInfo] = useState({})

  useEffect(() => {
    //console.log("userInfo", Object.keys(userInfo).length)
    const token = localStorage.getItem("token")

    /* if (token) setUserIsLogged(true)
    else setUserIsLogged(false) */

    if (token) setUserInfo({ _id: "123", isLogged: true })
    else setUserInfo({ _id: "", isLogged: false })
  }, [])

  const connectUserHandler = () => {
    setUserInfo({ _id: "123", isLogged: true })
    //setUserIsLogged(true)
    localStorage.setItem("token", "token")
    router.push("/")
  }

  const disconnectUserHandler = () => {
    setUserInfo({ _id: "", isLogged: false })
    //setUserIsLogged(false)
    localStorage.removeItem("token")
    router.push("/")
  }

  const context = {
    userId: userInfo._id,
    userIsLogged: userInfo.isLogged,
    connectUser: connectUserHandler,
    disconnectUser: disconnectUserHandler
  }

  return <UserContext.Provider value={context}>{children}</UserContext.Provider>
}

export default UserContext
