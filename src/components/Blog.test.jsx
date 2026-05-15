import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
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

test('If like button is clicked twice, its handler is called twice', async () => {
  const blog = { ...testBlog }

  const mockHandler = vi.fn()

  const { container } = render(<Blog blog={blog} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = container.querySelector('.like-button')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})