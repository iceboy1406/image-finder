import axios, { AxiosError } from 'axios'
import Banner from 'components/banner/Banner'
import BannerCaption from 'components/banner/BannerCaption'
import BannerSearchInput from 'components/input/BannerSearchInput'
import ImagePreview from 'components/image/ImagePreview'
import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next'
import { useEffect } from 'react'
import { useState } from 'react'
import { apiBaseUrl, getDownloadUrl, ResponseData, ResponseImage } from 'utils'
import Masonry from 'react-masonry-css'
import { BiLoaderAlt } from 'react-icons/bi'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'

const Home: NextPage = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const preloadData:ResponseData = data
    const [searchValue, setSearchValue] = useState<string>('')
    const [images, setImages] = useState<ResponseImage[]>(preloadData.hits)
    const [apiPage, setApiPage] = useState<number>(2)
    const maxApiPage = Math.ceil(preloadData.totalHits / 20)
    const router = useRouter()
    useEffect(() => {
        setSearchValue('')
    }, [])
    async function updateImageData() {
        const response = await axios.get(
            `${apiBaseUrl}&page=${apiPage}&safesearch=true`
        )
        const data: ResponseData = response.data
        setImages([...images, ...data.hits])
        setApiPage(apiPage + 1)
    }
    return (
        <>
            <Banner>
                <BannerCaption
                    title="Image Finder"
                    description="Find and Download Free photo, illustration and vector from pixabay api"
                />
                <BannerSearchInput
                    value={searchValue}
                    onChange={(e) =>
                        setSearchValue(
                            e.target.value.trimStart().replace(/ +(?= )/g, '')
                        )
                    }
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            router.push(`/search/${searchValue.trim()}`)
                        }
                    }}
                />
            </Banner>
            <InfiniteScroll
                style={{ overflow: 'hidden' }}
                className="p-4"
                dataLength={images.length}
                next={updateImageData}
                hasMore={apiPage <= maxApiPage}
                loader={
                    <div className="w-full p-7 flex justify-center animate-spin">
                        <BiLoaderAlt className="text-5xl text-gray-700" />
                    </div>
                }
            >
                <Masonry
                    breakpointCols={{ default: 4, 1440: 3, 1024: 2, 768: 1 }}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {images.map((image) => (
                        <ImagePreview
                            key={image.id}
                            id={image.id}
                            src={image.webformatURL}
                            heightPerWidth={
                                image.imageHeight / image.imageWidth
                            }
                            blurSrc={image.previewURL}
                            originalImageUrl={getDownloadUrl(image).original}
                            userImageUrl={image.userImageURL}
                            userName={image.user}
                            alt={image.tags}
                        />
                    ))}
                </Masonry>
            </InfiniteScroll>
        </>
    )
}
export const getServerSideProps: GetServerSideProps = async () => {
    let returnData: ResponseData = { hits: [], total: 0, totalHits: 0 }
    try {
        const response = await axios.get(
            `${apiBaseUrl}&safesearch=true`
        )
        returnData = response.data
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
export default Home
