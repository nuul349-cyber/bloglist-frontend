import axios from 'axios'
const baseURL = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseURL, credentials)
  return response.data
}

const verify = async token => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  const response = await axios.post(`${baseURL}/verify`, {}, config)
  console.log('verify:response:',response)
  return response
}
export default { login, verify }