import Image from 'next/image'
import React, { FC } from 'react'
interface UserPhotoProfileProps {
    src: string
    userName: string
    variant: 'light' | 'dark'
}
const UserPhotoProfile: FC<UserPhotoProfileProps> = ({src,userName,variant}) => {
    return (
        <div className="flex gap-2 items-center">
            <Image
                src={src}
                width={35}
                height={35}
                className="rounded-full"
            />
            <p className={`${variant === 'light' ? 'text-white' : 'text-gray-600'} text-base font-semibold`}>
                {userName}
            </p>
        </div>
    )
}

export default UserPhotoProfile
