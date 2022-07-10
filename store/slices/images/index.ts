import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from 'store'
import { Filters, ImageData, ResponseData } from 'types'

interface ImagesState {
    page: number
    maxPage: number
    images: ImageData[]
    loading: boolean
}
const initialState: ImagesState = {
    page: 0,
    maxPage: 1,
    images: [],
    loading: false
}
const defaultFilters: Filters = {
    sortBy: 'popular',
    orientation: '',
    imageType: 'all',
    category: '',
    minimumWidth: '0',
    minimumHeight: '0',
    colors: '',
}
type FetchParams = { keyword?: string; filters?: Filters } | undefined
const fetchImages = createAsyncThunk<any, FetchParams, { state: RootState }>(
    'searchedImages/fetchSearchedImages',
    async (params = { filters: defaultFilters, keyword: '' }, { getState }) => {
        const currentState = getState()
        const { filters, keyword } = params
        const response = await axios.get(
            `https://pixabay.com/api/?key=27699215-ecac0a076f968a0144f33abee&page=${currentState.images.page + 1}&q=${keyword}&safesearch=true&order=${filters?.sortBy}&orientation=${filters?.orientation}&image_type=${filters?.imageType}&category=${filters?.category}&min_width=${filters?.minimumWidth}&min_height=${filters?.minimumHeight}&colors=${filters?.colors}`
        )
        return response.data
    }
)

const imagesSlice = createSlice({
    name: 'searchedImages',
    initialState,
    reducers: {
        reset: (state) => {
            state.images = initialState.images
            state.maxPage = initialState.maxPage
            state.page = initialState.page
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchImages.fulfilled, (state, action) => {
            const responseData: ResponseData = action.payload
            state.page++
            state.maxPage = Math.ceil(responseData.totalHits / 20)
            state.images.push(...responseData.hits)
            state.loading = false
        })
        builder.addCase(fetchImages.rejected, (state, action) => {
            console.error(action.error)
        })
        builder.addCase(fetchImages.pending, (state, action) => {
            state.loading = true
        })
    },
})
export default imagesSlice
export type { ImagesState }
export const { reset: resetImageData } = imagesSlice.actions
export { fetchImages }
