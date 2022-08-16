export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("siteUser")
    ? JSON.parse(window.localStorage.getItem("siteUser"))
    : {}

const setUser = user =>
  window.localStorage.setItem("siteUser", JSON.stringify(user))


export const isLoggedIn = () => {
  const user = getUser()

  return !!user.username
}

export const logout = callback => {
  setUser({})
  callback()
}