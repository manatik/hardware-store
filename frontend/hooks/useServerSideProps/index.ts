import { ParsedUrlQuery } from 'querystring'
import { GetServerSidePropsContext, GetServerSidePropsResult, PreviewData } from 'next'

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

  return null as unknown as GetServerSidePropsResult<any>
}
