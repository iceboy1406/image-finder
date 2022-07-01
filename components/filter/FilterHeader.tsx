import React, { FC, MouseEventHandler } from 'react'
import { FiX } from 'react-icons/fi'
interface FilterHeaderProps {
    onCloseButtonClick: MouseEventHandler<HTMLButtonElement>
}
const FilterHeader: FC<FilterHeaderProps> = ({ onCloseButtonClick }) => {
    return (
        <div className="flex justify-between items-center p-4 bg-white">
            <h1 className="text-xl text-gray-800">Filter</h1>
            <button
                className="bg-gray-100 p-3 rounded hover:bg-gray-200"
                onClick={onCloseButtonClick}
            >
                <FiX />
            </button>
        </div>
    )
}

export default FilterHeader
