import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import imagesSlice from './slices/images'

const store = configureStore({
    reducer: {
        images: imagesSlice.reducer,
    },
    devTools: true,
})
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
export const useAppDispatch: () => AppDispatch = useDispatch
