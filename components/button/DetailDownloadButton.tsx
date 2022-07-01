import React, { FC, LegacyRef, useEffect, useRef, useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { getResolutions } from 'utils'
interface DetailDownloadButtonProps {
    originalWidth: number
    originalHeight: number
    smallImageUrl: string
    mediumImageUrl: string
    largeImageUrl: string
    originalImageUrl: string
    compressedFileExtension: string
    originalFileExtension: string
}
const DetailDownloadButton: FC<DetailDownloadButtonProps> = ({
    compressedFileExtension,
    largeImageUrl,
    mediumImageUrl,
    originalFileExtension,
    originalHeight,
    originalImageUrl,
    originalWidth,
    smallImageUrl,
}) => {
    const resolutions = getResolutions(originalWidth, originalHeight)
    const [cardVisibility, setCardVisibility] = useState<boolean>(false)
    const buttonToggleRef: LegacyRef<HTMLButtonElement> = useRef(null)
    useEffect(() => {
        window.addEventListener('click', (e) => {
            const target = e.target as Node
            if (buttonToggleRef.current) {
                if (
                    target !== buttonToggleRef.current &&
                    !buttonToggleRef.current.contains(target)
                ) {
                    setCardVisibility(false)
                }
            }
        })
    }, [])
    return (
        <div className="flex group h-9 relative bg-white shadow-2xl">
            <a
                title="Download Image"
                download
                href={originalImageUrl}
                className="border border-r-0 border-gray-400 hover:border-gray-600 px-3 rounded-l text-sm text-gray-500 hover:text-gray-700 transition-all duration-300 flex items-center"
            >
                Download
            </a>
            <div className="h-full w-[1px] bg-gray-400 group-hover:bg-gray-600"></div>
            <button
                className="border border-l-0 border-gray-400 hover:border-gray-600 px-2 rounded-r text-xl text-gray-500 hover:text-gray-700 transition-all duration-300 flex items-center"
                title="Choose Resolution"
                onClick={() => {
                    setCardVisibility(!cardVisibility)
                }}
                ref={buttonToggleRef}
            >
                <FiChevronDown />
            </button>
            {cardVisibility ? (
                <div
                    className={`bg-gray-900 absolute right-0 -bottom-[164px] w-max rounded-md overflow-hidden py-2 select-none z-30`}
                    id="resolution-card"
                >
                    <a
                        download
                        href={smallImageUrl}
                        className="py-2 px-3 text-sm text-white hover:bg-gray-700 grid grid-cols-3 text-right"
                    >
                        <span className="text-left">Small</span>{' '}
                        <span>({resolutions.small})</span>
                        <span>{compressedFileExtension.toUpperCase()}</span>
                    </a>
                    <a
                        download
                        href={mediumImageUrl}
                        className="py-2 px-3 text-sm text-white hover:bg-gray-700 grid grid-cols-3 text-right"
                    >
                        <span className="text-left">Medium</span>{' '}
                        <span>({resolutions.medium})</span>
                        <span>{compressedFileExtension.toUpperCase()}</span>
                    </a>
                    <a
                        download
                        href={largeImageUrl}
                        className="py-2 px-3 text-sm text-white hover:bg-gray-700 grid grid-cols-3 text-right"
                    >
                        <span className="text-left">Large</span>{' '}
                        <span>({resolutions.large})</span>
                        <span>{compressedFileExtension.toUpperCase()}</span>
                    </a>
                    <a
                        download
                        href={originalImageUrl}
                        className="py-2 px-3 text-sm text-white hover:bg-gray-700 grid grid-cols-3 text-right"
                    >
                        <span className="text-left">Original</span>{' '}
                        <span>({resolutions.original})</span>
                        <span>{originalFileExtension.toUpperCase()}</span>
                    </a>
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default DetailDownloadButton
