import 'styles/tailwind.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import store from 'store'
import { useEffect, useState } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const [showChild, setShowChild] = useState(false)
    useEffect(() => {
        setShowChild(true)
    }, [])

    if (!showChild) {
        return null
    }

    if (typeof window === 'undefined') {
        return <></>
    } else {
        return (
            <Provider store={store}>
                <Component {...pageProps} key={router.asPath} />
            </Provider>
        )
    }
}

export default MyApp
