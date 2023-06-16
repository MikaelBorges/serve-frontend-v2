import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from '../../components/input/input'
import { config } from '../../utils/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { DevTool } from '@hookform/devtools'
import { FormValuesType, MessageCreateAccountType } from './types'
import { UserContext } from '../../contexts/userContext/userContext'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import loader from '../../assets/images/loader/y3Hm3.gif'
import { createUserAdditionalFields } from '../../data/fields/createUserAdditionalFields'
import { seconds } from '../../utils/seconds'

export default function IndentifyPage(): JSX.Element {
  const router = useRouter()
  const [userExist, setUserExist] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [apiResponseMessage, setApiResponseMessage] =
    useState<MessageCreateAccountType | null>(null)

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
    if (userExist !== null) setUserExist(null)
  }

  //const onSubmit = async (data: FormValuesType) => {
  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    setApiResponseMessage(null)
    setIsLoading(true)
    //await seconds(2)

    if (userExist === null) {
      const response = await axios.post(`${config.api_url}/user/identify`, data)
      const { emailExist } = response.data
      setUserExist(emailExist)
      setIsLoading(false)
    } else {
      if (userExist) {
        /* const { data, isLoading, isError } = useQuery(
          ['loginUser'],
          () => {
            return axios.post(`${config.api_url}/user/login`, data) as any
          }
        )
        console.log('data', data)
        console.log('isLoading', isLoading)
        console.log('isError', isError) */
        const response = await axios.post(`${config.api_url}/user/login`, data)
        if (response.status !== 200) {
          setApiResponseMessage({
            text: 'Erreur de connexion',
            statusIsSuccess: false
          })
        }
        const { token } = response.data
        const { _id, firstname, imageUser } = response.data.session.user
        userCtx.setUser({ _id, firstname, token, imageUser })
      } else {
        const response = await axios.post(
          `${config.api_url}/user/register`,
          data
        )
        if (response.status === 200) {
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
      }
      setIsLoading(false)
    }
  }

  return (
    <>
      <h1 className='text-3xl'>Identifiez-vous</h1>
      <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
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
                  value: 1,
                  message: 'too small'
                }
              })
            }}
            errorMessage={errors.password?.message}
          />
        )}
        {userExist === false && (
          <>
            {createUserAdditionalFields.map(
              ({ type, name, title, value, message }: any) => (
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
              )
            )}
            {/* <Input
              type='text'
              name='firstame'
              title='Votre prénom'
              register={{
                ...register('firstname', {
                  required: true,
                  pattern: {
                    value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
                    message: 'Entered value does not match firstname format'
                  }
                })
              }}
              errorMessage={errors.firstname?.message}
            />
            <Input
              type='text'
              name='lastname'
              title='Votre nom'
              register={{
                ...register('lastname', {
                  required: true,
                  pattern: {
                    value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
                    message: 'Entered value does not match lastname format'
                  }
                })
              }}
              errorMessage={errors.lastname?.message}
            />
            <Input
              type='text'
              name='phone'
              title='Votre telephone'
              register={{
                ...register('phone', {
                  required: true,
                  pattern: {
                    value:
                      /^(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}$/gm,
                    message: 'Entered value does not match phone format'
                  }
                })
              }}
              errorMessage={errors.phone?.message}
            /> */}
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
          {isLoading && (
            <Image src={loader} alt='loader' width={20} height={20} />
          )}
        </button>
      </form>
      {apiResponseMessage && (
        <p
          className={
            apiResponseMessage.statusIsSuccess
              ? 'text-green-500'
              : 'text-red-500'
          }
        >
          {apiResponseMessage.text}
        </p>
      )}
      <DevTool control={control} />
    </>
  )
}
