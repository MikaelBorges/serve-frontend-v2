import * as z from 'zod'

export const formSchema = z.object({
  email: z.string().min(6, {
    message: "L'email doit comporter au moins 6 caractères."
  }),
  password: z.string().min(3, {
    message: 'Le mot de passe doit comporter au moins 3 caractères.'
  })
})
