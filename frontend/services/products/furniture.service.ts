import { ApiEndpoints, baseApiEndpoints } from '@api'
import httpService from '@services/http.service'
import {
  FurnitureFeatureModal, FurnitureModal, PhotosModal,
} from '@models/Products'

const furnitureEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.ProductFurniture}`
const furnitureFeatureEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.ProductFeature}`
const furnitureParamsEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.ProductParams}`
const furniturePhotosEndpoint = `${baseApiEndpoints.baseEndpoint}${ApiEndpoints.ProductFeaturePhoto}`

export const furnitureService = {
  furnitureAdd: async (furnitureData: any) => {
    const { data } = await httpService.post(furnitureEndpoint, furnitureData)
    return data
  },
  furnitureAll: async () => {
    const { data } = await httpService.get<FurnitureModal>(furnitureEndpoint)
    return data
  },
  furniture: async (id: string) => {
    const { data } = await httpService.get(`${furnitureEndpoint}/${id}`)
    return data
  },
  furnitureUpdate: async (furnitureData :any) => {
    const { data } = await httpService.patch(`${furnitureEndpoint}/${furnitureData.id}`, furnitureData)
    return data
  },
  furnitureRemove: async (id: string) => {
    const { data } = await httpService.delete(`${furnitureEndpoint}/${id}?hard=true`)
    return data
  },

  furnitureFeatureAdd: async (featureData: any) => {
    const { data } = await httpService.post(furnitureFeatureEndpoint, featureData)
    return data
  },
  furnitureFeatureAll: async () => {
    const { data } = await httpService.get<FurnitureFeatureModal>(furnitureFeatureEndpoint)
    return data
  },
  furnitureFeature: async (id: string) => {
    const { data } = await httpService.get(`${furnitureFeatureEndpoint}/${id}`)
    return data
  },
  furnitureFeatureUpdate: async (featureData: any) => {
    const { data } = await httpService.patch(`${furnitureFeatureEndpoint}/${featureData.id}`, featureData)
    return data
  },
  furnitureFeatureRemove: async (id: string) => {
    const { data } = await httpService.delete(`${furnitureFeatureEndpoint}/${id}`)
    return data
  },

  furnitureParamsAdd: async (featureData: any) => {
    const { data } = await httpService.post(furnitureParamsEndpoint, featureData)
    return data
  },
  furnitureParamsAll: async () => {
    const { data } = await httpService.get<FurnitureFeatureModal>(furnitureParamsEndpoint)
    return data
  },
  furnitureParams: async (id: string) => {
    const { data } = await httpService.get(`${furnitureParamsEndpoint}/${id}`)
    return data
  },
  furnitureParamsUpdate: async (featureData: any) => {
    const { data } = await httpService.patch(`${furnitureParamsEndpoint}/${featureData.id}`, featureData)
    return data
  },
  furnitureParamsRemove: async (id: string) => {
    const { data } = await httpService.delete(`${furnitureParamsEndpoint}/${id}`)
    return data
  },

  furniturePhotosAdd: async (photoData: any) => {
    const { data } = await httpService.post(furniturePhotosEndpoint, photoData)
    return data
  },
  furniturePhotosAll: async () => {
    const { data } = await httpService.get<PhotosModal>(furniturePhotosEndpoint)
    return data
  },
  furniturePhotos: async (id: string) => {
    const { data } = await httpService.get(`${furniturePhotosEndpoint}/${id}`)
    return data
  },
  furniturePhotosUpdate: async (photoData :any) => {
    const { data } = await httpService.patch(`${furniturePhotosEndpoint}/${photoData.id}`, photoData)
    return data
  },
  furniturePhotosRemove: async (id: string) => {
    const { data } = await httpService.delete(`${furniturePhotosEndpoint}/${id}`)
    return data
  },
}
