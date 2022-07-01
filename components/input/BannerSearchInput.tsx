import React, { ChangeEventHandler } from 'react'
import { KeyboardEventHandler } from 'react'
import { FC } from 'react'
import { FiSearch } from 'react-icons/fi'
interface BannerSearchInputProps {
    onChange: ChangeEventHandler<HTMLInputElement>
    onKeyUp?: KeyboardEventHandler<HTMLInputElement>
    value: string
}
const BannerSearchInput: FC<BannerSearchInputProps> = ({
    onChange,
    onKeyUp,
    value,
}) => {
    return (
        <label className="px-4 py-3 bg-white w-full rounded flex gap-4 items-center cursor-text">
            <FiSearch className="text-lg text-gray-700" />
            <input
                type="search"
                className="flex-grow text-base text-gray-700 placeholder:text-gray-600 bg-transparent"
                placeholder="Search Image"
                onChange={onChange}
                onKeyUp={onKeyUp}
                value={value}
            />
        </label>
    )
}

export default BannerSearchInput
