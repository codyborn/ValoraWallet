import express from 'express'
import promBundle from 'express-prom-bundle'
import * as admin from 'firebase-admin'
import {
  ENVIRONMENT,
  FIREBASE_DB,
  FIREBASE_PROJECT_ID,
  getFirebaseAdminCreds,
  PORT,
  VERSION,
  WEB3_PROVIDER_URL,
} from './config'
import { getLastBlockNotified, initializeDb as initializeFirebaseDb } from './firebase'
import { notificationPolling } from './polling'

console.info('Service starting with environment, version:', ENVIRONMENT, VERSION)
const START_TIME = Date.now()

// Metrics Middleware
const metricsMiddleware = promBundle({ includeMethod: true })

/**
 * Create and configure Express server
 * This is a necessary requirement for an app to run stably on App Engine
 */
console.info('Creating express server')
const app = express()
app.set('port', PORT)
app.set('env', ENVIRONMENT)
app.use(express.json())
app.use(metricsMiddleware)

// Primary app routes.
app.get('/', (req: any, res: any) => {
  res.send('Celo Notification Service. See /status for details.')
})
app.get('/status', (req: any, res: any) => {
  res.status(200).json({
    version: VERSION,
    lastBlockNotified: getLastBlockNotified(),
    serviceStartTime: new Date(START_TIME).toUTCString(),
    serviceRunDuration: Math.floor((Date.now() - START_TIME) / 60000) + ' minutes',
  })
})
app.get('/_ah/start', (req: any, res: any) => {
  res.status(200).end()
})
app.get('/_ah/stop', (req: any, res: any) => {
  notificationPolling.stop()
  res.status(200).end()
})

// Start Server
app.listen(PORT, () => {
  console.info(`App listening on port ${PORT} with env ${ENVIRONMENT}`)
})

/**
 * Initialize Firebase Admin SDK
 */
console.info('Initializing Firebase')
admin.initializeApp({
  credential: getFirebaseAdminCreds(admin),
  databaseURL: FIREBASE_DB,
  projectId: FIREBASE_PROJECT_ID,
})
initializeFirebaseDb()

/**
 * Start polling the blockscout api
 */
console.info('Starting Blockscout polling')
notificationPolling.run()

if (!WEB3_PROVIDER_URL) {
  console.info('No Web3 provider found. Skipping exchange polling.')
  console.info('Note that you will need to manually set contract addresses.')
}
