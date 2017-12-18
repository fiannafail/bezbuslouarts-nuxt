import { database } from './firebase-client-init.js'

export const baseUpdate = async (type, data, cb) => {
  await database.ref(data).on(type, snapshot => {
    const arr = Object.values(snapshot.val())
    console.log(arr)
    cb(arr)
  })
}
