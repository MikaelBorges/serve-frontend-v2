import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Input } from '../../components/input/input'
import { config } from '../../utils/config'
import { useRouter } from 'next/router'
import { DevTool } from '@hookform/devtools'
import { FormValuesType, MessageCreateAccountType } from './types'
import { UserContext } from '../../contexts/userContext/userContext'
import Image from 'next/image'
import loader from '../../assets/images/loader/y3Hm3.gif'
import { createUserAdditionalFields } from '../../data/fields/createUserAdditionalFields'

export default function IndentifyPage() {
  const [userExist, setUserExist] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiResponseMessage, setApiResponseMessage] = useState<MessageCreateAccountType | null>(null)

  const router = useRouter()
  const userCtx = useContext(UserContext)
  const userIsLogged = userCtx.user?.token

  if (userIsLogged) router.push('/')

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValuesType>()

  /* const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValuesType>() */

  //console.log('errors', errors)

  const generateErrorMessageValue = (name: string) => {
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

  const handleChangeEmail = () => {
    if (userExist !== null) {
      setUserExist(null)
      setApiResponseMessage(null)
    }
  }

  //const onSubmit = async (data: FormValuesType) => {
  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    setApiResponseMessage(null)
    setIsLoading(true)

    if (userExist === null) {
      fetch(`${config.api_url}/user/identify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
        .then((response) => {
          if (response.ok) {
            return response.json()
          } else {
            setApiResponseMessage({
              text: "Erreur dans l'identification",
              statusIsSuccess: false
            })
          }
        })
        .then((json) => setUserExist(json.emailExist))
        .catch((error) => console.log(`Erreur : ${error}`))
        .finally(() => setIsLoading(false))
    } else {
      if (userExist) {
        fetch(`${config.api_url}/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then((response) => {
            if (response.ok) return response.json()
            else {
              setApiResponseMessage({
                text: 'Mot de passe incorrect',
                statusIsSuccess: false
              })
            }
          })
          .then((json) => {
            if (json) {
              const { token } = json
              const { _id, firstname, imageUser, initials } = json.session.user
              userCtx.setUser({ _id, firstname, token, imageUser, initials })
            }
          })
          .catch((error) => console.log(`Erreur : ${error}`))
          .finally(() => setIsLoading(false))
      } else {
        fetch(`${config.api_url}/user/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        })
          .then((response) => {
            //console.log('response', response)
            if (response.ok) {
              setApiResponseMessage({
                text: 'Votre compte a bien été créé',
                statusIsSuccess: true
              })
            } else {
              setApiResponseMessage({
                text: "Erreur, votre compte n'a pas été créé",
                statusIsSuccess: false
              })
            }
          })
          .catch((error) => console.log(`Erreur : ${error}`))
          .finally(() => setIsLoading(false))
      }
    }
  }

  return (
    <>
      <h1 className='text-3xl'>Identifiez-vous</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='email'
          name='email'
          title='Votre email'
          register={{
            ...register('email', {
              onChange: () => handleChangeEmail(),
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
            {userExist && 'On se connaît déjà, entrez votre mot de passe'}
            {userExist === false && 'On ne se connaît pas encore, créez votre compte'}
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
                  value: 3,
                  message: 'too small'
                }
              })
            }}
            errorMessage={errors.password?.message}
          />
        )}
        {userExist === false && (
          <>
            {createUserAdditionalFields.map(({ type, name, title, value, message }: any) => (
              <Input
                key={name}
                type={type}
                name={name}
                title={title}
                register={{
                  ...register(name, {
                    required: true,
                    pattern: {
                      value,
                      message
                    }
                  })
                }}
                errorMessage={generateErrorMessageValue(name)}
              />
            ))}
          </>
        )}
        <button
          className='flex items-center mx-auto'
          type='submit'
          disabled={isLoading || apiResponseMessage?.statusIsSuccess}
        >
          {isLoading && "En cours d'envoi"}
          {!isLoading && userExist === null && 'Envoyer'}
          {!isLoading && userExist && 'Se connecter'}
          {!isLoading && userExist === false && 'Créer mon compte'}
          {isLoading && <Image src={loader} alt='loader' width={20} height={20} />}
        </button>
      </form>
      {apiResponseMessage && (
        <p className={apiResponseMessage.statusIsSuccess ? 'text-green-500' : 'text-red-500'}>
          {apiResponseMessage.text}
        </p>
      )}
      <DevTool control={control} />
    </>
  )
}
