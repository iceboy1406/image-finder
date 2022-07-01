import React, { FC, forwardRef, LegacyRef } from 'react'
import { FiArrowDown } from 'react-icons/fi'
interface SimpleDownloadButtonProps {
    fileSrc: string
}
const SimpleDownloadButton = forwardRef(
    (
        { fileSrc }: SimpleDownloadButtonProps,
        ref: LegacyRef<HTMLAnchorElement>
    ) => {
        return (
            <a
                ref={ref}
                download
                href={fileSrc}
                className="p-2.5 bg-white rounded-md cursor-pointer"
            >
                <FiArrowDown />
            </a>
        )
    }
)

export default SimpleDownloadButton
