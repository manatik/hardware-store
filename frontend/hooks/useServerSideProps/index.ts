import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next'
import { categoryService } from '@services/category/category.service'

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
  console.log(cookie, dispatch)

  switch (pageName) {
    case ProjectPage.Categories: {
      try {
        const { categories } = await categoryService.categories()
        return { props: { categories } }
      } catch (e) {
        return { props: { categories: null } }
      }
    }

    // eslint-disable-next-line no-fallthrough
    default: break
  }

  return null as unknown as GetServerSidePropsResult<any>
}
