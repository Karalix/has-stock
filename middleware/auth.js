export default async function ({store, redirect, $appwrite}) {
  if (store.state.loggedIn) {
    return
  }
  try {
    await $appwrite.account.listSessions()
    store.commit('setLoggedIn', true)
  } catch (error) {
    console.log(error)
    store.commit('setLoggedIn', false)
    redirect('/login')
  }
}
