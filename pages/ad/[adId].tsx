import Image from "next/image"

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

export async function getStaticProps({ params }) {
  const post = await fetch(
    `http://localhost:3306/retrieveUserAd/${params.adId}`
  ).then((r) => r.json())
  return {
    props: {
      post
    }
  }
}

export async function getStaticPaths() {
  const posts = await fetch("http://localhost:3306").then((r) => r.json())
  return {
    paths: posts.map((post) => ({
      params: { adId: post._id.toString() }
    })),
    fallback: false
  }
}
