import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

type Props = {
  name: string
  focus: boolean
}

export function MotionLabel({ name, focus }: Props) {
  const [y, setY] = useState(40)
  const [x, setX] = useState(20)

  const translate = () => {
    setX(0)
    setY(0)
  }

  useEffect(() => {
    if (focus) translate()
  }, [focus])

  return (
    <motion.label htmlFor={name} className='px-1 inline-block text-sm dark:bg-[#23282e]' animate={{ x, y }}>
      {name}
    </motion.label>
  )
}
