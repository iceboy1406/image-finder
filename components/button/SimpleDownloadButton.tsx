import React, { FC } from 'react'
import { FiArrowDown } from 'react-icons/fi'
interface SimpleDownloadButtonProps {
    fileSrc: string
}
const SimpleDownloadButton:FC<SimpleDownloadButtonProps> = ({fileSrc}) => {
    return (
        <a
            download
            href={fileSrc}
            className="p-2.5 bg-white rounded-md cursor-pointer"
        >
            <FiArrowDown />
        </a>
    )
}

export default SimpleDownloadButton
