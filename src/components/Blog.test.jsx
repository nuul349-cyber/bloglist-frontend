import { render, screen } from '@testing-library/react'
import { test, expect } from 'vitest'
import Blog from './Blog'

test('display title and author only', () => {
  const blog = {
    title: 'A title',
    author: 'An author',
    url: 'anurl.com',
    likes: 0
  }

  render(<Blog blog={blog}/>)

  const titleElement = screen.getByText('A title', { exact:false })
  expect(titleElement).toBeDefined()

  const authorElement = screen.getByText('An author', { exact:false })
  expect(authorElement).toBeDefined()

  const urlElement = screen.queryByText('anurl.com', { exact:false })
  expect(urlElement).not.toBeInTheDocument()

  const likeElement = screen.queryByText('Likes', { exact:false })
  expect(likeElement).not.toBeInTheDocument()
})