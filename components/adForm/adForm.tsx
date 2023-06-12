export default function AdForm({ handleSubmit, onSubmit, children }) {
  return (
    <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
      {children}
    </form>
  )
}
