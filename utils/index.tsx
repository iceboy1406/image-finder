interface ResponseData {
    total: number
    totalHits: number
    hits: ResponseImage[]
}
interface ResponseImage {
    id: number
    pageURL: string
    type: string
    tags: string
    previewURL: string
    previewWidth: number
    previewHeight: number
    webformatURL: string
    webformatWidth: number
    webformatHeight: number
    largeImageURL: string
    fullHDURL: string
    imageURL: string
    imageWidth: number
    imageHeight: number
    imageSize: number
    views: number
    downloads: number
    likes: number
    comments: number
    user_id: number
    user: string
    userImageURL: string
}
function getCompressedImageExtension(image: ResponseImage) {
    return image.previewURL.split('.')[image.previewURL.split('.').length - 1]
}
function getOriginalImageExtension(image: ResponseImage) {
    switch (image.type) {
        case 'photo':
            return getCompressedImageExtension(image)
        case 'illustration':
            return getCompressedImageExtension(image)
        case 'vector/ai':
            return 'ai'
        case 'vector/svg':
            return 'svg'
        default:
            console.log(`invalid type : `, image)
            // throw Error('invalid type')
    }
}
function getDownloadUrl(image: ResponseImage) {
    const firstTag = image.tags.split(',')[0].trim().replace(" ", "-")
    return {
        small: `https://pixabay.com/images/download/${firstTag}-${
            image.id
        }_640.${getCompressedImageExtension(image)}?attachment`,
        medium: `https://pixabay.com/images/download/${firstTag}-${
            image.id
        }_1280.${getCompressedImageExtension(image)}?attachment`,
        large: `https://pixabay.com/images/download/${firstTag}-${
            image.id
        }_1920.${getCompressedImageExtension(image)}?attachment`,
        original: `https://pixabay.com/images/download/${firstTag}-${
            image.id
        }.${getOriginalImageExtension(image)}?attachment`,
    }
}
export type { ResponseImage,ResponseData }
export {
    getCompressedImageExtension,
    getDownloadUrl,
    getOriginalImageExtension,
}
