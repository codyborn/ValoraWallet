import { RemoteFeatureFlags } from 'src/app/saga'
import i18n from 'src/i18n'
import { Screens } from 'src/navigator/Screens'
import Logger from 'src/utils/Logger'

const TAG = 'app/actions'

// https://facebook.github.io/react-native/docs/appstate
export enum AppState {
  Background = 'Background',
  Active = 'Active',
  Inactive = 'Inactive',
}

export enum Actions {
  SET_APP_STATE = 'APP/SET_APP_STATE',
  SET_LOGGED_IN = 'APP/SET_LOGGED_IN',
  SET_NUMBER_VERIFIED = 'APP/SET_NUMBER_VERIFIED',
  SET_LANGUAGE = 'APP/SET_LANGUAGE',
  OPEN_DEEP_LINK = 'APP/OPEN_DEEP_LINK',
  RESET_APP_OPENED_STATE = 'APP/RESET_APP_OPENED_STATE',
  SET_FEED_CACHE = 'APP/SET_FEED_CACHE',
  SET_ANALYTICS_ENABLED = 'APP/SET_ANALYTICS_ENABLED',
  SET_LOCK_WITH_PIN_ENABLED = 'APP/SET_LOCK_WITH_PIN_ENABLED',
  LOCK = 'APP/LOCK',
  UNLOCK = 'APP/UNLOCK',
  SET_SESSION_ID = 'SET_SESSION_ID',
  OPEN_URL = 'APP/OPEN_URL',
  MIN_APP_VERSION_DETERMINED = 'APP/MIN_APP_VERSION_DETERMINED',
  UPDATE_FEATURE_FLAGS = 'APP/UPDATE_FEATURE_FLAGS',
  TOGGLE_INVITE_MODAL = 'APP/TOGGLE_INVITE_MODAL',
  ACTIVE_SCREEN_CHANGED = 'APP/ACTIVE_SCREEN_CHANGED',
  APP_MOUNTED = 'APP/APP_MOUNTED',
  APP_UNMOUNTED = 'APP/APP_UNMOUNTED',
  VERIFICATION_MIGRATION_RAN = 'APP/VERIFICATION_MIGRATION_RAN',
  ANDROID_MOBILE_SERVICES_AVAILABILITY_CHECKED = 'APP/ANDROID_MOBILE_SERVICES_AVAILABILITY_CHECKED',
}

export interface SetAppState {
  type: Actions.SET_APP_STATE
  state: string
}

interface SetLoggedIn {
  type: Actions.SET_LOGGED_IN
  loggedIn: boolean
}

interface SetNumberVerifiedAction {
  type: Actions.SET_NUMBER_VERIFIED
  numberVerified: boolean
}

export interface SetLanguage {
  type: Actions.SET_LANGUAGE
  language: string
}

export interface OpenDeepLink {
  type: Actions.OPEN_DEEP_LINK
  deepLink: string
  isSecureOrigin: boolean
}

interface ResetAppOpenedState {
  type: Actions.RESET_APP_OPENED_STATE
}

interface SetAnalyticsEnabled {
  type: Actions.SET_ANALYTICS_ENABLED
  enabled: boolean
}

interface SetRequirePinOnAppOpen {
  type: Actions.SET_LOCK_WITH_PIN_ENABLED
  enabled: boolean
}

interface InviteModalAction {
  type: Actions.TOGGLE_INVITE_MODAL
  inviteModalVisible: boolean
}

interface ActiveScreenChangedAction {
  type: Actions.ACTIVE_SCREEN_CHANGED
  activeScreen: Screens
}

export interface Lock {
  type: Actions.LOCK
}

export interface Unlock {
  type: Actions.UNLOCK
}

export interface AppMounted {
  type: Actions.APP_MOUNTED
}

export interface AppUnmounted {
  type: Actions.APP_UNMOUNTED
}

export interface SetSessionId {
  type: Actions.SET_SESSION_ID
  sessionId: string
}

export interface OpenUrlAction {
  type: Actions.OPEN_URL
  url: string
  openExternal: boolean
  isSecureOrigin: boolean
}

interface MinAppVersionDeterminedAction {
  type: Actions.MIN_APP_VERSION_DETERMINED
  minVersion: string | null
}

export interface UpdateFeatureFlagsAction {
  type: Actions.UPDATE_FEATURE_FLAGS
  flags: RemoteFeatureFlags
}

export interface VerificationMigrationRanAction {
  type: Actions.VERIFICATION_MIGRATION_RAN
  mtwAddress: string | null
  isVerified: boolean
  now: number
}

export interface AndroidMobileServicesAvailabilityChecked {
  type: Actions.ANDROID_MOBILE_SERVICES_AVAILABILITY_CHECKED
  googleIsAvailable: boolean | undefined
  huaweiIsAvailable: boolean | undefined
}

export type ActionTypes =
  | SetAppState
  | SetLoggedIn
  | SetNumberVerifiedAction
  | ResetAppOpenedState
  | SetLanguage
  | OpenDeepLink
  | SetAnalyticsEnabled
  | SetRequirePinOnAppOpen
  | Lock
  | Unlock
  | SetSessionId
  | OpenUrlAction
  | MinAppVersionDeterminedAction
  | UpdateFeatureFlagsAction
  | InviteModalAction
  | ActiveScreenChangedAction
  | AppMounted
  | AppUnmounted
  | VerificationMigrationRanAction
  | AndroidMobileServicesAvailabilityChecked

export const setAppState = (state: string) => ({
  type: Actions.SET_APP_STATE,
  state,
})

export const setLoggedIn = (loggedIn: boolean) => ({
  type: Actions.SET_LOGGED_IN,
  loggedIn,
})

export const setNumberVerified = (numberVerified: boolean) => ({
  type: Actions.SET_NUMBER_VERIFIED,
  numberVerified,
})

export const setLanguage = (language: string) => {
  i18n
    .changeLanguage(language)
    .catch((reason: any) => Logger.error(TAG, 'Failed to change i18n language', reason))

  return {
    type: Actions.SET_LANGUAGE,
    language,
  }
}

export const openDeepLink = (deepLink: string, isSecureOrigin: boolean = false): OpenDeepLink => {
  return {
    type: Actions.OPEN_DEEP_LINK,
    deepLink,
    isSecureOrigin,
  }
}

export const resetAppOpenedState = () => ({
  type: Actions.RESET_APP_OPENED_STATE,
})

export const setAnalyticsEnabled = (enabled: boolean): SetAnalyticsEnabled => ({
  type: Actions.SET_ANALYTICS_ENABLED,
  enabled,
})

export const setRequirePinOnAppOpen = (enabled: boolean): SetRequirePinOnAppOpen => ({
  type: Actions.SET_LOCK_WITH_PIN_ENABLED,
  enabled,
})

export const appLock = (): Lock => ({
  type: Actions.LOCK,
})

export const appUnlock = (): Unlock => ({
  type: Actions.UNLOCK,
})

export const appMounted = (): AppMounted => ({
  type: Actions.APP_MOUNTED,
})

export const appUnmounted = (): AppUnmounted => ({
  type: Actions.APP_UNMOUNTED,
})

export const setSessionId = (sessionId: string) => ({
  type: Actions.SET_SESSION_ID,
  sessionId,
})

export const openUrl = (
  url: string,
  openExternal = false,
  isSecureOrigin = false
): OpenUrlAction => ({
  type: Actions.OPEN_URL,
  url,
  openExternal,
  isSecureOrigin,
})

export const minAppVersionDetermined = (
  minVersion: string | null
): MinAppVersionDeterminedAction => ({
  type: Actions.MIN_APP_VERSION_DETERMINED,
  minVersion,
})

export const updateFeatureFlags = (flags: RemoteFeatureFlags): UpdateFeatureFlagsAction => ({
  type: Actions.UPDATE_FEATURE_FLAGS,
  flags,
})

export const toggleInviteModal = (inviteModalVisible: boolean): InviteModalAction => ({
  type: Actions.TOGGLE_INVITE_MODAL,
  inviteModalVisible,
})

export const activeScreenChanged = (activeScreen: Screens): ActiveScreenChangedAction => ({
  type: Actions.ACTIVE_SCREEN_CHANGED,
  activeScreen,
})

export const verificationMigrationRan = (
  mtwAddress: string | null,
  isVerified: boolean
): VerificationMigrationRanAction => ({
  type: Actions.VERIFICATION_MIGRATION_RAN,
  mtwAddress,
  isVerified,
  now: Date.now(),
})

export const androidMobileServicesAvailabilityChecked = (
  googleIsAvailable: boolean | undefined,
  huaweiIsAvailable: boolean | undefined
): AndroidMobileServicesAvailabilityChecked => ({
  type: Actions.ANDROID_MOBILE_SERVICES_AVAILABILITY_CHECKED,
  googleIsAvailable,
  huaweiIsAvailable,
})
