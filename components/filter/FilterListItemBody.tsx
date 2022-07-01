import React, { FC, ReactNode } from 'react'
interface FilterListItemBodyProps {
    children: ReactNode
}
const FilterListItemBody:FC<FilterListItemBodyProps> = ({children}) => {
  return (
    <div className='flex gap-2 flex-wrap'>{children}</div>
  )
}

export default FilterListItemBody