import SimpleDownloadButton from 'components/button/SimpleDownloadButton'
import Image from 'next/image'
import React, { FC } from 'react'
import { FiArrowDown } from 'react-icons/fi'
import UserPhotoProfile from './UserPhotoProfile'
interface ImagePreviewProps {
    src: string
    blurSrc: string
    heightPerWidth: number
    userName: string
    userImageUrl: string
    originalImageUrl: string
    alt: string
}
const ImagePreview: FC<ImagePreviewProps> = ({
    src,
    blurSrc,
    heightPerWidth,
    originalImageUrl,
    userImageUrl,
    userName,
    alt,
}) => {
    return (
        <li className="w-full h-fit relative inline-block group cursor-zoom-in mb-4">
            <Image
                src={src}
                width="100%"
                height={`${heightPerWidth * 100}%`}
                layout="responsive"
                objectFit="contain"
                blurDataURL={blurSrc}
                placeholder="blur"
                alt={alt}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end p-6">
                <UserPhotoProfile
                    src={userImageUrl}
                    userName={userName}
                    variant={'light'}
                />
                <SimpleDownloadButton fileSrc={originalImageUrl} />
            </div>
        </li>
    )
}

export default ImagePreview
