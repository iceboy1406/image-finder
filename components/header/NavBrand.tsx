import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NavBrand = () => {
    return (
        <Link href={'/'}>
            <div className='h-[45px]'>
                <Image
                    src="/images/logo.webp"
                    width={45}
                    height={45}
                    alt="camera"
                    className="cursor-pointer"
                />
            </div>
        </Link>
    )
}

export default NavBrand
