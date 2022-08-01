// @ts-check
const { test, expect } = require('@playwright/test')
const { firefox } = require('playwright')


let gameUrl

test.beforeAll(async () => {
  const browser = await firefox.launch()
  const page = await browser.newPage()
  await page.goto('localhost:8080')

  const startButton = page.locator('text=Start a new game')
  await startButton.click()

  await expect(page).toHaveURL(/.*\?game=/)
  gameUrl = page.url()

  await browser.close()
})

test('can enter a username', async ({ page }) => {
  await page.goto(gameUrl)

  await page.type('label :has-text("please enter your name") > input', 'My name')
  await page.locator('button :has-text("submit")').click()

  await expect(page.locator('h2')).toHaveText('Welcome My name!')
  
})