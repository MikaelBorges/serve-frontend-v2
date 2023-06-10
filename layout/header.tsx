import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext/userContext'
import { ThemeContext } from '../contexts/themeContext/themeContext'
import logo from '../assets/images/logos/logo.png'
import defaultProfile from '../assets/images/defaultProfile/default-m-818bf2b20d4b06a052dd..svg'

export default function Header(): JSX.Element {
  const userCtx = useContext(UserContext)
  //const { userId, userIsLogged, userImage } = userCtx
  //const { userId, userIsLogged } = userCtx
  //const userIsLogged = false
  //const userId = '62fc16903edbb27f94be99cf'

  const userIsLogged = userCtx.user?.token
  const userId = userCtx.user?._id
  //const fakeUserLogged = 'https://res.cloudinary.com/mika4ever/image/upload/v1661777175/my%20assets/apple/apple-governance-01.png'
  const imageUser = userCtx.user?.imageUser
  console.log('imageUser', imageUser)

  //console.log('userCtx HEADER', userCtx)
  const darkMode = useContext(ThemeContext)

  return (
    <header className='flex justify-between items-center px-8 bg-gray-700'>
      <Link href='/'>
        <a className='flex'>
          <Image src={logo} alt='logo' width={30} height={30} />
        </a>
      </Link>

      {userCtx.user?.firstname && (
        <p
          style={{
            backgroundColor: darkMode ? 'black' : 'white',
            color: darkMode ? 'white' : 'black'
          }}
        >
          {userCtx.user.firstname}
        </p>
      )}

      {userIsLogged !== null &&
        (userIsLogged ? (
          <Link href={`/user/${userId}`}>
            <a className='flex'>
              <Image
                src={imageUser ? imageUser : defaultProfile}
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
