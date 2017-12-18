import { Router } from 'express'

import users from './users'

const router = Router()

var admin = require('firebase-admin')
var serviceAccount = require('./bezbuslouarts-firebase-adminsdk-u4ya1-a576d8a80a.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://bezbuslouarts.firebaseio.com'
})

// Add USERS Routes
router.use(users)

export default router
