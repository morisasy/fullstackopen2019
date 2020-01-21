import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, waitForElement, cleanup } from "@testing-library/react"
import { prettyDOM } from '@testing-library/dom'

import App from "../App"
/*
const user = {
      username: "mluukkai",
      token: '1231231214',
      name: "Matti Luukkainen"
   }
const user = {
    username: "mluukkai",
    token: '1231231214',
    name: 'Donald Tester'
  
}
*/

describe("<App />", () => {
  afterEach(cleanup)
  test("if nobody login, blogs are not rendered", async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)


    await waitForElement(
      () => component.getByText("login")
    )

    const divButton = component.container.querySelector('.form-group-login')
    expect(divButton).toBeDefined()

    // not login
    const div = component.container.querySelectorAll(".blog-detail")
    expect (div.length).toBe(0)
  })

  test("When user is login, blogs are rendered", async () => {
    const user = {
      username: "mluukkai",
      token: '1231231214',
      name: 'Donald Tester'  
    }

    
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    // renders all notes it gets from backend
    const component = render(
        <App />
      )
    await waitForElement(
        () =>component.container.querySelector('.blog-detail')
      )

    expect(component.container.querySelector(".blog-detail")).toBeDefined()
   
    const divForm = component.container.querySelector(".form-group")
    expect(divForm).toBeDefined()

    const blogs = component.container.querySelectorAll('.blog-detail')
    expect(blogs.length).toBe(5) 
    expect(blogs).toHaveTextContent("Oprah Winfrey")
    expect(blogs).toHaveTextContent("Crypto currency")
    expect(blogs).toHaveTextContent("You never fail until you stop trying")
    expect(blogs).toHaveTextContent("Money is important than education")
    expect(blogs).toHaveTextContent("Usa and Iran Tension")

    const formDetail = component.container.querySelector('.form-group')
    console.log(prettyDOM(formDetail))
   
    

  })
 
})