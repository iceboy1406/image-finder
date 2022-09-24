function getCompressedImageExtension(image: ImageData) {
    return image.previewURL.split('.')[image.previewURL.split('.').length - 1]
}
function getOriginalImageExtension(image: ImageData) {
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
            return 'jpg'
    }
}
function getDownloadUrl(image: ImageData) {
    const firstTag = image.tags.split(',')[0].trim().replace(' ', '-')
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
const getResolutions = (originalWidth: number, originalHeight: number) => {
    if (originalWidth > originalHeight) {
        return {
            small: `640x${Math.floor((originalHeight / originalWidth) * 640)}`,
            medium: `1280x${Math.floor(
                (originalHeight / originalWidth) * 1280
            )}`,
            large: `1920x${Math.floor(
                (originalHeight / originalWidth) * 1920
            )}`,
            original: `${originalWidth}x${originalHeight}`,
        }
    }
    return {
        small: `${Math.floor((originalWidth / originalHeight) * 640)}x640`,
        medium: `${Math.floor((originalWidth / originalHeight) * 1280)}x1280`,
        large: `${Math.floor((originalWidth / originalHeight) * 1920)}x1920`,
        original: `${originalWidth}x${originalHeight}`,
    }
}
const apiBaseUrl = `https://pixabay.com/api/?key=27699215-ecac0a076f968a0144f33abee`
export {
    getCompressedImageExtension,
    getDownloadUrl,
    getOriginalImageExtension,
    apiBaseUrl,
    getResolutions,
}
