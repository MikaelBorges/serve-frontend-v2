import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import UserContext from '../store/userContext'
import logo from '../assets/images/logos/logo.png'

const fakeUserLogged =
  'https://res.cloudinary.com/mika4ever/image/upload/v1661777175/my%20assets/apple/apple-governance-01.png'

export default function Header() {
  const userCtx = useContext(UserContext)
  const { userId, userIsLogged } = userCtx

  return (
    <header className='flex justify-between bg-gray-700'>
      <Link href='/'>
        <a className='flex'>
          <Image src={logo} alt='logo' width={30} height={30} />
        </a>
      </Link>
      {userIsLogged !== null &&
        (userIsLogged ? (
          <Link href={`/user/${userId}`}>
            <a className='flex'>
              <Image
                src={fakeUserLogged}
                alt='image utilisateur'
                width={30}
                height={30}
              />
            </a>
          </Link>
        ) : (
          <Link href='/user'>s&apos;identifier</Link>
        ))}
    </header>
  )
}
