import blogAxiosInstance from './axios'

const getArticlesByPage = async (page) => {
  const count = 10

  const params = {
    limit: 10,
    offset: page ? page * count : 0,
  }

  const res = await blogAxiosInstance.get('articles', params)

  return res
}

export default getArticlesByPage
