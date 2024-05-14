import blogAxiosInstance from './axios'

const getArticlesByPage = async (page) => {
  const n = 5
  if (page === 1) page = 0
  else page = page * n - n
  console.log(page)
  const res = await blogAxiosInstance.get('articles', {
    params: {
      limit: 5,
      offset: page,
    },
  })

  return res
}

export default getArticlesByPage
