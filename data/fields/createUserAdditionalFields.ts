import { OtherFieldsType } from './types'

export const createUserAdditionalFields: OtherFieldsType[] = [
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
