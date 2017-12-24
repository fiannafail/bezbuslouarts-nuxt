import { database } from './firebase-client-init.js'

export const baseUpdate = async (type, data, cb) => {
  let arr = []
  await database.ref(data).on(type, snapshot => {
    if (type === 'child_added') {
      arr.push(snapshot.val())
    } else {
      const arr = Object.values(snapshot.val())
      console.log(arr)
      cb(arr)
    }
  })
  console.log(arr)
  cb(arr)
}
export const baseRetrieve = async (type, cb) => {
  let array = []
  try {
    const data = await database.ref(type).once('value')
    data.forEach((child) => {
      const childData = child.val()
      array.push(childData)
    })
    return array
  } catch (err) {
    console.log(err)
  }
}
export const addElement = async (base, state) => {
  const newKey = database.ref().child(base).push().key
  const updates = {}
  state.key = newKey
  updates[newKey] = state
  await database.ref().child(base).update(updates)
}
