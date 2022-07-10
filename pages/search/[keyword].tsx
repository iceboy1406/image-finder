import ImagePreview from 'components/image/ImagePreview'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { getDownloadUrl } from 'utils'
import Masonry from 'react-masonry-css'
import { useRouter } from 'next/router'
import NavBrand from 'components/header/NavBrand'
import Header from 'components/header/Header'
import HeaderSearchInput from 'components/input/HeaderSearchInput'
import Image from 'next/image'
import FilterButton from 'components/button/FilterButton'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BiSort, BiLoaderAlt, BiCategory } from 'react-icons/bi'
import { AiOutlineReload, AiOutlineBgColors } from 'react-icons/ai'
import { IoMdImages } from 'react-icons/io'
import { BsAspectRatio } from 'react-icons/bs'
import FilterListItem from 'components/filter/FilterListItem'
import FilterListItemHeader from 'components/filter/FilterListItemHeader'
import FilterListItemBody from 'components/filter/FilterListItemBody'
import BasicFilter from 'components/filter/BasicFilter'
import FilterList from 'components/filter/FilterList'
import FilterHeader from 'components/filter/FilterHeader'
import FilterModalCard from 'components/filter/FilterModalCard'
import FilterModalContainer from 'components/filter/FilterModalContainer'
import ColorFilter from 'components/filter/ColorFilter'
import Head from 'next/head'
import { Filters } from 'types'
import { RootState, useAppDispatch } from 'store'
import { useSelector } from 'react-redux'
import { fetchImages, resetImageData } from 'store/slices/images'
const SearchResultPage: NextPage = () => {
    const router = useRouter()
    const { keyword } = router.query
    const [searchValue, setSearchValue] = useState<string>(`${keyword}`)
    const [filterModalVisibility, setFilterModalVisibility] = useState(false)
    const { images, maxPage, page, loading } = useSelector(
        (state: RootState) => state.images
    )
    const dispatch = useAppDispatch()
    const defaultFilters: Filters = {
        sortBy: 'popular',
        orientation: '',
        imageType: 'all',
        category: '',
        minimumWidth: '0',
        minimumHeight: '0',
        colors: '',
    }

    const [filters, setFilters] = useState<Filters>(defaultFilters)
    const [minimumWidth, setMinimumWidth] = useState<string>('0')
    const [minimumHeight, setMinimumHeight] = useState<string>('0')
    useEffect(() => {
        if (keyword) {
            dispatch(resetImageData())
            dispatch(fetchImages({ keyword: `${keyword}`, filters: filters }))
        }
    }, [filters])
    const showFilterModal = () => {
        setFilterModalVisibility(true)
        if (document.body) {
            document.body.classList.add('h-screen', 'overflow-hidden')
        }
    }
    const hideFilterModal = () => {
        setFilterModalVisibility(false)
        if (document.body) {
            document.body.classList.remove('overflow-hidden', 'h-screen')
        }
    }
    return (
        <div className="flex flex-col h-fit min-h-screen w-full">
            <Head>
                <title>Image Finder - Search Results for {keyword}</title>
            </Head>
            <Header>
                <NavBrand />
                <HeaderSearchInput
                    value={searchValue}
                    onChange={(e) =>
                        setSearchValue(
                            e.target.value.trimStart().replace(/ +(?= )/g, '')
                        )
                    }
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            router.replace(`/search/${searchValue.trim()}`)
                        }
                    }}
                />
                <FilterButton
                    anyFilter={
                        JSON.stringify(filters) !==
                        JSON.stringify(defaultFilters)
                    }
                    onClick={() => showFilterModal()}
                />
            </Header>
            {images.length === 0 && !loading ? (
                <>
                    <div className="flex items-center justify-center flex-grow">
                        <div className="flex flex-col gap-4 items-center">
                            <div className="w-full max-w-[300px]">
                                <Image
                                    unoptimized={true}
                                    src={'/images/search-not-found.webp'}
                                    width="100%"
                                    height="100%"
                                    layout="responsive"
                                    alt="search result not found illustration"
                                />
                            </div>
                            <p className="text-gray-600 text-lg text-center">
                                {`Sorry we couldn't find any matches for search:`}
                                <br />
                                <b className="text-gray-900 text-2xl">
                                    {keyword}
                                </b>
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <InfiniteScroll
                        style={{ overflow: 'hidden' }}
                        className="p-4"
                        dataLength={images.length}
                        next={() => dispatch(fetchImages())}
                        hasMore={page <= maxPage}
                        loader={
                            <div className="w-full p-7 flex justify-center animate-spin">
                                <BiLoaderAlt className="text-5xl text-gray-700" />
                            </div>
                        }
                    >
                        <Masonry
                            breakpointCols={{
                                default: 4,
                                1440: 3,
                                1024: 2,
                                768: 1,
                            }}
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
                                    originalImageUrl={
                                        getDownloadUrl(image).original
                                    }
                                    userImageUrl={image.userImageURL}
                                    userName={image.user}
                                    alt={image.tags}
                                />
                            ))}
                        </Masonry>
                    </InfiniteScroll>
                </>
            )}
            {filterModalVisibility ? (
                <FilterModalContainer
                    onClick={(e) => {
                        if (e.target === e.currentTarget) {
                            hideFilterModal()
                        }
                    }}
                >
                    <FilterModalCard>
                        <FilterHeader
                            onCloseButtonClick={() => hideFilterModal()}
                        />
                        <FilterList>
                            <FilterListItem>
                                <FilterListItemHeader
                                    icon={<BiSort />}
                                    title="Sort By"
                                />
                                <FilterListItemBody>
                                    <BasicFilter
                                        value={'Popular'}
                                        isSelected={
                                            filters.sortBy === 'popular'
                                        }
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                sortBy: 'popular',
                                            })
                                        }
                                    />
                                    <BasicFilter
                                        value={'Latest'}
                                        isSelected={filters.sortBy === 'latest'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                sortBy: 'latest',
                                            })
                                        }
                                    />
                                </FilterListItemBody>
                            </FilterListItem>
                            <FilterListItem>
                                <FilterListItemHeader
                                    icon={<AiOutlineReload />}
                                    title="Orientation"
                                />

                                <FilterListItemBody>
                                    <BasicFilter
                                        value="Any"
                                        isSelected={filters.orientation === ''}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                orientation: '',
                                            })
                                        }
                                    />
                                    <BasicFilter
                                        value="Landscape"
                                        isSelected={
                                            filters.orientation === 'horizontal'
                                        }
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                orientation: 'horizontal',
                                            })
                                        }
                                    />
                                    <BasicFilter
                                        value="Portrait"
                                        isSelected={
                                            filters.orientation === 'vertical'
                                        }
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                orientation: 'vertical',
                                            })
                                        }
                                    />
                                </FilterListItemBody>
                            </FilterListItem>
                            <FilterListItem>
                                <FilterListItemHeader
                                    icon={<IoMdImages />}
                                    title="Image Type"
                                />
                                <FilterListItemBody>
                                    <BasicFilter
                                        value={'All'}
                                        isSelected={filters.imageType === 'all'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                imageType: 'all',
                                            })
                                        }
                                    />
                                    <BasicFilter
                                        value={'Photo'}
                                        isSelected={
                                            filters.imageType === 'photo'
                                        }
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                imageType: 'photo',
                                            })
                                        }
                                    />
                                    <BasicFilter
                                        value={'Vector'}
                                        isSelected={
                                            filters.imageType === 'vector'
                                        }
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                imageType: 'vector',
                                            })
                                        }
                                    />
                                    <BasicFilter
                                        value={'Illustration'}
                                        isSelected={
                                            filters.imageType === 'illustration'
                                        }
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                imageType: 'illustration',
                                            })
                                        }
                                    />
                                </FilterListItemBody>
                            </FilterListItem>
                            <FilterListItem>
                                <FilterListItemHeader
                                    title="Colors"
                                    icon={<AiOutlineBgColors />}
                                />
                                <FilterListItemBody>
                                    <BasicFilter
                                        isSelected={filters.colors === ''}
                                        value="Any"
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: '',
                                            })
                                        }
                                    />
                                    <BasicFilter
                                        isSelected={
                                            filters.colors === 'grayscale'
                                        }
                                        value="Grayscale"
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'grayscale',
                                            })
                                        }
                                    />
                                    <BasicFilter
                                        isSelected={
                                            filters.colors === 'transparent'
                                        }
                                        value="Transparent"
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'transparent',
                                            })
                                        }
                                    />
                                </FilterListItemBody>
                                <FilterListItemBody>
                                    <ColorFilter
                                        selected={filters.colors === 'red'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'red',
                                            })
                                        }
                                        color="red"
                                    />
                                    <ColorFilter
                                        selected={filters.colors === 'orange'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'orange',
                                            })
                                        }
                                        color="orange"
                                    />
                                    <ColorFilter
                                        selected={filters.colors === 'yellow'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'yellow',
                                            })
                                        }
                                        color="yellow"
                                    />
                                    <ColorFilter
                                        selected={filters.colors === 'green'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'green',
                                            })
                                        }
                                        color="green"
                                    />
                                    <ColorFilter
                                        selected={
                                            filters.colors === 'turquoise'
                                        }
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'turquoise',
                                            })
                                        }
                                        color="turquoise"
                                    />
                                    <ColorFilter
                                        selected={filters.colors === 'blue'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'blue',
                                            })
                                        }
                                        color="blue"
                                    />
                                    <ColorFilter
                                        selected={filters.colors === 'lilac'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'lilac',
                                            })
                                        }
                                        color="lilac"
                                    />
                                    <ColorFilter
                                        selected={filters.colors === 'pink'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'pink',
                                            })
                                        }
                                        color="pink"
                                    />
                                    <ColorFilter
                                        selected={filters.colors === 'white'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'white',
                                            })
                                        }
                                        color="white"
                                    />
                                    <ColorFilter
                                        selected={filters.colors === 'gray'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'gray',
                                            })
                                        }
                                        color="gray"
                                    />
                                    <ColorFilter
                                        selected={filters.colors === 'black'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'black',
                                            })
                                        }
                                        color="black"
                                    />
                                    <ColorFilter
                                        selected={filters.colors === 'brown'}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                colors: 'brown',
                                            })
                                        }
                                        color="brown"
                                    />
                                </FilterListItemBody>
                            </FilterListItem>
                            <FilterListItem>
                                <FilterListItemHeader
                                    title="Minimum Size"
                                    icon={<BsAspectRatio />}
                                />
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col gap-1">
                                        <label
                                            htmlFor="minimum-width-field"
                                            className="text-gray-600"
                                        >
                                            Minimum Width
                                        </label>
                                        <input
                                            type="number"
                                            className="px-6 py-3 bg-gray-100 rounded text-gray-600 placeholder:text-gray-500 w-full h-fit"
                                            placeholder="Minimum Width"
                                            value={minimumWidth}
                                            id="minimum-width-field"
                                            onChange={(e) => {
                                                if (
                                                    parseInt(e.target.value) < 0
                                                ) {
                                                    setMinimumWidth('0')
                                                } else {
                                                    setMinimumWidth(
                                                        e.target.value
                                                    )
                                                }
                                            }}
                                            onBlur={() => {
                                                if (minimumWidth === '') {
                                                    setMinimumWidth('0')
                                                }
                                                if (
                                                    minimumWidth !==
                                                    filters.minimumWidth
                                                ) {
                                                    setFilters({
                                                        ...filters,
                                                        minimumWidth:
                                                            minimumWidth === ''
                                                                ? '0'
                                                                : minimumWidth,
                                                    })
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <label
                                            htmlFor="minimum-height-field"
                                            className="text-gray-600"
                                        >
                                            Minimum Height
                                        </label>
                                        <input
                                            type="number"
                                            className="px-6 py-3 bg-gray-100 rounded text-gray-600 placeholder:text-gray-500 w-full h-fit"
                                            placeholder="Minimum Height"
                                            value={minimumHeight}
                                            id="minimum-height-field"
                                            onChange={(e) => {
                                                if (
                                                    parseInt(e.target.value) < 0
                                                ) {
                                                    setMinimumHeight('0')
                                                } else {
                                                    setMinimumHeight(
                                                        e.target.value
                                                    )
                                                }
                                            }}
                                            onBlur={() => {
                                                if (minimumHeight === '') {
                                                    setMinimumHeight('0')
                                                }
                                                if (
                                                    minimumHeight !==
                                                    filters.minimumHeight
                                                ) {
                                                    setFilters({
                                                        ...filters,
                                                        minimumHeight:
                                                            minimumHeight === ''
                                                                ? '0'
                                                                : minimumHeight,
                                                    })
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </FilterListItem>

                            <FilterListItem>
                                <FilterListItemHeader
                                    icon={<BiCategory />}
                                    title="Category"
                                />
                                <FilterListItemBody>
                                    <BasicFilter
                                        value="Any"
                                        isSelected={filters.category === ''}
                                        onClick={() =>
                                            setFilters({
                                                ...filters,
                                                category: '',
                                            })
                                        }
                                    />
                                    {[
                                        'backgrounds',
                                        'fashion',
                                        'nature',
                                        'science',
                                        'education',
                                        'feelings',
                                        'health',
                                        'people',
                                        'religion',
                                        'places',
                                        'animals',
                                        'industry',
                                        'computer',
                                        'food',
                                        'sports',
                                        'transportation',
                                        'travel',
                                        'buildings',
                                        'business',
                                        'music',
                                    ].map((item) => (
                                        <BasicFilter
                                            key={`category ${item}`}
                                            value={
                                                item.charAt(0).toUpperCase() +
                                                item.slice(1)
                                            }
                                            isSelected={
                                                filters.category === item
                                            }
                                            onClick={() =>
                                                setFilters({
                                                    ...filters,
                                                    category: item,
                                                })
                                            }
                                        />
                                    ))}
                                </FilterListItemBody>
                            </FilterListItem>
                        </FilterList>
                    </FilterModalCard>
                </FilterModalContainer>
            ) : (
                ''
            )}
        </div>
    )
}

export default SearchResultPage
