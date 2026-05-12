import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import './App.css'

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
    blogService
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
      blogService.setToken(user.token)
    }
  }, [user])

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    notify('Succesfully Logout')
  }

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
      <h2>blogs</h2>
      {notifMessage && <Notification message={notifMessage.message} type={notifMessage.type}/>}
      <p><span>{user.name}</span> logged in</p>
      <button onClick={logOut}>Log out</button>
      <BlogForm setBlogs={setBlogs} blogs={blogs} notify={notify}/>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App