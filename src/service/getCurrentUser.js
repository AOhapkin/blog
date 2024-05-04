import blogAxiosInstance from './axios'

const getCurrentUser = async () => blogAxiosInstance.get('user')

export default getCurrentUser
