import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createBlog = async blog => {
  const config = {
    headers: { Authorization: token}
  }

  const response = await axios.post(baseUrl, blog, config)
  console.log('createBlog:response.data:',response.data)
  return response.data
}

const likeBlog = async blog => {
  console.log()
  console.log('likeBlog:before:',blog)
  blog.likes += 1
  blog.user = blog.user.id
  console.log('likeBlog:after',blog)
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog)
  console.log('likeBlog:response.data: ',response.data)
  return response.data
}

export default { getAll, createBlog, setToken, likeBlog }