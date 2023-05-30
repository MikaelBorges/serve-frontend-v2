import { useRouter } from 'next/router'

export default function AdPage() {
  const router = useRouter()
  console.log(router.query);

  return (
    <div>
      <h1>AdPage</h1>
    </div>
  )
}