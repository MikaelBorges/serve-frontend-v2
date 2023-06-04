import Link from 'next/link'
import Image from 'next/image'

export default function AdList({ ads }) {
  return (
    <ul className='flex flex-col'>
      {ads.map(({ title, _id, userId, imagesWork, imageUser }) => (
        <li key={_id} className='flex bg-gray-700 mb-2'>
          <Image src={imagesWork[0]} alt={title} width={150} height={150} />
          <div className='flex w-full'>
            <Link href={`/ad/${_id}`}>
              <a className='h-full w-full'>{title}</a>
            </Link>
            <Link href={`/user/${userId}`}>
              <a className='flex h-fit'>
                <Image src={imageUser} alt='user' width={30} height={30} />
              </a>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}
