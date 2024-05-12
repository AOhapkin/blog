import blogAxiosInstance from './axios'

const sendProfileUpdate = async (dataUser) =>
  await blogAxiosInstance.put('user', dataUser)

export default sendProfileUpdate
