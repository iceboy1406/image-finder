import Banner from 'components/banner/Banner'
import BannerCaption from 'components/banner/BannerCaption'
import BannerSearchInput from 'components/input/BannerSearchInput'
import ImagePreview from 'components/image/ImagePreview'
import type { NextPage } from 'next'
import { useState } from 'react'
import { getDownloadUrl } from 'utils'
import Masonry from 'react-masonry-css'
import { BiLoaderAlt } from 'react-icons/bi'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import Head from 'next/head'
import { useInfiniteQuery } from '@tanstack/react-query'
import PixabayImageApi from 'api/image'

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState('')
  const router = useRouter()
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    ['Home'],
    ({ pageParam = 1 }) => PixabayImageApi.getHomePageImages(pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>
        allPages.length < Math.ceil(lastPage.totalHits / 20)
          ? allPages.length + 1
          : undefined,
    }
  )
  return (
    <>
      <Head>
        <title>Image Finder - Home</title>
      </Head>
      <Banner>
        <BannerCaption
          title="Image Finder"
          description="Find and Download Free photo, illustration and vector from pixabay api"
        />
        <BannerSearchInput
          value={searchValue}
          onChange={(e) =>
            setSearchValue(e.target.value.trimStart().replace(/ +(?= )/g, ''))
          }
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              router.push(`/search/${searchValue.trim()}`)
            }
          }}
        />
      </Banner>
      {data && (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          className="p-4"
          dataLength={data.pages.length * 20}
          next={fetchNextPage}
          hasMore={Boolean(hasNextPage)}
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
            {data.pages
              .map((group) => group.hits)
              .reduce((pre, curr) => [...pre, ...curr])
              .map((image) => (
                <ImagePreview
                  key={image.id}
                  id={image.id}
                  src={image.webformatURL}
                  heightPerWidth={image.imageHeight / image.imageWidth}
                  blurSrc={image.previewURL}
                  originalImageUrl={getDownloadUrl(image).original}
                  userImageUrl={image.userImageURL}
                  userName={image.user}
                  alt={image.tags}
                />
              ))}
          </Masonry>
        </InfiniteScroll>
      )}
    </>
  )
}

export default Home
