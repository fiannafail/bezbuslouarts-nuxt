import { database } from './firebase-client-init.js'

export const baseElementUpdate = async (type, ref, data) => {
  try {
    await database.ref(type + '/' + ref + '/').update(data)
  } catch (err) {
    console.log(err)
  }
}
export const baseUpdate = async (type, data, cb) => {
  let arr = []
  await database.ref(data).on(type, snapshot => {
    if (type === 'child_added') {
      arr.push(snapshot.val())
      cb(arr)
    } else {
      const arr = Object.values(snapshot.val())
      console.log(arr)
      cb(arr)
    }
  })
}
export const baseRetrieve = async (type, cb) => {
  let array = []
  try {
    if (type === 'Texts') {
      const data = await database.ref(type).once('value')
      console.log(data.val())
      return data.val()
    } else {
      const data = await database.ref(type).once('value')
      data.forEach((child) => {
        const childData = child.val()
        array.push(childData)
      })
      return array
    }
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

export class Section {
  constructor (name, item, removed, array) {
    this.name = name
    this.array = array
    this.item = item
    this.removed = removed
  }
  async add () {
    const newKey = database.ref().child(this.name).push().key
    const updates = {}
    this.item.key = newKey
    updates[newKey] = this.item
    await database.ref().child(this.name).update(updates)
  }
  async remove (item, index) {
    this.removed.push(index)
    //  database.ref('Soundtracks').child(item.key).remove()
    return this.removed
  }
  showRemovedItems (index) {
    for (let i = 0; i < this.removed.length; i++) {
      if (this.removed[i] === index) {
        return true
      }
    }
  }
}
