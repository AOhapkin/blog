import blogAxiosInstance from './axios'

const getArticlesByPage = async (page) => {
  // const count = 10

  // const params = {
  //   limit: 10,
  //   offset: page ? page * count : 0,
  // }

  // const res = await blogAxiosInstance.get('articles', params)

  const n = 5
  if (page === 1) page = 0
  else page = page * n - n
  const res = await blogAxiosInstance.get('articles', {
    params: {
      limit: 5,
      page,
    },
  })

  return res
}

export default getArticlesByPage
