import * as z from 'zod'

export const formSchema = z.object({
  email: z.string().min(6, {
    message: "L'email doit comporter au moins 6 caractères."
  }),
  password: z.string().min(3, {
    message: 'Le mot de passe doit comporter au moins 3 caractères.'
  }),
  firstname: z.string().min(2, {
    message: 'Le prénom doit comporter au moins 2 caractères.'
  }),
  lastname: z.string().min(2, {
    message: 'Le nom doit comporter au moins 2 caractères.'
  }),
  phone: z.string().min(10, {
    message: 'Le numéro de téléphone doit comporter au moins 10 caractères.'
  })
})
