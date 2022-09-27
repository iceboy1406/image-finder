import axios from 'axios'

class PixabayImageApi {
  static async getHomePageImages(page: number) {
    const response = await axios.get<ResponseData>(
      `https://pixabay.com/api/?key=27699215-ecac0a076f968a0144f33abee&page=${page}&safesearch=true`
    )
    return response.data
  }

  static async getImageDetail(id: number) {
    const response = await axios.get<ResponseData>(
      `https://pixabay.com/api/?key=27699215-ecac0a076f968a0144f33abee&id=${id}`
    )
    return response.data.hits[0]
  }

  static async searchImage(keyword: string, filters: Filters, page: number) {
    const response = await axios.get<ResponseData>(
      `https://pixabay.com/api/?key=27699215-ecac0a076f968a0144f33abee&page=${page}&q=${keyword}&safesearch=true&order=${filters?.sortBy}&orientation=${filters?.orientation}&image_type=${filters?.imageType}&category=${filters?.category}&min_width=${filters?.minimumWidth}&min_height=${filters?.minimumHeight}&colors=${filters?.colors}`
    )
    return response.data
  }
}
export default PixabayImageApi
