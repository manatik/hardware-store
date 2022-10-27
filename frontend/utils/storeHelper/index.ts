import { coatingDensityService } from '@services/calc/coatingDensity/coatingDensity.services'
import { formatService } from '@services/calc/formats/formats.services'
import { sortService } from '@services/calc/sort/sort.services'
import { widthPlywoodService } from '@services/calc/widthPlywood/widthPlywood.services'
import { typeService } from '@services/calc/type/type.services'
import { CalcData } from '@models/Calc'
import { photosService } from '@services/calc/photos/photos.servise'

export const updateFeature = (state: any, action: any) => {
  switch (action.payload.endpoint) {
    case 1: {
      state.coatingDensity = action.payload.data
      break
    }
    case 2: {
      state.formats = action.payload.data
      break
    }
    case 3: {
      state.sorts = action.payload.data
      break
    }
    case 4: {
      state.widthPlywood = action.payload.data
      break
    }
    case 5: {
      state.types = action.payload.data
      break
    }
    case 6: {
      state.photos = action.payload.data
      break
    }
    default: break
  }
}

export const fetchUpdate = async (id: string, endpoint: number, values: CalcData) => {
  switch (endpoint) {
    case 1: {
      await coatingDensityService.update(id, values)
      const { data } = await coatingDensityService.getAll()
      return { data, endpoint }
    }
    case 2: {
      await formatService.update(id, values)
      const { data } = await formatService.getAll()
      return { data, endpoint }
    }
    case 3: {
      await sortService.update(id, values)
      const { data } = await sortService.getAll()
      return { data, endpoint }
    }
    case 4: {
      await widthPlywoodService.update(id, values)
      const { data } = await widthPlywoodService.getAll()
      return { data, endpoint }
    }
    case 5: {
      await typeService.update(id, values)
      const { data } = await typeService.getAll()
      return { data, endpoint }
    }
    default: return null
  }
}

export const fetchRemove = async (id: string, endpoint: number) => {
  switch (endpoint) {
    case 1: {
      await coatingDensityService.remove(id)
      const { data } = await coatingDensityService.getAll()
      return { data, endpoint }
    }
    case 2: {
      await formatService.remove(id)
      const { data } = await formatService.getAll()
      return { data, endpoint }
    }
    case 3: {
      await sortService.remove(id)
      const { data } = await sortService.getAll()
      return { data, endpoint }
    }
    case 4: {
      await widthPlywoodService.remove(id)
      const { data } = await widthPlywoodService.getAll()
      return { data, endpoint }
    }
    case 5: {
      await typeService.remove(id)
      const { data } = await typeService.getAll()
      return { data, endpoint }
    }
    case 6: {
      await photosService.remove(id)
      const { data } = await photosService.getAll()
      return { data, endpoint }
    }
    default: return null
  }
}

export const fetchAdd = async (values: CalcData) => {
  switch (values.id) {
    case 1: {
      await coatingDensityService.add(values)
      const { data } = await coatingDensityService.getAll()
      return { data, endpoint: values.id }
    }
    case 2: {
      await formatService.add(values)
      const { data } = await formatService.getAll()
      return { data, endpoint: values.id }
    }
    case 3: {
      await sortService.add(values)
      const { data } = await sortService.getAll()
      return { data, endpoint: values.id }
    }
    case 4: {
      await widthPlywoodService.add(values)
      const { data } = await widthPlywoodService.getAll()
      return { data, endpoint: values.id }
    }
    case 5: {
      await typeService.add(values)
      const { data } = await typeService.getAll()
      return { data, endpoint: values.id }
    }
    default: return null
  }
}
