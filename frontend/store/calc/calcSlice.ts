import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CalcState } from '@store/calc/types'
import { formatService } from '@services/calc/formats/formats.services'
import { sortService } from '@services/calc/sort/sort.services'
import { typeService } from '@services/calc/type/type.services'
import { widthPlywoodService } from '@services/calc/widthPlywood/widthPlywood.services'
import { coatingDensityService } from '@services/calc/coatingDensity/coatingDensity.services'
import {
  fetchAdd, fetchRemove, fetchUpdate, updateFeature,
} from '@utils/storeHelper'
import { CalcData } from '@models/Calc'
import { photosService } from '@services/calc/photos/photos.servise'

export const initialState: CalcState = {
  globalError: null,
  isLoading: false,
  isError: false,
  formats: null,
  sorts: null,
  types: null,
  widthPlywood: null,
  coatingDensity: null,
  photos: null,
}

export const fetchCalcParamsAsync = createAsyncThunk(
  'calc/fetchCalcParams',
  async (_, { rejectWithValue }) => {
    try {
      const formats = await formatService.getAll()
      const sorts = await sortService.getAll()
      const types = await typeService.getAll()
      const widthPlywood = await widthPlywoodService.getAll()
      const coatingDensity = await coatingDensityService.getAll()
      const photos = await photosService.getAll()

      const data = {
        formats: formats.data,
        sorts: sorts.data,
        types: types.data,
        widthPlywood: widthPlywood.data,
        coatingDensity: coatingDensity.data,
        photos: photos.data,
      }
      return data
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const fetchCalcRemoveParamsAsync = createAsyncThunk<any, { id: string, endpoint: number }>(
  'calc/fetchCalcRemoveParam',
  async (dataRemove, { rejectWithValue }) => {
    const { id, endpoint } = dataRemove
    try {
      return await fetchRemove(id, endpoint)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const fetchCalcUpdateParamsAsync = createAsyncThunk<any,
  { id: string, endpoint: number, values: CalcData }>(
    'calc/fetchCalcUpdateParams',
    async (dataUpdate, { rejectWithValue }) => {
      const { id, endpoint, values } = dataUpdate
      try {
        return await fetchUpdate(id, endpoint, values)
      } catch (err: any) {
        return rejectWithValue(err)
      }
    },
  )

export const fetchCalcAddParamsAsync = createAsyncThunk<any, CalcData>(
  'calc/fetchCalcAddParam',
  async (dataAdd, { rejectWithValue }) => {
    try {
      return await fetchAdd(dataAdd)
    } catch (err: any) {
      return rejectWithValue(err)
    }
  },
)

export const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    setGlobalError(state, action) {
      state.globalError = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCalcParamsAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCalcParamsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        state.sorts = action.payload.sorts
        state.types = action.payload.types
        state.widthPlywood = action.payload.widthPlywood
        state.formats = action.payload.formats
        state.coatingDensity = action.payload.coatingDensity
        state.photos = action.payload.photos
      })
      .addCase(fetchCalcParamsAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(fetchCalcRemoveParamsAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCalcRemoveParamsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        updateFeature(state, action)
      })
      .addCase(fetchCalcRemoveParamsAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(fetchCalcUpdateParamsAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCalcUpdateParamsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        updateFeature(state, action)
      })
      .addCase(fetchCalcUpdateParamsAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })

      .addCase(fetchCalcAddParamsAsync.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCalcAddParamsAsync.fulfilled, (state, action) => {
        state.isLoading = false
        updateFeature(state, action)
      })
      .addCase(fetchCalcAddParamsAsync.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
  },
})

export const { setGlobalError } = calcSlice.actions

export default calcSlice.reducer
