import React from 'react'
import {
    configure, mount, render, shallow,
} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import sinon from 'sinon'
import { MockedProvider } from '@apollo/react-testing'
import { act, create } from 'react-test-renderer'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from 'store/store'
import { Mutation, Query } from 'react-apollo'
import { ApolloProvider, useMutation, useQuery } from '@apollo/react-hooks'
import { InMemoryCache } from 'apollo-cache-inmemory'
import client from 'config/apollo'
import 'mutationobserver-shim'

const cache = new InMemoryCache()
cache.writeData({
  data: {
    searchKey: '',
  },
})

// Make these available globally for tests
global.React = React
global.shallow = shallow
global.render = render
global.mount = mount
global.sinon = sinon
global.MockedProvider = MockedProvider
global.ApolloProvider = ApolloProvider
global.act = act
global.create = create
global.BrowserRouter = BrowserRouter
global.Provider = Provider
global.store = store
global.Mutation = Mutation
global.Query = Query
global.useQuery = useQuery
global.useMutation = useMutation
global.client = client
global.cache = cache
global.MutationObserver = window.MutationObserver

// Configure Enzyme
configure({ adapter: new Adapter(), disableLifecycleMethods: true })

// Mock fetch for tests
global.fetch = vi.fn()

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
