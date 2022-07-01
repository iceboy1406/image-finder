import React, { FC } from 'react'
interface FilterListItemHeaderProps {
    title: string
    icon: JSX.Element
}
const FilterListItemHeader: FC<FilterListItemHeaderProps> = ({ icon, title }) => {
    return (
        <div className="flex gap-2 items-center">
            <div className="text-2xl text-gray-600">
                {icon}
            </div>
            <h2 className="text-lg text-gray-700">{title}</h2>
        </div>
    )
}

export default FilterListItemHeader
