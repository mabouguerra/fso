import React, { Component } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './BlogForm'
import BlogForm from './BlogForm'

test.only('<BlogForm /> calls the onSubmit event handler with the right details', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'some title'}
  })
  fireEvent.change(author, {
    target: { value: 'some author'}
  })
  fireEvent.change(url, {
    target: { value: 'some url'}
  })
  fireEvent.submit(form)
  
  expect(createBlog.mock.calls[0][0].title).toBe('some title')
  expect(createBlog.mock.calls[0][0].author).toBe('some author')
  expect(createBlog.mock.calls[0][0].url).toBe('some url')

  
})