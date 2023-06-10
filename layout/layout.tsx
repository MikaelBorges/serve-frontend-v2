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
      <main className='p-2'>{children}</main>
      <Nav />
    </>
  )
}
