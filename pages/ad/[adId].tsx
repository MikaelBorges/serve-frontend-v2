import Image from 'next/image'
import { config } from '../../utils/config'

export default function Post({ post }) {
  return (
    <>
      {post.imagesWork?.map((imageWork, index) => (
        <Image
          key={index}
          src={imageWork}
          alt={post.title}
          width={400}
          height={400}
        />
      ))}
      <h1>{post.title}</h1>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const post = await fetch(
    `${config.api_url}/retrieveUserAd/${params.adId}`
  ).then((r) => r.json())
  return {
    props: {
      post
    }
  }
}
