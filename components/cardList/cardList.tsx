import { AdListProps } from './types'
import CardAd from '../cardAd/cardAd'

export default function CardList({ ads }: AdListProps): JSX.Element {
  return (
    <>
      <ul className='flex flex-col mt-6'>
        {ads.map(
          ({
            title,
            _id,
            userId,
            imagesWork,
            imageUser,
            description,
            price,
            starsNb,
            favoritesNb,
            location,
            levelUser,
            initials
          }) => (
            <CardAd
              key={_id}
              price={price}
              levelUser={levelUser}
              starsNb={starsNb}
              location={location}
              favoritesNb={favoritesNb}
              description={description}
              title={title}
              _id={_id}
              userId={userId}
              imagesWork={imagesWork}
              imageUser={imageUser}
              initials={initials}
            />
          )
        )}
      </ul>
    </>
  )
}
