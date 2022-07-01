import React, { FC, MouseEventHandler } from 'react'
import { BsSliders } from 'react-icons/bs'
interface FilterButtonProps {
    onClick?: MouseEventHandler<HTMLButtonElement>
    anyFilter: boolean
}
const FilterButton: FC<FilterButtonProps> = ({ onClick, anyFilter }) => {
    return (
        <button
            className="bg-gray-100 hover:bg-gray-200 p-3 rounded text-gray-700 text-lg relative"
            onClick={onClick}
        >
            <BsSliders />
            {anyFilter ? (
                <div className="w-3 h-3 rounded-full bg-indigo-500 absolute -right-0.5 -top-0.5"></div>
            ) : (
                ''
            )}
        </button>
    )
}

export default FilterButton
