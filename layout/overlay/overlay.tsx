import { OverlayProps } from './types'
import { OverlayContext } from '../../contexts/overlayContext/overlayContext'
import { useContext } from 'react'
import Link from 'next/link'

export default function Overlay({ message, link, buttons }: OverlayProps) {
  const overlayCtx = useContext(OverlayContext)

  const doAction = (action) => {
    overlayCtx.setOverlay(false)
    action()
  }

  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-center bg-black/50 z-10'>
      <div className='p-10 bg-slate-500'>
        <p>{message}</p>

        {link && (
          <Link href={link.url}>
            <a className='underline'>{link.text}</a>
          </Link>
        )}

        {buttons?.map(({ text, colorButton, action }) => (
          <button
            key={`${text}-${colorButton}`}
            onClick={() => doAction(action)}
            className={colorButton}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  )
}
