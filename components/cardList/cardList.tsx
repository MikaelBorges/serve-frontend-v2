import { CardAd } from '../cardAd/cardAd'
import { AdsType } from '../../types'

type AdListProps = {
  listAds: AdsType[]
}

export function CardList({ listAds }: AdListProps) {
  return (
    <ul className='flex flex-col mt-6'>
      {listAds.map((ads) => (
        <CardAd key={ads._id} ads={ads} />
      ))}
    </ul>
  )
}
