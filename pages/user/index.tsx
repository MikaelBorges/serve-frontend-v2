import { useContext, useState } from 'react'
import UserContext from '../../store/userContext'
import { useForm } from 'react-hook-form'
import Input from '../../components/input/input'
import { config } from '../../utils/config'
import axios from 'axios'
import { useRouter } from 'next/router'

export default function IndentifyPage() {
  const router = useRouter()
  const [userExist, setUserExist] = useState(null)
  const userCtx = useContext(UserContext)
  const { userIsLogged } = userCtx
  if (userIsLogged) router.push('/')

  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    //console.log('data', data)

    if (userExist !== null) {
      console.log('userExist', userExist)
      if (userExist) {
        console.log("L'email existe, on part juste obtenir un token")
        //console.log('connect user')
        userCtx.connectUser()
      } else {
        console.log('on part direct enregistrer les données')
      }
    } else {
      console.log("vérification si l'email est dans la bdd...")

      //Vérification
      const response = await axios.post(`${config.api_url}/user/identify`, data)
      const { emailExist } = response.data

      if (emailExist) {
        console.log("L'email existe, on demande juste le password")
      } else {
        console.log("L'email n'existe pas, l'user doit créer son compte")
      }

      setUserExist(emailExist)
    }
  }

  const otherFields = [
    {
      type: 'text',
      name: 'firstname',
      title: 'Votre prénom'
    },
    {
      type: 'text',
      name: 'lastname',
      title: 'Votre nom'
    },
    {
      type: 'tel',
      name: 'phone',
      title: 'Votre numéro'
    }
  ]

  return (
    <>
      <h1 className='text-3xl'>Identifiez-vous</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Input
          disabled={userExist !== null}
          type='text'
          name='email'
          title='Votre email'
          registerProps={{
            ...register('email', {
              required: true,
              minLength: {
                value: 5,
                message: 'too small'
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: 'Entered value does not match email format'
              }
            })
          }}
          errorMsg={errors.email?.message}
        />

        {userExist !== null && (
          <h2 className='text-2xl'>
            {userExist && 'On se connaît déjà'}
            {userExist === false && 'Bienvenue, créer votre compte'}
          </h2>
        )}

        {userExist !== null && (
          <Input
            type='password'
            name='password'
            title='Votre mot de passe'
            registerProps={{
              ...register('password', {
                required: true,
                minLength: {
                  value: 5,
                  message: 'too small'
                }
              })
            }}
            errorMsg={errors.password?.message}
          />
        )}
        {userExist === false && (
          <>
            {otherFields.map(({ type, name, title }) => (
              <Input
                key={name}
                type={type}
                name={name}
                title={title}
                registerProps={{
                  ...register(name, { required: true })
                }}
                errorMsg={errors.name?.message}
              />
            ))}
          </>
        )}
        <button type='submit'>
          {userExist === null && 'Envoyer'}
          {userExist && 'Se connecter'}
          {userExist === false && 'Créer mon compte'}
        </button>
      </form>
    </>
  )
}
