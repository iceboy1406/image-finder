import Image from 'next/image'
import React, { FC } from 'react'
import { FiArrowDown } from 'react-icons/fi'
interface PreviewImageProps {
    src: string
    blurSrc: string
    heightPerWidth: number
    userName: string
    userImageUrl: string
    originalImageUrl: string
    alt:string
}
const PreviewImage: FC<PreviewImageProps> = ({
    src,
    blurSrc,
    heightPerWidth,
    originalImageUrl,
    userImageUrl,
    userName,
    alt
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
                <div className="flex gap-2 items-center">
                    <Image src={userImageUrl} width={35} height={35} className='rounded-full' alt={`${userName} photo profile`} />
                    <p className='text-white text-sm'>{userName}</p>
                </div>
                <a download href={originalImageUrl} className="px-3 py-3 bg-white rounded-md cursor-pointer">
                    <FiArrowDown />
                </a>
            </div>
        </li>
    )
}

export default PreviewImage
