import { useContext, useState } from 'react'
//import UserContext from '../../store/userContext'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from '../../components/input/input'
import { config } from '../../utils/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { DevTool } from '@hookform/devtools'
import { FormValues } from './types'

type OtherFields = {
  type: string
  name: string
  title: string
}

export default function IndentifyPage(): JSX.Element {
  const router = useRouter()
  const [userExist, setUserExist] = useState<boolean | null>(null)
  //const userCtx = useContext(UserContext)
  //const { userIsLogged } = userCtx
  const userIsLogged = false
  if (userIsLogged) router.push('/')

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValues>({
    mode: 'onChange'
  })

  /* const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValues>() */

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    //const onSubmit = async (data: FormValues) => {
    console.log('data', data)

    if (userExist === null) {
      console.log("vérification si l'email est dans la bdd...")

      //Vérification
      const response = await axios.post(`${config.api_url}/user/identify`, data)
      const { emailExist } = response.data
      setUserExist(emailExist)
    } else {
      console.log('userExist', userExist)
      if (userExist) {
        /* const response = await axios.post(`${config.api_url}/user/login`, data)
        const { token } = response.data
        const { _id, firstname, imageUser } = response.data.session.user */
        //userCtx.connectUser(_id, firstname, token, imageUser)
        console.log("on part obtenir un token pour l'user")
      } else {
        console.log('on part direct enregistrer les données')

        /* const response = await axios.post(
          `${config.api_url}/user/register`,
          data
        )
        console.log('response', response) */
      }
    }
  }

  const otherFields: OtherFields[] = [
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

  //console.log('errors', errors)

  const getErrorMessage = (name: string) => {
    switch (name) {
      case 'firstname':
        return errors.firstname?.message
      case 'lastname':
        return errors.lastname?.message
      case 'phone':
        return errors.phone?.message
      default:
        return undefined
    }
  }
  return (
    <>
      <h1 className='text-3xl'>Identifiez-vous</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Input
          disabled={userExist !== null}
          type='text'
          name='email'
          title='Votre email'
          register={{
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
          errorMessage={errors.email?.message}
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
            register={{
              ...register('password', {
                required: true,
                minLength: {
                  value: 5,
                  message: 'too small'
                }
              })
            }}
            errorMessage={errors.password?.message}
          />
        )}
        {userExist === false && (
          <>
            {otherFields.map(({ type, name, title }: any) => (
              <Input
                key={name}
                type={type}
                name={name}
                title={title}
                register={{
                  ...register(name, { required: true })
                }}
                errorMessage={getErrorMessage(name)}
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
      <div>
        <DevTool control={control} />
      </div>
    </>
  )
}
