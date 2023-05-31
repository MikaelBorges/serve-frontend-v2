import { useContext } from "react"
import UserContext from "../../../store/user-context"
import { useRouter } from "next/router"
import AdList from "../../../components/adList/adList"
import Link from "next/link"

export default function UserPage({ posts }) {
  const router = useRouter()
  const userIdRoute = router.query.userId
  const userCtx = useContext(UserContext)
  const { userId } = userCtx

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
      <h2>{posts.length ? "Annonces de l'utilisateur" : "Aucune annonce"}</h2>
      <AdList ads={posts} />
    </>
  )
}

export async function getStaticProps({ params }) {
  const posts = await fetch(`http://localhost:3306/user/${params.userId}`).then(
    (r) => r.json()
  )
  return {
    props: {
      posts
    }
  }
}

export async function getStaticPaths() {
  const posts = await fetch("http://localhost:3306/getAllUsers").then((r) =>
    r.json()
  )
  return {
    paths: posts.map((post) => ({
      params: { userId: post._id.toString() }
    })),
    fallback: false
  }
}
