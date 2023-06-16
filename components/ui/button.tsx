import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'rounded-full inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:text-white',
        outline:
          'border border-input hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-slate-200',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'underline-offset-4 hover:underline text-primary',
        warnDestructive:
          'border border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
        buttonCard: 'dark:bg-[#454D56] text-red-500 bg-slate-100',
        info: 'bg-blue-600 text-white hover:bg-blue-600/70'
      },
      size: {
        default: 'h-7 py-1 px-3',
        sm: 'h-4 p-2.5 text-xs',
        lg: 'h-10 py-2 px-4 text-lg',
        forIcon: 'h-7 px-1.5',
        forIconLg: 'h-10 px-3 text-lg'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
