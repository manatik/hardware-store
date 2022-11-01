const scrollToAnchor = (offset?: number) => {
  const { hash } = window.location
  if (hash) {
    const element = document?.querySelector(hash)
    if (element) {
      element.scrollIntoView()
      const url = window.location.href.split('#')[0]

      if (offset) {
        window.scrollBy(0, offset)
      }

      setTimeout(() => {
        if (!url) return
        // eslint-disable-next-line no-restricted-globals
        history.replaceState({}, '', url)
      }, 1000)
    }
  }
}

export default scrollToAnchor
