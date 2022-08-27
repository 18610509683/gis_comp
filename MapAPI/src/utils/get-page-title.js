import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Map API'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
