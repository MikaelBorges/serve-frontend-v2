import { Header } from './header'
import { Nav } from './nav'
import { Footer } from './footer'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='min-h-[calc(100vh-(168px))]'>{children}</main>
      <Footer />
      <Nav />
    </>
  )
}
