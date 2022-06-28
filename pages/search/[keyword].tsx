import axios, { AxiosError } from 'axios'
import ImagePreview from 'components/image/ImagePreview'
import type {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from 'next'
import { useEffect } from 'react'
import { LegacyRef, useRef } from 'react'
import { useState } from 'react'
import { apiBaseUrl, getDownloadUrl, ResponseData, ResponseImage } from 'utils'
import Masonry from 'react-masonry-css'
import { BiLoaderAlt } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/router'
const SearchResultPage: NextPage = ({
    data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const responseData: ResponseData = data
    const imagePreviewListRef: LegacyRef<HTMLDivElement> = useRef(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [images, setImages] = useState<ResponseImage[]>(responseData.hits)
    const [apiPage, setApiPage] = useState<number>(2)
    const [maxApiPage, setMaxApiPage] = useState<number>(responseData.totalHits)
    const [scrollY, setScrollY] = useState(0)
    const router = useRouter()
    const { keyword } = router.query
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScrollY(window.scrollY + window.innerHeight)
        })
    }, [])
    useEffect(() => {
        if (loading === false) {
            if (apiPage <= maxApiPage) {
                if (imagePreviewListRef.current) {
                    if (
                        window.scrollY + window.innerHeight >
                        imagePreviewListRef.current.offsetTop +
                            imagePreviewListRef.current.clientHeight -
                            300
                    ) {
                        updateImageData()
                    }
                }
            }
        }
    }, [loading, scrollY])
    async function updateImageData() {
        setLoading(true)
        const response = await axios.get(
            `${apiBaseUrl}&page=${apiPage}&q=${keyword}`
        )
        const data: ResponseData = response.data
        setMaxApiPage(data.totalHits / 20)
        setImages([...images, ...data.hits])
        setApiPage(apiPage + 1)
        setLoading(false)
    }
    return (
        <>
            <div ref={imagePreviewListRef} className="p-4">
                <Masonry
                    breakpointCols={{ default: 4, 1440: 3, 1024: 2, 768: 1 }}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {images.map((image) => (
                        <Link
                            href={`/detail/${image.id}`}
                            key={image.id + image.tags}
                        >
                            <div>
                                <ImagePreview
                                    src={image.webformatURL}
                                    heightPerWidth={
                                        image.imageHeight / image.imageWidth
                                    }
                                    blurSrc={image.previewURL}
                                    originalImageUrl={
                                        getDownloadUrl(image).original
                                    }
                                    userImageUrl={image.userImageURL}
                                    userName={image.user}
                                    alt={image.tags}
                                />
                            </div>
                        </Link>
                    ))}
                </Masonry>
            </div>

            {loading ? (
                <>
                    <div className="w-full p-7 flex justify-center animate-spin">
                        <BiLoaderAlt className="text-5xl text-gray-700" />
                    </div>
                </>
            ) : (
                ''
            )}
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
    let returnData: ResponseData = { hits: [], total: 0, totalHits: 0 }
    try {
        const response = await axios.get(
            `${apiBaseUrl}&q=${context.params?.keyword}`
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
        props: { data: returnData },
    }
}

export default SearchResultPage
