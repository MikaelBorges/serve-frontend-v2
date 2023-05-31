import Header from "./header"
import Footer from "./footer"
import { useContext } from "react"
import UserContext from "../../store/user-context"

export default function Layout({ children }: { children: React.ReactNode }) {
  const userCtx = useContext(UserContext)
  const userIsLogged = userCtx.isLogged

  return (
    <>
      <Header />
      <main>{children}</main>
      {userIsLogged && <Footer />}
    </>
  )
}
