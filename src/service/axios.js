import axios from 'axios'

const BASE_URL = 'https://blog.kata.academy/api'
const HEADERS = {
  'Content-Type': 'application/json',
  // Authorization: `Token ${localStorage.getItem('token')}`,
}

const blogAxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: HEADERS,
})

export default blogAxiosInstance
