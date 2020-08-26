import React from 'react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { render, fireEvent } from '@testing-library/react'

// Component being tested
import PopPrediction from './PopPrediction'

describe('PopPrediction test -', () => {
  const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => res(ctx.json({ greeting: 'hello there' })))
  )

  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  it('renders correctly', () => {
    const { container } = render(<PopPrediction />)
    expect(container.firstChild).toMatchSnapshot()
  })

  it('pop gets prediction', async () => {
    const { getByTitle } = render(<PopPrediction />)
    fireEvent.click(getByTitle('pop-button'))
    expect(getByTitle('prediction')).toBeTruthy()
  })
})
