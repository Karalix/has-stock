export const state = () => ({
  loggedIn: false,
})

export const mutations = {
  setLoggedIn(state, loggedIn) {
    state.loggedIn = loggedIn
  },
}