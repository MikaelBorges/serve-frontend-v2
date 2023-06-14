import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import { UserContext } from '../contexts/userContext/userContext'
import logo from '../assets/images/logos/logo.png'
import defaultProfile from '../assets/images/defaultProfile/default-m-818bf2b20d4b06a052dd..svg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { CreditCard, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

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

  /* const token = localStorage.getItem('userStorage')
  console.log('token', token) */

  return (
    <header className='sticky top-0 z-30 p-3 flex justify-between items-center'>
      <Link href='/'>
        <a className='flex'>
          <Image src={logo} alt='logo' width={40} height={40} />
        </a>
      </Link>

      {/* <Sun />
      <Moon />
      <Laptop /> */}

      <div className='flex items-center'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Theme</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-fit'>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className='mr-2 h-4 w-4' />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className='mr-2 h-4 w-4' />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className='mr-2 h-4 w-4' />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        {userCtx.user !== null &&
          (userIsLogged ? (
            <Link href={`/user/${userId}`}>
              <a className='ml-2 rounded-full'>
                <Avatar>
                  <AvatarImage src={imageUser} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </a>
            </Link>
          ) : (
            <Link href='/user'>
              <a className='ml-2 inline-flex items-center justify-center bg-black text-white h-10 py-2 px-4 rounded-full text-lg'>
                s&apos;identifier
              </a>
            </Link>
          ))}
      </div>
    </header>
  )
}
