import { InputProps } from './types'

export default function Input({
  name,
  register,
  type,
  title,
  errorMessage,
  disabled
}: InputProps): JSX.Element {
  return (
    <label htmlFor={name} className='mb-4'>
      {title}
      <input
        disabled={disabled}
        className={`block ${disabled ? 'text-gray-400' : ''}`}
        id={name}
        type={type}
        name={name}
        placeholder={title}
        {...register}
      />
      {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
    </label>
  )
}
