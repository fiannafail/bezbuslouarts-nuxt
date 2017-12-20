import { database } from './firebase-client-init.js'

<<<<<<< HEAD
export const baseUpdate = (type, data, cb) => {
  database.ref(data).on(type, snapshot => {
=======
export const baseUpdate = async (type, data, cb) => {
  await database.ref(data).on(type, snapshot => {
>>>>>>> 9d8d0faaadee06844b80e800f7a821e7be2feb5e
    const arr = Object.values(snapshot.val())
    console.log(arr)
    cb(arr)
  })
}
