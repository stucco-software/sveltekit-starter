export let clientSession = $state({
  data: null
})

export const getSession = () => {
  return clientSession.data
}

export const setSession = (user) => {
  clientSession.data = user
  return clientSession
}