import instanceAxios from './axios'

const deleteArticleRequest = async (slug) =>
  await instanceAxios.delete(`articles/${slug}`)

export default deleteArticleRequest
