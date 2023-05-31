import AdList from "../components/adList/adList"

const filters = [
  {
    title: "Prix"
  },
  {
    title: "Lieu"
  },
  {
    title: "Super user"
  },
  {
    title: "Avec photos seulement"
  }
]

const ads = [
  {
    _id: "1",
    title: "Maçon"
  },
  {
    _id: "2",
    title: "Pompier"
  },
  {
    _id: "3",
    title: "Coiffeur"
  }
]

export default function Home() {
  return (
    <>
      {filters.length && (
        <ul className='bg-gray-400'>
          {filters.map(({ title }, index) => (
            <li key={index}>{title}</li>
          ))}
        </ul>
      )}
      <h1>Toutes les annonces</h1>
      {ads.length && <AdList ads={ads} />}
    </>
  )
}
