import { useContext } from 'react'
import { UserContext } from '../contexts/userContext/userContext'
import Link from 'next/link'

const navElements = [
  {
    text: 'Ajouter une annonce',
    route: '/ad',
    backgroundColor: 'bg-green-500'
  } /* ,
  {
    text: 'f',
    route: '/favs',
    backgroundColor: 'bg-pink-500'
  },
  {
    text: 'm',
    route: '/msg',
    backgroundColor: 'bg-blue-500'
  } */
]

export default function Nav() {
  const userCtx = useContext(UserContext)

  const userIsLogged = userCtx.user?.token
  return (
    <>
      {userIsLogged && (
        <nav className='sticky bottom-0 z-30 p-3 w-full flex justify-center'>
          {navElements.length && (
            <ul className='flex justify-center w-fit p-2'>
              {navElements.map(({ text, route, backgroundColor }) => (
                <li key={route} className='[&:not(:last-child)]:mr-2'>
                  <Link href={route}>
                    <a className='bg-blue-600 text-white hover:bg-blue-600/70 h-10 py-2 px-4 rounded-full text-lg'>
                      {text}
                    </a>
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
