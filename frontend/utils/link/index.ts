export enum LinkTarget {
  self,
  blank,
}

export interface PropsLinkData {
  title: string
  link: string
  target: LinkTarget
  additional?: { [field: string]: string }
}

export const LinkData = (
  title: string,
  link: string,
  target: LinkTarget,
  additional?: { [field: string]: string },
) => {
  return {
    title,
    link,
    target,
    additional,
  }
}
