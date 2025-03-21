import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filter: {
    visibility: false,
  },
  date: {
    visibility: false,
  },
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilterVisibility: (state) => {
      state.filter.visibility = !state.filter.visibility
    },
    toggleDateVisibility: (state) => {
      state.date.visibility = !state.date.visibility
    },
  },
})

export const { toggleFilterVisibility, toggleDateVisibility } = filterSlice.actions
export default filterSlice.reducer 