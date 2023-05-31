import Link from "next/link"
import { useContext } from "react"
import UserContext from "../../store/user-context"

export default function Header() {
  const userCtx = useContext(UserContext)
  const userIsLogged = userCtx.isLogged
  const userId = userCtx._id

  return (
    <header className='flex justify-between'>
      <Link href='/'>logo</Link>
      {userIsLogged !== null &&
        (userIsLogged ? (
          <Link href={`/user/${userId}`}>profil</Link>
        ) : (
          <Link href='/identify'>s'identifier</Link>
        ))}
    </header>
  )
}
