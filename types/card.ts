export type CardType = {
  dateOfPublication: string
  description: string
  favoritesNb: number
  imagesWork: Array<string>
  imageUser: string
  location: string
  price: string
  superUser: boolean
  starsNb: number
  timeOfPublication: string
  title: string
  userId: string
  views: number
  _id: string
}

export type AdsFetched = {
  adsFetched: CardType[]
}
