import { AdFormType } from '@/components/adForm/types'
import { Input } from '../input/input'
import loader from '../../assets/images/loader/y3Hm3.gif'
import Image from 'next/image'
import { DevTool } from '@hookform/devtools'
import { useForm, SubmitHandler } from 'react-hook-form'

type AdFormProps = {
  defaultValues?: AdFormType
  isLoading: boolean
  disabled: boolean
  onSubmit: SubmitHandler<AdFormType>
}

export function AdForm({ defaultValues, isLoading, disabled, onSubmit }: AdFormProps) {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<AdFormType>({ defaultValues })

  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      <Input
        type='text'
        name='title'
        title='Titre de votre annonce'
        register={{
          ...register('title', {
            required: true,
            pattern: {
              value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
              message: 'Entered value does not match title format'
            }
          })
        }}
        errorMessage={errors.title?.message}
      />

      <Input
        type='text'
        name='description'
        title='Description de votre annonce'
        register={{
          ...register('description', {
            required: true,
            pattern: {
              value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
              message: 'Entered value does not match description format'
            }
          })
        }}
        errorMessage={errors.description?.message}
      />

      <Input
        type='text'
        name='location'
        title='Ville de votre annonce'
        register={{
          ...register('location', {
            required: true,
            pattern: {
              value: /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/gm,
              message: 'Entered value does not match city format'
            }
          })
        }}
        errorMessage={errors.location?.message}
      />

      <Input
        type='number'
        name='price'
        title='Prix de votre annonce'
        register={{
          ...register('price', {
            required: true,
            pattern: {
              value: /^[0-9]*$/,
              message: 'Entered value does not match price format'
            }
          })
        }}
        errorMessage={errors.price?.message}
      />

      <button className='flex items-center mx-auto' type='submit' disabled={isLoading || disabled}>
        {isLoading ? "En cours d'envoi" : 'Envoyer'}
        {isLoading && <Image src={loader} alt='loader' width={20} height={20} />}
      </button>
      <DevTool control={control} />
    </form>
  )
}
