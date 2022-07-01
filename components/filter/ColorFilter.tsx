import React, { FC, MouseEventHandler } from 'react'
import { BiCheck } from 'react-icons/bi'
interface ColorFilterProps {
    color:
        | 'red'
        | 'orange'
        | 'yellow'
        | 'green'
        | 'turquoise'
        | 'blue'
        | 'lilac'
        | 'pink'
        | 'white'
        | 'gray'
        | 'black'
        | 'brown'
    onClick: MouseEventHandler<HTMLButtonElement>
    selected: boolean
}
const ColorFilter: FC<ColorFilterProps> = ({ color, onClick, selected }) => {
    const getColorStyle = () => {
        switch (color) {
            case 'red':
                return 'bg-red-500'
            case 'orange':
                return 'bg-orange-500'
            case 'yellow':
                return 'bg-yellow-400'
            case 'green':
                return 'bg-green-500'
            case 'turquoise':
                return 'bg-[#30D5C8]'
            case 'blue':
                return 'bg-blue-500'
            case 'lilac':
                return 'bg-purple-500'
            case 'pink':
                return 'bg-pink-500'
            case 'white':
                return 'bg-white '
            case 'gray':
                return 'bg-gray-500'
            case 'black':
                return 'bg-black'
            case 'brown':
                return 'bg-amber-900'
        }
    }
    return (
        <button
            title={color}
            className={`w-10 h-10 flex justify-center items-center rounded-full ${
                color === 'white' ? 'border border-gray-200' : ''
            } ${getColorStyle()}`}
            onClick={onClick}
        >
            {selected ? (
                <BiCheck
                    className={`${
                        color === 'white' ? 'text-gray-700' : 'text-white'
                    } text-xl`}
                />
            ) : (
                ''
            )}
        </button>
    )
}

export default ColorFilter
