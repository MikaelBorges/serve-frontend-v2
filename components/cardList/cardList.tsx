import { CardAd } from '../cardAd/cardAd'
import { AdsType } from '../../types'

type AdListProps = {
  listAds: AdsType[]
}

export function CardList({ listAds }: AdListProps) {
  return (
    <ul className='flex flex-col'>
      {listAds.map((ad) => (
        <CardAd key={ad._id} ad={ad} />
      ))}
    </ul>
  )
}
