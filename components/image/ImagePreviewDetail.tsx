import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
interface ImagePreviewDetailProps {
    width: number
    height: number
    src: string
    blurSrc: string
    alt: string
}
const ImagePreviewDetail: FC<ImagePreviewDetailProps> = ({
    alt,
    blurSrc,
    height,
    src,
    width,
}) => {
    const [bodyWidth, setBodyWidth] = useState<number>(0)
    useEffect(() => {
        setBodyWidth(document.body.clientWidth)
        window.addEventListener('resize', () => {
            setBodyWidth(document.body.clientWidth)
        })
    }, [])
    return (
        <Image
            unoptimized={true}
            src={src}
            alt={alt}
            width={
                width > height || bodyWidth < 640
                    ? '100%'
                    : `${(width / height) * 100}%`
            }
            height={
                width > height || bodyWidth < 640
                    ? `${(height / width) * 100}%`
                    : `${(width / height) * 100}%`
            }
            layout="responsive"
            blurDataURL={blurSrc}
            placeholder={'blur'}
            loading="lazy"
            objectFit="contain"
        />
    )
}

export default ImagePreviewDetail
