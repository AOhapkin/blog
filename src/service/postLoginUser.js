import blogAxiosInstance from './axios'

const postLoginUser = async (dataUser) => 
  await blogAxiosInstance.post('users/login', dataUser)

export default postLoginUser
