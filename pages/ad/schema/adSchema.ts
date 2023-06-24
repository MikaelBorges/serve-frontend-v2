import * as z from 'zod'

export const formSchema = z.object({
  title: z.string().min(2, {
    message: 'Le titre doit comporter au moins 2 caractères.'
  }),
  description: z.string().min(2, {
    message: 'La description doit comporter au moins 2 caractères.'
  }),
  location: z.string().min(2, {
    message: 'La ville doit comporter au moins 2 caractères.'
  }),
  price: z.string().min(1, {
    message: 'Le prix doit comporter au moins 1 caractère.'
  })
})
