import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'
import BlogForm from './BlogForm'

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

test('The form calls the event handler with correct details' , async () => {
  const blog = {
    title: testBlog.title,
    author: testBlog.author,
    url: testBlog.url,
  }

  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog}/>)

  const titleInput = screen.getByLabelText('Title:')
  await user.type(titleInput, blog.title)

  const authorInput = screen.getByLabelText('Author:')
  await user.type(authorInput, blog.author)

  const urlInput = screen.getByLabelText('Url:')
  await user.type(urlInput, blog.url)

  const sendButton = screen.getByRole('button')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
})