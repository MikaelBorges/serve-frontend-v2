import { InputProps } from './types'

export function Input({ name, register, type, title, errorMessage }: InputProps) {
  return (
    <label htmlFor={name} className='mb-4'>
      {title}
      <input className='block dark:bg-[#22272e]' id={name} type={type} name={name} placeholder={title} {...register} />
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
    </label>
  )
}
