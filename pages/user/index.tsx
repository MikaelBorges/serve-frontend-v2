import { useContext, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from '../../components/input/input'
import { config } from '../../utils/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { DevTool } from '@hookform/devtools'
import {
  FormValuesType,
  OtherFieldsType,
  MessageCreateAccountType
} from './types'
import { UserContext } from '../../contexts/userContext/userContext'
import { useQuery } from '@tanstack/react-query'

export default function IndentifyPage(): JSX.Element {
  const router = useRouter()
  const [userExist, setUserExist] = useState<boolean | null>(null)
  const [apiResponseMessage, setApiResponseMessage] =
    useState<MessageCreateAccountType | null>(null)
  const userCtx = useContext(UserContext)
  //console.log('userCtx LOGIN PAGE', userCtx)
  //const { userIsLogged } = userCtx
  //const userIsLogged = false
  const userIsLogged = userCtx.user?.token
  if (userIsLogged) router.push('/')

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValuesType>({
    mode: 'onChange'
  })

  /* const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<FormValuesType>() */

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    //const onSubmit = async (data: FormValuesType) => {
    console.log('data', data)

    if (userExist === null) {
      const response = await axios.post(`${config.api_url}/user/identify`, data)
      const { emailExist } = response.data
      setUserExist(emailExist)
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
        console.log('response', response)
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
        console.log('response', response)
        if (response.status === 200) {
          setApiResponseMessage({
            text: 'Compte bien créé',
            statusIsSuccess: true
          })
        } else {
          setApiResponseMessage({
            text: "Erreur, le compte n'a pas été créé",
            statusIsSuccess: false
          })
        }
      }
    }
  }

  const otherFields: OtherFieldsType[] = [
    {
      type: 'text',
      name: 'firstname',
      title: 'Votre prénom',
      value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
      message: 'Entered value does not match firstname format'
    },
    {
      type: 'text',
      name: 'lastname',
      title: 'Votre nom',
      value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
      message: 'Entered value does not match lastname format'
    },
    {
      type: 'tel',
      name: 'phone',
      title: 'Votre numéro',
      value:
        /^(?:(?:(?:\+|00)33[ ]?(?:\(0\)[ ]?)?)|0){1}[1-9]{1}([ .-]?)(?:\d{2}\1?){3}\d{2}$/gm,
      message: 'Entered value does not match phone number format'
    }
  ]

  //console.log('errors', errors)

  const generateErrorMessage = (name: string) => {
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
            {otherFields.map(({ type, name, title, value, message }: any) => (
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
                errorMessage={generateErrorMessage(name)}
              />
            ))}
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
          type='submit'
          disabled={apiResponseMessage !== null && userExist === false}
        >
          {userExist === null && 'Envoyer'}
          {userExist && 'Se connecter'}
          {userExist === false && 'Créer mon compte'}
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
