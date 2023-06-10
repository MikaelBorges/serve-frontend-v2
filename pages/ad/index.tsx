import { useContext, useEffect } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from '../../components/input/input'
import { config } from '../../utils/config'
import axios from 'axios'
import { useRouter } from 'next/router'
import { DevTool } from '@hookform/devtools'
/* import {
  FormValuesType,
  OtherFieldsType,
  MessageCreateAccountType
} from './types' */
import { UserContext } from '../../contexts/userContext/userContext'
import { useQuery } from '@tanstack/react-query'

export default function NewAdPage() {
  const router = useRouter()

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('userStorage')
    if (!token) router.push('/')
  }

  return (
    <>
      <h1 className='text-3xl'>Nouvelle annonce</h1>
    </>
  )
}
