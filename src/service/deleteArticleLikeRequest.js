import blogAxiosInstance from './axios'

const deleteArticleLikeRequest = async (slug) =>
  await blogAxiosInstance.delete(`articles/${slug}/favorite`)

export default deleteArticleLikeRequest
