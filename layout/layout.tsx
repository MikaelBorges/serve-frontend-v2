import Header from './header'
import Nav from './nav'

export default function Layout({
  children
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <>
      <Header />
      <main className='px-3 min-h-[calc(100vh-(2*66px))]'>{children}</main>
      <Nav />
    </>
  )
}
