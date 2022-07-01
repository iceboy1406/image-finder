import React, { FC, MouseEventHandler, ReactNode } from 'react'
interface FilterModalContainerProps {
    children: ReactNode
    onClick: MouseEventHandler<HTMLDivElement>
}
const FilterModalContainer: FC<FilterModalContainerProps> = ({
    children,
    onClick,
}) => {
    return (
        <div
            className="fixed w-screen h-screen bg-gray-900/[.45] z-50 flex justify-end"
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default FilterModalContainer
