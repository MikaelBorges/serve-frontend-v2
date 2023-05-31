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
  const userIdRoute = router.query.userId
  const userCtx = useContext(UserContext)
  const userId = userCtx._id

  const handleLogout = () => {
    userCtx.disconnectUser()
  }

  return (
    <>
      {userIdRoute === userId && (
        <aside>
          <h1>Bonjour utilisateur</h1>
          <ul className='flex justify-between'>
            <li className='text-orange-400'>
              <Link href={`/user/${userId}/settings`}>Modifier mon compte</Link>
            </li>
            <li>
              <button className='text-red-500' onClick={() => handleLogout()}>
                se déconnecter
              </button>
            </li>
          </ul>
        </aside>
      )}
      <h2>{ads.length ? "Annonces de l'utilisateur" : "Aucune annonce"}</h2>
      <AdList ads={ads} />
    </>
  )
}
