import { blogAxiosInstance as blogApi } from './axios'

const getArticle = async (slug) => await blogApi.get(`articles/${slug}`)

export default getArticle
