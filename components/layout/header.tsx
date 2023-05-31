import Link from "next/link"
import { useContext } from "react"
import UserContext from "../../store/user-context"

export default function Header() {
  const userCtx = useContext(UserContext)
  const userIsLogged = userCtx.isLogged

  return (
    <header className='flex justify-between'>
      <Link href='/'>logo</Link>
      {userIsLogged !== null &&
        (userIsLogged ? (
          <Link className='underline' href='/user/userId'>
            profil
          </Link>
        ) : (
          <Link href='/identify'>s'identifier</Link>
        ))}
    </header>
  )
}
