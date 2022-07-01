import React, { FC, ReactNode } from 'react'
interface FilterModalCardProps {
    children: ReactNode
}
const FilterModalCard: FC<FilterModalCardProps> = ({ children }) => {
    return (
        <div className="h-full bg-white w-full sm:w-[450px] flex flex-col">
            {children}
        </div>
    )
}

export default FilterModalCard
