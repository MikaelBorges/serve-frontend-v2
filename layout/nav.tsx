import { useContext } from 'react'
import { UserContext } from '../contexts/userContext/userContext'
import Link from 'next/link'
import { navElements } from '../data/nav/nav'

export function Nav() {
  const userCtx = useContext(UserContext)

  const userIsLogged = userCtx.user?.token
  return (
    <>
      {userIsLogged && (
        <nav className='h-16 sticky bottom-0 z-30 flex justify-center'>
          {navElements.length && (
            <ul className='flex justify-center w-fit p-3 items-center rounded-full'>
              {navElements.map(({ text, route, backgroundColor }) => (
                <li key={route} className='[&:not(:last-child)]:mr-2'>
                  <Link href={route}>
                    <a className='bg-blue-600 text-white h-10 py-2 px-4 rounded-full'>{text}</a>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </nav>
      )}
    </>
  )
}
