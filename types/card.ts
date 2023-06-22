export type AdsType = {
  dateOfPublication: string
  description: string
  favoritesNb: number
  imagesWork: string[]
  imageUser: string
  location: string
  price: string
  levelUser: string
  starsNb: number
  timeOfPublication: string
  title: string
  userId: string
  views: number
  _id: string
  initials: string
}

export type AdsFetched = {
  adsFetched: AdsType[]
}
