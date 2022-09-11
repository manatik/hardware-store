import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CategoriesState } from '@store/category/types'
import { Categories, Category, CategoryData } from '@models/Category'
import { categoryService } from '@services/category/category.service'

export const initialState: CategoriesState = {
  isLoading: false,
  isError: false,
  items: null,
}

export const fetchCategoriesAsync = createAsyncThunk<Categories>(
  'category/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      return categoryService.categories()
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const fetchUpdateCategoryAsync = createAsyncThunk<CategoryData, Category>(
  'category/fetchUpdateCategory',
  async (categoryData, { rejectWithValue }) => {
    try {
      return categoryService.categoryUpdate(categoryData)
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
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = action.payload.categories
      })
      .addCase(fetchCategoriesAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(fetchUpdateCategoryAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(fetchUpdateCategoryAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchUpdateCategoryAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.items = state.items && state.items.map((item) => {
          if (item.id === action.payload.category.id) return action.payload.category
          return item
        })
      })
  },
})

export default categorySlice.reducer
