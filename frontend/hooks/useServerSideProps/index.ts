import { Store } from '@store/store'
import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next'
import { usersService } from '@services/users/users.service'
import { refreshToken } from '@utils/refreshToken'
import { fetchUserInfoAsync } from '@store/app/appSlice'
import { redirectController } from '@utils/redirectController'
import { fetchCategoriesAsync } from '@store/category/categorySlice'
import { setCookieHeader } from '@services/http.service'

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
  ProductsPage,
}

export const useServerSideProps = async (
  pageName: ProjectPage,
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  store: Store,
): Promise<GetServerSidePropsResult<any>> => {
  const { dispatch, getState } = store
  const { headers } = context.req
  const cookie = headers.cookie ? headers.cookie : ''

  setCookieHeader(cookie)

  await dispatch(fetchUserInfoAsync(cookie))

  if (!getState().app.userInfo?.isAdmin) {
    const redirect = redirectController(pageName)

    if (redirect) return redirect
  }

  await dispatch(fetchCategoriesAsync())

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
      try {
        const { format } = getState()
        return { props: { formatPlywood: format.items } }
      } catch (e: any) {
        if (e.statusCode === 401) {
          await refreshToken(e.statusCode, cookie)
        }

        return { props: { formatPlywood: null } }
      }
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

    // eslint-disable-next-line no-fallthrough
    default: break
  }

  return null as unknown as GetServerSidePropsResult<any>
}
