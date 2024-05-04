import blogAxiosInstance from './axios'

const postNewUser = async (dataUser) => 
  blogAxiosInstance.post('users', dataUser)

export default postNewUser
