
export const fetchRoutes = async () => await fetch('http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=sf-muni')
export const fetchRouteTag = async (routeTag) => await fetch(`http://webservices.nextbus.com/service/publicJSONFeed?command=routeConfig&a=sf-muni&r=${routeTag}`)
