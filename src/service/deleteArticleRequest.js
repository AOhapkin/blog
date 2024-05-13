import instanceAxios from './instanceAxios'

const deleteArticleRequest = async (slug) =>
  await instanceAxios.delete(`articles/${slug}`)

export default deleteArticleRequest
