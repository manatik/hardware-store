import { ProjectPage } from '@hooks'

const returnRedirect = (): any => {
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

export const redirectController = (page: ProjectPage) => {
  switch (page) {
    case ProjectPage.Users: {
      return returnRedirect()
    }

    case ProjectPage.AdminControl: {
      return returnRedirect()
    }

    case ProjectPage.Products: {
      return returnRedirect()
    }

    case ProjectPage.Orders: {
      return returnRedirect()
    }

    case ProjectPage.Categories: {
      return returnRedirect()
    }

    // eslint-disable-next-line no-fallthrough
    default: break
  }

  return null
}
