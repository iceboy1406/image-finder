import React, { FC, ReactNode } from 'react'
interface FilterListProps {
    children: ReactNode
}
const FilterList:FC<FilterListProps> = ({children}) => {
  return (
    <div className='p-4 flex flex-col gap-4 flex-grow overflow-auto'>{children}</div>
  )
}

export default FilterList