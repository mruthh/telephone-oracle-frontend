// @ts-check
const { test, expect } = require('@playwright/test')

test('can start a game', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Telephone Oracle/)

  const startButton = page.locator('text=Start a new game')
  await startButton.click()

  await expect(page).toHaveURL(/.*\?game=/)
  await expect(page.locator('h2')).toHaveText('Please enter your name')
})
