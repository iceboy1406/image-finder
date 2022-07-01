import React, { FC, MouseEventHandler } from 'react'
interface BasicFilterProps {
    isSelected: boolean
    value: string
    onClick: MouseEventHandler<HTMLButtonElement>
}
const BasicFilter: FC<BasicFilterProps> = ({ isSelected, onClick, value }) => {
    return (
        <button
            className={`px-5 py-2 border rounded ${
                isSelected
                    ? 'bg-gray-600 hover:bg-gray-700 text-white border-transparent'
                    : 'bg-transparent text-gray-700 border-gray-400 hover:bg-gray-100'
            }`}
            onClick={onClick}
        >
            {value}
        </button>
    )
}

export default BasicFilter
