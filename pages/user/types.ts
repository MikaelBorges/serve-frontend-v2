export type FormValuesType = {
  email: string
  firstname?: string
  lastname?: string
  password?: string
  phone?: string
}

export type OtherFieldsType = {
  type: string
  name: string
  title: string
  value: RegExp
  message: string
}

export type MessageCreateAccountType = {
  text: string
  statusIsSuccess: boolean
}
