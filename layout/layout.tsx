import Header from './header'
import Footer from './footer'
import { useContext } from 'react'
import UserContext from '../store/userContext'

export default function Layout({ children }: { children: React.ReactNode }) {
  const userCtx = useContext(UserContext)
  const { userIsLogged } = userCtx

  return (
    <>
      <Header />
      <main className='p-2'>{children}</main>
      {/* {userIsLogged && <Footer />} */}
    </>
  )
}
