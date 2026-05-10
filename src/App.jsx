import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    return loggedUserJSON
      ? JSON.parse(loggedUserJSON)
      : null
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token)
    }
  }, [user])

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  if (!user) {
    return <LoginForm setUser={setUser}/>
  }
  
  return (
    <div>
      <h2>blogs</h2>
      <p><span>{user.name}</span> logged in</p>
      <button onClick={logOut}>Log out</button>
      <BlogForm setBlogs={setBlogs} blogs={blogs}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App