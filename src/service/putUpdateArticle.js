import blogAxiosInstance from './axios'

const putUpdateArticle = async (articleUpdatedData, slug) =>
  await blogAxiosInstance.put(`articles/${slug}`, articleUpdatedData)

export default putUpdateArticle
