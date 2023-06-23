import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext/userContext'
import logo from '../assets/images/logos/logo.png'
import defaultProfile from '../assets/images/defaultProfile/default-m-818bf2b20d4b06a052dd..svg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Laptop, Sun, Moon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { buttonVariants } from '@/components/ui/button'

export function Header() {
  const userCtx = useContext(UserContext)
  //const { userId, userIsLogged, userImage } = userCtx
  //const { userId, userIsLogged } = userCtx
  //const userIsLogged = false
  //const userId = '62fc16903edbb27f94be99cf'

  const userIsLogged = userCtx.user?.token
  const userId = userCtx.user?._id
  //const fakeUserLogged = 'https://res.cloudinary.com/mika4ever/image/upload/v1661777175/my%20assets/apple/apple-governance-01.png'
  const imageUser = userCtx.user?.imageUser
  const initials = userCtx.user?.initials

  /* const token = localStorage.getItem('userStorage')
  console.log('token', token) */

  return (
    <header className='m-3 rounded-full top-3 dark:bg-slate-700 bg-slate-100 h-16 sticky z-30 p-3 flex justify-between items-center'>
      <Link href='/'>
        <a className='flex'>
          <Image src={logo} alt='logo' width={40} height={40} />
        </a>
      </Link>

      <div className='flex items-center'>
        {userCtx.user !== null &&
          (userIsLogged ? (
            <Link href={`/user/${userId}`}>
              <a className='ml-2 rounded-full'>
                <Avatar>
                  <AvatarImage src={imageUser} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </a>
            </Link>
          ) : (
            <>
              <Link href='/user/login'>
                <a className='ml-2 inline-flex items-center justify-center bg-blue-600 text-white h-10 py-2 px-4 rounded-full'>
                  connexion
                </a>
              </Link>
              {/* <Link href='/user'>
              <a className='ml-2 inline-flex items-center justify-center bg-blue-600 text-white h-10 py-2 px-4 rounded-full'>
                s&apos;identifier
              </a>
            </Link> */}
              <Link href='/user/register'>
                <a className='ml-2 inline-flex items-center justify-center bg-yellow-300 text-black h-10 py-2 px-4 rounded-full'>
                  rejoindre
                </a>
              </Link>
            </>
          ))}
      </div>
    </header>
  )
}
