import { useRouter } from "next/router"

export default function AdPage() {
  const router = useRouter()
  console.log("router.query", router.query)

  return <h1>AdPage</h1>
}
