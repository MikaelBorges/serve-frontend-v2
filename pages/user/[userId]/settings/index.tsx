import { Button } from '@/components/ui/button'
import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'
import { Mail } from 'lucide-react'

export default function UserSettings(): JSX.Element {
  return (
    <>
      <Link href='/' className={buttonVariants({ variant: 'outline' })}>
        Click here
      </Link>

      <Button asChild>
        <Link href='/login'>Login</Link>
      </Button>
      <Button>Button</Button>
      <Button variant='outline'>Button</Button>
      <Button variant='secondary'>Secondary</Button>
      <Button variant='destructive'>Destructive</Button>
      <Button variant='outline'>Outline</Button>
      <Button variant='ghost'>Ghost</Button>
      <Button variant='link'>Link</Button>

      <Button>
        <Mail className='mr-2 h-4 w-4' /> Login with Email
      </Button>
    </>
  )
}
