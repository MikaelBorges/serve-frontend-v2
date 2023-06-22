import { Header } from './header'
import { Nav } from './nav'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className='px-3 min-h-[calc(100vh-(2*66px))]'>{children}</main>
      <Nav />
    </>
  )
}
