import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next'
import { categoryService } from '@services/category/category.service'
import { usersService } from '@services/users/users.service'
import { refreshToken } from '@utils/refreshToken'

/**
 * Список шаблонов страниц
 */
export enum ProjectPage {
  Login,
  Register,
  Categories,
  Feature,
  Orders,
  Products,
  Users,
  AdminControl,
  Index,
}

export const useServerSideProps = async (
  pageName: ProjectPage,
  context: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>,
  dispatch: any,
): Promise<GetServerSidePropsResult<any>> => {
  const { headers } = context.req
  const cookie = headers.cookie ? headers.cookie : ''
  // console.log(cookie, dispatch)

  switch (pageName) {
    case ProjectPage.Categories: {
      try {
        const { categories } = await categoryService.categories()
        return { props: { categories } }
      } catch (e: any) {
        if (e.statusCode === 401) {
          await refreshToken(e.statusCode, cookie)
        }

        return { props: { categories: null } }
      }
    }

    case ProjectPage.Users: {
      try {
        const { users } = await usersService.users()
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
