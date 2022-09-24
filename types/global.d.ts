declare interface ImageData {
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
declare interface ResponseData {
    total: number
    totalHits: number
    hits: ImageData[]
}
declare interface Filters {
    sortBy: string
    orientation: string
    imageType: string
    category: string
    minimumWidth: string
    minimumHeight: string
    colors: string
}
