import React, { FC, ReactNode } from 'react'
interface HeaderProps {
    children: ReactNode
}
const Header: FC<HeaderProps> = ({ children }) => {
    return (
        <header className="w-full sticky left-0 top-0 z-20">
            <nav className="w-full flex gap-3 items-center shadow-2xl shadow-gray-900/[.05] rounded-md p-4 bg-white">{children}</nav>
        </header>
    )
}

export default Header
