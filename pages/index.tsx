import axios from 'axios'
import Banner from 'components/banner/Banner'
import BannerCaption from 'components/banner/BannerCaption'
import BannerSearchInput from 'components/banner/BannerSearchInput'
import ImagePreview from 'components/image/ImagePreview'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { LegacyRef, useRef } from 'react'
import { useState } from 'react'
import { apiBaseUrl, getDownloadUrl, ResponseData, ResponseImage } from 'utils'
import Masonry from 'react-masonry-css'
import { BiLoaderAlt } from 'react-icons/bi'
import Link from 'next/link'
import { useRouter } from 'next/router'
const Home: NextPage = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const imagePreviewListRef: LegacyRef<HTMLDivElement> = useRef(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [images, setImages] = useState<ResponseImage[]>([])
    const [apiPage, setApiPage] = useState<number>(1)
    const [maxApiPage, setMaxApiPage] = useState<number>(1)
    const [scrollY, setScrollY] = useState(0)
    const router = useRouter()
    useEffect(() => {
        setSearchValue('')
        updateImageData()
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
                        console.log(`update image..., loading: ${loading}`)
                    }
                }
            }
        }
    }, [loading, scrollY])
    async function updateImageData() {
        setLoading(true)
        const response = await axios.get(
            `${apiBaseUrl}&page=${apiPage}&safesearch=true`
        )
        const data: ResponseData = response.data
        setMaxApiPage(data.totalHits)
        setImages([...images, ...data.hits])
        setApiPage(apiPage + 1)
        setLoading(false)
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
                        if(e.key === 'Enter') {
                            router.push(`/search/${searchValue}`)
                        }
                    }}
                />
            </Banner>
            <div ref={imagePreviewListRef} className="p-4">
                <Masonry
                    breakpointCols={{ default: 4, 1440: 3, 1024: 2, 768: 1 }}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {images.map((image) => (
                        <Link href={`/detail/${image.id}`} key={image.id}>
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

export default Home
