const getters = {
  routes: (state: any) => state.app.routes,
  routeToMeta: (state: any) => state.app.routeToMeta,
  language: (state: any) => state.app.language,
  access_token: (state: any) => state.user.access_token
}
export default getters