import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProductsState } from '@store/products/types'
import {
  FurnitureFeatureModal,
  FurnitureItemData,
  FurnitureModal,
  PhotosModal,
  PlywoodItemData,
  PlywoodModal,
} from '@models/Products'
import { plywoodService } from '@services/products/plywood.service'
import { furnitureService } from '@services/products/furniture.service'

export const initialState: ProductsState = {
  isLoading: false,
  isError: false,
  plywood: null,
  plywoodItem: null,
  furniture: null,
  furnitureItem: null,
  furnitureFeature: null,
  furnitureParams: null,
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

export const fetchFurnitureParamsAsync = createAsyncThunk<FurnitureFeatureModal>(
  'products/fetchFurnitureParams',
  async (_, { rejectWithValue }) => {
    try {
      return await furnitureService.furnitureParamsAll()
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

export const fetchPlywoodItemAsync = createAsyncThunk<PlywoodItemData, string>(
  'products/fetchPlywoodItem',
  async (id, { rejectWithValue }) => {
    try {
      return await plywoodService.plywood(id)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const fetchFurnitureItemAsync = createAsyncThunk<FurnitureItemData, string>(
  'products/fetchFurnitureItem',
  async (id, { rejectWithValue }) => {
    try {
      return await furnitureService.furniture(id)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    removePlywoodItem: (state) => {
      state.plywoodItem = null
    },
    removeFurnitureItem: (state) => {
      state.furnitureItem = null
    },
  },
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

      .addCase(fetchFurnitureParamsAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchFurnitureParamsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.furnitureParams = action.payload.data
      })
      .addCase(fetchFurnitureParamsAsync.rejected, (state) => {
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

      .addCase(fetchPlywoodItemAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchPlywoodItemAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.plywoodItem = action.payload.product
      })
      .addCase(fetchPlywoodItemAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(fetchFurnitureItemAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchFurnitureItemAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.furnitureItem = action.payload.product
      })
      .addCase(fetchFurnitureItemAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const { removePlywoodItem, removeFurnitureItem } = productsSlice.actions

export default productsSlice.reducer
