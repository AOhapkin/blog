import blogAxiosInstance from './axios'

const postFavoriteArticleRequest = async (slug) =>
  await blogAxiosInstance.post(`articles/${slug}/favorite`)

export default postFavoriteArticleRequest
