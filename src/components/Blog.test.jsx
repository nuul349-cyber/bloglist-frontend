import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect } from 'vitest'
import Blog from './Blog'

const testBlog = {
  title: 'A title',
  author: 'An author',
  url: 'anurl.com',
  likes: 0,
  user: {
    username: 'AUserName',
    name: 'A name',
  }
}

test('display title and author only', () => {
  const blog = { ...testBlog }

  render(<Blog blog={blog}/>)

  const titleElement = screen.queryByText(blog.title, { exact:false })
  expect(titleElement).toBeDefined()

  const authorElement = screen.queryByText(blog.author, { exact:false })
  expect(authorElement).toBeDefined()

  const urlElement = screen.queryByText(blog.url, { exact:false })
  expect(urlElement).not.toBeInTheDocument()

  const likeElement = screen.queryByText('Likes', { exact:false })
  expect(likeElement).not.toBeInTheDocument()

  const usernameElement = screen.queryByText(blog.user.username, { exact:false })
  expect(usernameElement).not.toBeInTheDocument()
})

test('URL and likes displayed after button is pressed', async () => {
  const blog = { ...testBlog }
  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const titleElement = screen.queryByText(blog.title, { exact:false })
  expect(titleElement).toBeDefined()

  const authorElement = screen.queryByText(blog.author, { exact:false })
  expect(authorElement).toBeDefined()

  const urlElement = screen.queryByText(blog.url, { exact:false })
  expect(urlElement).toBeInTheDocument()

  const likeElement = screen.queryByText('Likes', { exact:false })
  expect(likeElement).toBeInTheDocument()

  const usernameElement = screen.queryByText(blog.user.username, { exact:false })
  expect(usernameElement).toBeInTheDocument()
})