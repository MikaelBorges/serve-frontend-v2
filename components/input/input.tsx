export default function Input({
  name,
  registerProps,
  type,
  title,
  errorMsg,
  disabled
}) {
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
        {...registerProps}
      />
      {errorMsg && <p className='text-red-500'>{errorMsg}</p>}
    </label>
  )
}
