import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { quickLinks } from '~/constants/links'

export const usePageTitle = (baseTitle: string = 'Розклади ЦПТО') => {
  const location = useLocation()

  useEffect(() => {
    const currentLink = quickLinks.find((link) => link.link === location.pathname)
    if (currentLink) {
      document.title = `${currentLink.title} | ${baseTitle}`
    } else {
      document.title = baseTitle
    }
  }, [location.pathname, baseTitle])
}
