import { Store } from '@store/store'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next'
import { usersService } from '@services/users/users.service'
import { refreshToken } from '@utils/refreshToken'
import { fetchUserInfoAsync } from '@store/app/appSlice'
import { redirectController } from '@utils/redirectController'
import { fetchCategoriesAsync } from '@store/category/categorySlice'
import { setCookieHeader } from '@services/http.service'
import { fetchCalcParamsAsync } from '@store/calc/calcSlice'
import {
  fetchFurnitureAsync,
  fetchFurnitureFeatureAsync,
  fetchFurnitureParamsAsync,
  fetchFurniturePhotosAsync,
  fetchPlywoodAsync,
} from '@store/products/productsSlice'
import { orderService } from '@services/order/order.service'
import { plywoodService } from '@services/products/plywood.service'
import { furnitureService } from '@services/products/furniture.service'

/**
 * Список шаблонов страниц
 */
export enum ProjectPage {
  Login,
  Register,
  Categories,
  Calc,
  Orders,
  Products,
  Users,
  AdminControl,

  Index,
  Contacts,
  Service,
  Basket,
  ProductsPage,
  ProductsPagePlywood,
  ProductsPageFurniture,
}

export const useServerSideProps = async (
  pageName: ProjectPage,
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  store: Store,
): Promise<GetServerSidePropsResult<any>> => {
  const { dispatch, getState } = store
  const { query, req } = context
  const { headers } = req
  const cookie = headers.cookie ? headers.cookie : ''

  setCookieHeader(cookie)

  await dispatch(fetchUserInfoAsync(cookie))
  await dispatch(fetchCalcParamsAsync())
  await dispatch(fetchCategoriesAsync())

  if (!getState().app.userInfo?.isAdmin) {
    const redirect = redirectController(pageName)
    if (redirect) return redirect
  }

  switch (pageName) {
    case ProjectPage.Categories: {
      try {
        const { category } = getState()
        return { props: { categories: category.items } }
      } catch (e: any) {
        if (e.statusCode === 401) {
          await refreshToken(e.statusCode, cookie)
        }

        return { props: { categories: null } }
      }
    }

    case ProjectPage.Calc: {
      await dispatch(fetchFurnitureFeatureAsync())
      await dispatch(fetchFurniturePhotosAsync())
      await dispatch(fetchFurnitureParamsAsync())
      break
    }

    case ProjectPage.Users: {
      try {
        const { users } = await usersService.users(cookie)
        return { props: { users } }
      } catch (e: any) {
        if (e.statusCode === 401) {
          await refreshToken(e.statusCode, cookie)
        }

        return { props: { users: null } }
      }
    }

    case ProjectPage.Products: {
      await dispatch(fetchPlywoodAsync())
      await dispatch(fetchFurnitureAsync())
      await dispatch(fetchFurnitureFeatureAsync())
      await dispatch(fetchFurniturePhotosAsync())
      await dispatch(fetchFurnitureParamsAsync())
      break
    }

    case ProjectPage.ProductsPage: {
      await dispatch(fetchPlywoodAsync())
      await dispatch(fetchFurnitureAsync())
      break
    }

    case ProjectPage.ProductsPagePlywood: {
      try {
        const { id } = query
        const { product } = await plywoodService.plywood(id as string)
        return { props: { product } }
      } catch (e) {
        return { props: { product: null } }
      }
    }

    case ProjectPage.Orders: {
      try {
        const { data } = await orderService.orderAll()
        return { props: { orders: data } }
      } catch (e) {
        return { props: { product: null } }
      }
    }

    case ProjectPage.ProductsPageFurniture: {
      try {
        const { id } = query
        const { product } = await furnitureService.furniture(id as string)
        return { props: { product } }
      } catch (e) {
        return { props: { product: null } }
      }
    }

    // eslint-disable-next-line no-fallthrough
    default: break
  }

  return null as unknown as GetServerSidePropsResult<any>
}
