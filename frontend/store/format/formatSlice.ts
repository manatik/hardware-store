import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { FormatsState } from '@store/format/types'
import { formatService } from '@services/format/format.service'

export const initialState: FormatsState = {
  isLoading: false,
  isError: false,
  items: null,
}

export const fetchFormatsAsync = createAsyncThunk(
  'format/fetchFormats',
  async (_, { rejectWithValue }) => {
    try {
      return formatService.formats()
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const fetchAddFormatAsync = createAsyncThunk(
  'format/fetchAddFormat',
  async (formatData, { rejectWithValue }) => {
    try {
      return formatService.formatAdd(formatData)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

// export const fetchUpdateFormatAsync = createAsyncThunk<CategoryData, Category>(
//   'format/fetchUpdateCategory',
//   async (categoryData, { rejectWithValue }) => {
//     try {
//       const data = categoryService.categoryUpdate(categoryData)
//       return data
//     } catch (err: any) {
//       return rejectWithValue(err)
//     }
//   },
// )

export const formatSlice = createSlice({
  name: 'format',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFormatsAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchFormatsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.formats
      })
      .addCase(fetchFormatsAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(fetchAddFormatAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchAddFormatAsync.fulfilled, (state) => {
        state.isLoading = false
      })
      .addCase(fetchAddFormatAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export default formatSlice.reducer
