import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductsState } from '@store/products/types'
import {
  FurnitureFeatureModal, FurnitureModal, PhotosModal, PlywoodModal,
} from '@models/Products'
import { plywoodService } from '@services/products/plywood.service'
import { furnitureService } from '@services/products/furniture.service'

export const initialState: ProductsState = {
  isLoading: false,
  isError: false,
  plywood: null,
  furniture: null,
  furnitureFeature: null,
  furniturePhotos: null,
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

export const fetchFurnitureAsync = createAsyncThunk<FurnitureModal>(
  'products/fetchFurniture',
  async (_, { rejectWithValue }) => {
    try {
      return await furnitureService.furnitureAll()
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const fetchFurnitureFeatureAsync = createAsyncThunk<FurnitureFeatureModal>(
  'products/fetchFurnitureFeature',
  async (_, { rejectWithValue }) => {
    try {
      return await furnitureService.furnitureFeatureAll()
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const fetchFurniturePhotosAsync = createAsyncThunk<PhotosModal>(
  'products/fetchFurniturePhoto',
  async (_, { rejectWithValue }) => {
    try {
      return await furnitureService.furniturePhotosAll()
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

      .addCase(fetchFurnitureAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchFurnitureAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.furniture = action.payload.products
      })
      .addCase(fetchFurnitureAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(fetchFurnitureFeatureAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchFurnitureFeatureAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.furnitureFeature = action.payload.data
      })
      .addCase(fetchFurnitureFeatureAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(fetchFurniturePhotosAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchFurniturePhotosAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.furniturePhotos = action.payload.data
      })
      .addCase(fetchFurniturePhotosAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export default productsSlice.reducer
