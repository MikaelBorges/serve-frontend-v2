import { useContext } from "react"
import UserContext from "../../../../store/user-context"
import { useRouter } from "next/router"

export default function UserSettings() {
  const router = useRouter()
  const userIdRoute = router.query.userId
  const userCtx = useContext(UserContext)
  const { userId } = userCtx

  if (userIdRoute !== userId) router.push("/")

  return <h1>UserSettings</h1>
}
