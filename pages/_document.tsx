import { Html, Main, NextScript,Head } from 'next/document'
import React from 'react'

const Document = () => {
    return (
        <Html lang='en'>
            <Head>
                <link rel="shortcut icon" href="/images/logo.webp" />
                <title>Image Finder</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}

export default Document
