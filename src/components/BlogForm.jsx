import { useState } from "react"
import blogsService from '../services/blogs'

const BlogForm = ({setBlogs, blogs, notify}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async event => {
    event.preventDefault()
    const blog = {
      title,
      author,
      url,
    }

    try {
      const returnedBlog = await blogsService.createBlog(blog)
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
      notify('New blog created')
    } catch (reason) {
      console.log(reason)
      notify(reason.response.data.error, 'error')
    }
  }

  return (
    <>
    <h2>Create new blog</h2>
    <form onSubmit={addBlog}>
      <div>
        <label htmlFor="title">Title</label>
        <input 
          id="title"
          type="text" 
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input 
          id="author"
          type="text" 
          value={author}
          onChange={({target}) => setAuthor(target.value)}
        />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input 
          id="url"
          type="text" 
          value={url}
          onChange={({target}) => setUrl(target.value)}
        />
      </div>
      <button type="submit">send</button>
    </form>
    </>
  )
}

export default BlogForm