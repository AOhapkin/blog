import blogAxiosInstance from './axios'

const postCreateNewArticle = async (newArticleData) =>
  await blogAxiosInstance.post('articles', newArticleData)

export default postCreateNewArticle
