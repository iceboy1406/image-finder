import SimpleDownloadButton from 'components/button/SimpleDownloadButton'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { FC, LegacyRef, useRef } from 'react'
import UserPhotoProfile from './UserPhotoProfile'
interface ImagePreviewProps {
    src: string
    blurSrc: string
    heightPerWidth: number
    userName: string
    userImageUrl: string
    originalImageUrl: string
    alt: string
    id: number
}
const ImagePreview: FC<ImagePreviewProps> = ({
    src,
    blurSrc,
    heightPerWidth,
    originalImageUrl,
    userImageUrl,
    userName,
    alt,
    id,
}) => {
    const router = useRouter()
    const downloadButtonRef: LegacyRef<HTMLAnchorElement> = useRef(null)
    return (
        <li
            className="w-full h-fit relative inline-block group cursor-zoom-in mb-4"
            onClick={(e) => {
                const target = e.target as Node
                if (
                    target !== downloadButtonRef.current &&
                    !downloadButtonRef.current?.contains(target)
                ) {
                    router.push(`/detail/${id}`)
                }
            }}
        >
            <Image
                unoptimized={true}
                src={src}
                width="100%"
                height={`${heightPerWidth * 100}%`}
                layout="responsive"
                objectFit="contain"
                blurDataURL={blurSrc}
                placeholder="blur"
                alt={alt}
                quality={100}
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end p-6">
                <UserPhotoProfile
                    src={userImageUrl}
                    userName={userName}
                    variant={'light'}
                />
                <SimpleDownloadButton
                    ref={downloadButtonRef}
                    fileSrc={originalImageUrl}
                />
            </div>
        </li>
    )
}

export default ImagePreview
