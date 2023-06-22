export const adFields = [
  {
    type: 'text',
    name: 'title',
    title: 'Titre de votre annonce',
    value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
    message: 'Entered value does not match title format'
  },
  {
    type: 'text',
    name: 'description',
    title: 'Description de votre annonce',
    value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
    message: 'Entered value does not match description format'
  },
  {
    type: 'text',
    name: 'location',
    title: 'Ville de votre annonce',
    value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
    message: 'Entered value does not match city format'
  },
  {
    type: 'number',
    name: 'price',
    title: 'Prix de votre annonce',
    value: /^[0-9]*$/,
    message: 'Entered value does not match price format'
  }
]
