import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogsService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './App.css'
import Toggleable from './components/Toggleable'

let timeout = null

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    return loggedUserJSON
      ? JSON.parse(loggedUserJSON)
      : null
  })
  const [notifMessage, setNotifMessage] = useState(null)
  
  const notify = (message, type) => {
    setNotifMessage({message, type})
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogsService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )
      .catch(reason => {
        console.log(reason)
        if (reason.response.status === 500) {
          notify('No connection with the server', 'error')
        } else {
          notify(reason.message, 'error')
        }
      }) 
  }, [])

  useEffect(() => {
    if (user) {
      blogsService.setToken(user.token)
    }
  }, [user])

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    notify('Succesfully Logout')
  }

  const createBlog = async (blog) => {
    try {
      const returnedBlog = await blogsService.createBlog(blog)
      setBlogs(blogs.concat(returnedBlog))
      blogFormRef.current.setVisible(false)
      notify('New blog created')
      return true
    } catch (reason) {
      console.log(reason)
      if (reason.response.data.error.includes('expired')) {
        console.log('logout')
        logOut()
      }
      notify(reason.response.data.error, 'error')
      return false
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = await  blogsService.likeBlog(blog)
    setBlogs(blogs.map(b => b.id === blog.id ? updatedBlog : b))
  }

  const blogFormRef = useRef()

  if (!user) {
    return (
      <>
      {notifMessage && <Notification message={notifMessage.message} type={notifMessage.type}/>}
      <LoginForm setUser={setUser} notify={notify}/>
      </>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      {notifMessage && <Notification message={notifMessage.message} type={notifMessage.type}/>}
      <p><span>{user.name}</span> logged in <button onClick={logOut}>Log out</button></p>
      <Toggleable buttonLabel='New note' ref={blogFormRef}>
        <BlogForm createBlog={createBlog}/>
      </Toggleable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={() => handleLike({...blog})} />
      )}
    </div>
  )
}

export default App