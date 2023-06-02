import { useContext } from "react"
import UserContext from "../../store/user-context"

export default function IndentifyPage() {
  const userCtx = useContext(UserContext)

  const handleLogin = () => {
    userCtx.connectUser()
  }

  return (
    <button className='text-green-500' onClick={() => handleLogin()}>
      se connecter
    </button>
  )
}
