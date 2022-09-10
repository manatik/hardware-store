import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CategoriesState } from '@store/category/types'
import { Categories } from '@models/Category'
import { categoryService } from '@services/category/category.service'

export const initialState: CategoriesState = {
  isLoading: false,
  isError: false,
  items: null,
}

export const fetchCategoryAsync = createAsyncThunk<Categories>(
  'category/fetchCategory',
  async (_, { rejectWithValue }) => {
    try {
      const data = categoryService.categories()
      return data
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.categories
      })
      .addCase(fetchCategoryAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export default categorySlice.reducer
