import React, { FC, ReactNode } from 'react'
interface FilterListItemProps {
    children: ReactNode
}
const FilterListItem:FC<FilterListItemProps> = ({children}) => {
  return (
    <div className='flex flex-col gap-4'>{children}</div>
  )
}

export default FilterListItem