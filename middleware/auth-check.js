export default function ({ store, redirect, error }) {
  if (!store.state.user) {
    console.log('login', store.state.user)
    return redirect('/login')
  }
}
