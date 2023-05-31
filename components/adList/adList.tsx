import Link from "next/link"

export default function AdList({ ads }) {
  return (
    <ul className='flex flex-col'>
      {ads.map(({ title, _id }) => (
        <Link key={_id} href={`/ad/${_id}`}>
          {title}
        </Link>
      ))}
    </ul>
  )
}
