import { useContext } from "react"
import UserContext from "../../../store/user-context"
import { useRouter } from "next/router"
import AdList from "../../../components/adList/adList"
import Link from "next/link"

const ads = [
  {
    _id: "1",
    title: "Plombier"
  },
  {
    _id: "2",
    title: "Chauffeur"
  },
  {
    _id: "3",
    title: "Professeur"
  }
]

export default function UserPage() {
  const router = useRouter()
  console.log("router.query", router.query)
  const userCtx = useContext(UserContext)
  const userIsLogged = userCtx.isLogged

  const handleLogout = () => {
    userCtx.disconnectUser()
  }

  return (
    <>
      {router.query.userId === "userId" && (
        <aside>
          <h1>Bonjour utilisateur</h1>
          <ul className='flex justify-between'>
            <li className='dark:text-yellow-100'>
              <Link href='/user/userId/settings'>Modifier mon compte</Link>
            </li>
            <li>
              <button className='text-red-500' onClick={() => handleLogout()}>
                se déconnecter
              </button>
            </li>
          </ul>
        </aside>
      )}
      <h2>Annonces de l'utilisateur</h2>
      <AdList ads={ads} />
    </>
  )
}
