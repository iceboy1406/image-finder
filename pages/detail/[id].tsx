import axios, { AxiosError } from 'axios'
import DetailDownloadButton from 'components/button/DetailDownloadButton'
import Header from 'components/header/Header'
import HeaderSearchInput from 'components/input/HeaderSearchInput'
import NavBrand from 'components/header/NavBrand'
import ImagePreviewDetail from 'components/image/ImagePreviewDetail'
import UserPhotoProfile from 'components/image/UserPhotoProfile'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {
    apiBaseUrl,
    getCompressedImageExtension,
    getDownloadUrl,
    getOriginalImageExtension,
} from 'utils'
import Head from 'next/head'
import { ImageData, ResponseData } from 'types'

const ImageDetailPage: NextPage = ({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const imageData: ImageData = data
    const router = useRouter()
    const [searchValue, setSearchValue] = useState('')
    return (
        <div className="flex flex-col items-center p-4 pt-0">
            <Head>
                <title>Image Finder - Image Detail</title>
            </Head>
            <div className="w-full max-w-[1024px] flex flex-col gap-4 items-center">
                <Header>
                    <NavBrand />
                    <HeaderSearchInput
                        value={searchValue}
                        onChange={(e) =>
                            setSearchValue(
                                e.target.value
                                    .trimStart()
                                    .replace(/ +(?= )/g, '')
                            )
                        }
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                router.push(`/search/${searchValue.trim()}`)
                            }
                        }}
                    />
                </Header>
                <div className="flex justify-between items-center w-full">
                    <UserPhotoProfile
                        src={imageData.userImageURL}
                        userName={imageData.user}
                        variant="dark"
                    />
                    <DetailDownloadButton
                        originalWidth={imageData.imageWidth}
                        originalHeight={imageData.imageHeight}
                        compressedFileExtension={getCompressedImageExtension(
                            imageData
                        )}
                        originalFileExtension={getOriginalImageExtension(
                            imageData
                        )}
                        smallImageUrl={getDownloadUrl(imageData).small}
                        mediumImageUrl={getDownloadUrl(imageData).medium}
                        largeImageUrl={getDownloadUrl(imageData).large}
                        originalImageUrl={getDownloadUrl(imageData).original}
                    />
                </div>
                <div
                    className={`w-full ${
                        imageData.imageWidth > imageData.imageHeight
                            ? ''
                            : 'max-w-[700px]'
                    }`}
                >
                    <ImagePreviewDetail
                        src={imageData.largeImageURL}
                        alt={imageData.tags}
                        width={imageData.imageWidth}
                        height={imageData.imageHeight}
                        blurSrc={imageData.previewURL}
                    />
                </div>

                <div className="flex gap-4 w-full">
                    <div>
                        <p className="text-sm text-gray-500">Views</p>
                        <p className="text-base text-gray-700">
                            {imageData.views}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Downloads</p>
                        <p className="text-base text-gray-700">
                            {imageData.downloads}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 w-full">
                    {imageData.tags.split(', ').map((tag) => (
                        <Link href={`/search/${tag}`} key={tag}>
                            <div className="text-white bg-gray-700 hover:bg-gray-800 px-4 py-1.5 rounded-full text-sm cursor-pointer">
                                {tag}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    let returnData: ResponseData = { hits: [], total: 0, totalHits: 0 }
    try {
        const response = await axios.get(
            `${apiBaseUrl}&id=${context.params?.id}`
        )
        const data: ResponseData = response.data
        returnData = data
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 400) {
                return {
                    notFound: true,
                }
            }
        }
    }
    return {
        props: { data: returnData.hits[0] },
    }
}
export default ImageDetailPage
