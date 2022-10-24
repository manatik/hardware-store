import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductsState } from '@store/products/types'
import { PlywoodModal } from '@models/Products'
import { plywoodService } from '@services/products/plywood.service'

export const initialState: ProductsState = {
  isLoading: false,
  isError: false,
  plywood: null,
  house: null,
}

export const fetchPlywoodAsync = createAsyncThunk<PlywoodModal>(
  'products/fetchPlywood',
  async (_, { rejectWithValue }) => {
    try {
      return await plywoodService.plywoodAll()
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlywoodAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPlywoodAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.plywood = action.payload.products
      })
      .addCase(fetchPlywoodAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export default productsSlice.reducer
