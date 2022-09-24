import DetailDownloadButton from 'components/button/DetailDownloadButton'
import Header from 'components/header/Header'
import HeaderSearchInput from 'components/input/HeaderSearchInput'
import NavBrand from 'components/header/NavBrand'
import ImagePreviewDetail from 'components/image/ImagePreviewDetail'
import UserPhotoProfile from 'components/image/UserPhotoProfile'
import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {
  getCompressedImageExtension,
  getDownloadUrl,
  getOriginalImageExtension,
} from 'utils'
import Head from 'next/head'
import PixabayImageApi from 'api/image'
interface Props {
  image: ImageData
}
const ImageDetailPage: NextPage<Props> = ({ image }) => {
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
              setSearchValue(e.target.value.trimStart().replace(/ +(?= )/g, ''))
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
            src={image.userImageURL}
            userName={image.user}
            variant="dark"
          />
          <DetailDownloadButton
            originalWidth={image.imageWidth}
            originalHeight={image.imageHeight}
            compressedFileExtension={getCompressedImageExtension(image)}
            originalFileExtension={getOriginalImageExtension(image)}
            smallImageUrl={getDownloadUrl(image).small}
            mediumImageUrl={getDownloadUrl(image).medium}
            largeImageUrl={getDownloadUrl(image).large}
            originalImageUrl={getDownloadUrl(image).original}
          />
        </div>
        <div
          className={`w-full ${
            image.imageWidth > image.imageHeight ? '' : 'max-w-[700px]'
          }`}
        >
          <ImagePreviewDetail
            src={image.largeImageURL}
            alt={image.tags}
            width={image.imageWidth}
            height={image.imageHeight}
            blurSrc={image.previewURL}
          />
        </div>

        <div className="flex gap-4 w-full">
          <div>
            <p className="text-sm text-gray-500">Views</p>
            <p className="text-base text-gray-700">{image.views}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Downloads</p>
            <p className="text-base text-gray-700">{image.downloads}</p>
          </div>
        </div>
        <div className="flex gap-2 w-full">
          {image.tags.split(', ').map((tag) => (
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
  const id = context.params?.id as string | undefined

  if (!id) {
    return {
      notFound: true,
    }
  }

  try {
    const image = await PixabayImageApi.getImageDetail(Number(id))
    return {
      props: {
        image,
      },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}
export default ImageDetailPage
