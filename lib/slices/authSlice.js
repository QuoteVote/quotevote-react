import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    id: '1',
    username: 'demo_user',
    email: 'demo@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Demo+User&background=random',
    bio: 'This is a demo account for testing purposes.',
  },
  isAuthenticated: true,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = !!action.payload
      state.error = null
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
  },
})

export const { setUser, setLoading, setError, logout } = authSlice.actions
export default authSlice.reducer 