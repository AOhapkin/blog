import blogAxiosInstance from './axios'

const getArticle = async (slug) => 
  await blogAxiosInstance.get(`articles/${slug}`)

export default getArticle
