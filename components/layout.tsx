export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header>
        <p>This is an example header!</p>
      </header>

      <main>{children}</main>

      <footer>
        <p>This is an example footer!</p>
      </footer>
    </>
  )
}
