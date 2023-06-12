import Link from 'next/link'
import Image from 'next/image'
import { AdListProps } from './types'
import { UserContext } from '../../contexts/userContext/userContext'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Overlay from '../../layout/overlay/overlay'
import { OverlayContext } from '../../contexts/overlayContext/overlayContext'
import axios from 'axios'
import { config } from '../../utils/config'

export default function AdList({ ads }: AdListProps): JSX.Element {
  const overlayCtx = useContext(OverlayContext)
  const userCtx = useContext(UserContext)
  const userContextId = userCtx.user?._id
  const router = useRouter()
  const userIdRoute = router.query.userId
  const [dataForDeletion, setDataForDeletion] = useState({})

  const handleClickDeleteAd = (adId) => {
    setDataForDeletion({ userId: userContextId, adId })
    overlayCtx.setOverlay(true)
  }

  const handleDeleteAd = async () => {
    await axios.post(`${config.api_url}/deleteAd`, dataForDeletion)
  }

  return (
    <>
      <ul className='flex flex-col'>
        {ads.map(({ title, _id, userId, imagesWork, imageUser }) => (
          <li key={_id}>
            {userIdRoute === userContextId && (
              <div className='flex'>
                <button
                  className='mr-2'
                  onClick={() => handleClickDeleteAd(_id)}
                >
                  suppr
                </button>
                <Link href={`/ad/${_id}/edit`}>edit</Link>
              </div>
            )}
            <div className='flex bg-gray-300 dark:bg-gray-700 mb-2'>
              {Boolean(imagesWork.length) && (
                <Image
                  src={imagesWork[0]}
                  alt={title}
                  width={150}
                  height={150}
                />
              )}
              <div className='flex w-full'>
                <Link href={`/ad/${_id}`}>
                  <a className='h-full w-full'>{title}</a>
                </Link>
                <Link href={`/user/${userId}`}>
                  <a className='flex h-fit'>
                    <Image src={imageUser} alt='user' width={30} height={30} />
                  </a>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {overlayCtx.overlay && (
        <Overlay
          message={{
            text: 'Etes-vous sûr ?'
          }}
          buttons={[
            {
              text: 'oui',
              colorButton: 'bg-green-500',
              action: () => handleDeleteAd()
            },
            {
              text: 'non',
              colorButton: 'bg-red-500',
              action: () => overlayCtx.setOverlay(false)
            }
          ]}
        />
      )}
    </>
  )
}
