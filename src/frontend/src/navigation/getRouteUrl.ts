import { RouteName } from '@/routes'
import { getRoutePath } from './getRoutePath'

export const getRouteUrl = (
  routeName: RouteName,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
) => {
  const to = getRoutePath(routeName, params)
  // Twake override: update link redirection to take into account bridge URL
  // document.referrer does not contains #/bridge
  // window.parent.location not accessible due to cross origin
  if (import.meta.env.VITE_BRIDGE_TARGET_ORIGIN && import.meta.env.VITE_BRIDGE_TARGET_ORIGIN_PREFIX) {
    return `${import.meta.env.VITE_BRIDGE_TARGET_ORIGIN}${import.meta.env.VITE_BRIDGE_TARGET_ORIGIN_PREFIX}${to}`
  }

  return `${window.location.origin}${to}`
}
