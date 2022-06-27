import axios from 'axios'
import Banner from 'components/banner/Banner'
import BannerCaption from 'components/banner/BannerCaption'
import BannerSearchInput from 'components/banner/BannerSearchInput'
import PreviewImage from 'components/previewImage/PreviewImage'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { LegacyRef, useRef } from 'react'
import { useState } from 'react'
import { getDownloadUrl, ResponseData, ResponseImage } from 'utils'
import Masonry from 'react-masonry-css'
import {BiLoaderAlt} from 'react-icons/bi'
const Home: NextPage = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const previewImageListRef: LegacyRef<HTMLDivElement> = useRef(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [images, setImages] = useState<ResponseImage[]>([])
    const [apiPage, setApiPage] = useState<number>(1)
    const [maxApiPage, setMaxApiPage] = useState<number>(1)
    const [scrollY, setScrollY] = useState(0)
    useEffect(() => {
        updateImageData()
        window.addEventListener('scroll', () => {
            setScrollY(window.scrollY + window.innerHeight)
        })
    }, [])
    useEffect(() => {
        if (loading === false) {
            if (apiPage <= maxApiPage) {
                if (previewImageListRef.current) {
                    if (
                        window.scrollY + window.innerHeight >
                        previewImageListRef.current.offsetTop +
                            previewImageListRef.current.clientHeight -
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
            `https://pixabay.com/api/?key=27699215-ecac0a076f968a0144f33abee&page=${apiPage}&safesearch=true`
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
                />
            </Banner>
            <div ref={previewImageListRef} className="p-4">
                <Masonry
                    breakpointCols={{ default: 4, 1440:3, 1024: 2, 768: 1 }}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {images.map((image) => (
                        <PreviewImage
                            key={image.id}
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
            </div>

            {loading ? <>
            <div className="w-full p-7 flex justify-center animate-spin">
                <BiLoaderAlt className='text-5xl text-gray-700' />
            </div>
            </> : ''}
        </>
    )
}

export default Home
