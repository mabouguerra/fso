import React, { Component } from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

<div class='foo'></div>

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()

  beforeEach(() => {
    const blog =   {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2,
      user: {
        name: 'Amine'
      }
    }
    
    component = render(
      <Blog blog={blog} likeBlog={mockHandler}/>
    )
  })

  test('displays title and author by default, but not url or number of likes', () => {
    
    const visible = component.container.querySelector('.visible')
    expect(visible).not.toHaveStyle('display: none') 

    const hidden = component.container.querySelector('.hidden')
    expect(hidden).toHaveStyle('display: none') 
  })

  test('displays url and number of likes when the show button has been clicked.', () => {

    const button = component.getByText('view')
    button.click(button)
    const hidden = component.container.querySelector('.hidden')
    expect(hidden).not.toHaveStyle('display: none') 
  })

  test('calls the event handler it received as props twice if the like button is clicked twice', () => {

    const button = component.getByText('like')
    button.click(button)
    button.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2) 
  })


})
