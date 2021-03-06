import { quote, sleep } from '../utils/utils'
import { dismissBanners } from '../utils/banners'
import { reloadReactNative, launchApp } from '../utils/retries'

export default HandleDeepLinkSend = () => {
  const PAY_URL = quote(
    'celo://wallet/pay?address=0x0b784e1cf121a2d9e914ae8bfe3090af0882f229&displayName=Crypto4BlackLives&e164PhoneNumber=%2B14046251530'
  )

  it('Launch app cold with url', async () => {
    await device.terminateApp()
    await sleep(5000)
    await launchApp({ url: PAY_URL, newInstance: true })
    await sleep(5000)
    await dismissBanners()
    // Arrived at SendAmount screen
    await expect(element(by.id('Review'))).toBeVisible()
  })

  it.skip('Send url while app is in background, back pressed', async () => {
    // on android there are two ways to "exit" the app
    // 1. home button
    // 2. back button
    // there is a slight but important difference because with the back button
    // the activity gets destroyed and listeners go away which can cause subtle bugs
    await reloadReactNative()
    if (device.getPlatform() === 'android') {
      await device.pressBack()
    } else {
      await device.sendToHome()
    }
    await launchApp({ url: PAY_URL, newInstance: false })
    await expect(element(by.id('Review'))).toBeVisible()
  })

  // skip until we can have a firebase build on ci
  it.skip('Send url while app is in foreground', async () => {
    await device.openURL({ url: PAY_URL })
    await expect(element(by.id('Review'))).toBeVisible()
  })

  // skip until we can have a firebase build on ci
  it.skip('Send url while app is in background, process running', async () => {
    await device.sendToHome()
    await launchApp({ url: PAY_URL, newInstance: false })
    await expect(element(by.id('Review'))).toBeVisible()
  })
}
