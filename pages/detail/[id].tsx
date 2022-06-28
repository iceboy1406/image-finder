import axios, { AxiosError } from 'axios'
import DetailDownloadButton from 'components/button/DetailDownloadButton'
import ImagePreviewDetail from 'components/image/ImagePreviewDetail'
import UserPhotoProfile from 'components/image/UserPhotoProfile'
import { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import {
    apiBaseUrl,
    getCompressedImageExtension,
    getDownloadUrl,
    getOriginalImageExtension,
    ResponseData,
    ResponseImage,
} from 'utils'

const ImageDetailPage: NextPage = ({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const imageData: ResponseImage = data
    const router = useRouter()
    return (
        <div className="flex flex-col items-center p-4">
            <div className="w-full max-w-[1024px] flex flex-col gap-4 items-center">
                <div className="flex gap-2 items-center w-full">
                    <BsArrowLeft
                        className="text-xl text-gray-700 cursor-pointer"
                        onClick={() => router.back()}
                        title="Back"
                    />
                    <p className="text-xl text-gray-700">Image Detail</p>
                </div>
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
