import dotenv from 'dotenv'
import i18next from 'i18next'

// Load environment variables from .env file
dotenv.config()

export function getFirebaseAdminCreds(admin: any) {
  if (ENVIRONMENT === 'local') {
    try {
      const serviceAccount = require('../config/serviceAccountKey.json')
      return admin.credential.cert(serviceAccount)
    } catch (error) {
      console.error(
        'Error: Could not initialize admin credentials. Is serviceAccountKey.json missing?',
        error
      )
    }
  } else {
    try {
      return admin.credential.applicationDefault()
    } catch (error) {
      console.error('Error: Could not retrieve default app creds', error)
    }
  }
}

export const VERSION = process.env.GAE_VERSION
export const ENVIRONMENT = process.env.ENVIRONMENT
export const PORT = Number(process.env.PORT) || 8080
export const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID
export const FIREBASE_DB = `https://${FIREBASE_PROJECT_ID}.firebaseio.com`
const ENFORCE_NOTIFICATIONS = process.env.ENFORCE_LOCAL_NOTIFICATIONS === 'true'
export const NOTIFICATIONS_DISABLED = !ENFORCE_NOTIFICATIONS && ENVIRONMENT === 'local'
export const BLOCKSCOUT_API = process.env.BLOCKSCOUT_API
export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE
export const POLLING_INTERVAL = Number(process.env.POLLING_INTERVAL) || 1000
export const INVITES_POLLING_INTERVAL = Number(process.env.INVITES_POLLING_INTERVAL) || 10000
export const NOTIFICATIONS_TTL_MS = Number(process.env.NOTIFICATION_TTL_MS) || 3600 * 1000 * 24 * 7 // 1 week in milliseconds
export const SEGMENT_API_KEY = process.env.SEGMENT_API_KEY

export const WEB3_PROVIDER_URL = process.env.WEB3_PROVIDER_URL || 'UNDEFINED'

export enum NotificationTypes {
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  PAYMENT_REQUESTED = 'PAYMENT_REQUESTED',
  INVITE_REDEEMED = 'INVITE_REDEEMED',
}

const en = require('../locales/en.json')
const es = require('../locales/es.json')

i18next
  .init({
    lng: DEFAULT_LOCALE,
    resources: {
      en: {
        translation: en,
      },
      es: {
        translation: es,
      },
    },
    fallbackLng: {
      default: ['en'],
    },
  })
  .catch((reason: any) => console.error('Config', 'Failed init i18n', reason))
