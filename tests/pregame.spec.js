// @ts-check
const { test, expect } = require('@playwright/test')
const { firefox } = require('playwright')

const { enterName } = require('./helpers')


let gameUrl
let hostPage

test.beforeAll(async () => {
  const browser1 = await firefox.launch()
  const page = await browser1.newPage()
  await page.goto('localhost:8080')

  const startButton = page.locator('text=Start a new game')
  await startButton.click()

  await expect(page).toHaveURL(/.*\?game=/)
  gameUrl = page.url()
  hostPage = page
})

test('can enter a username', async ({ browser }) => {
  const newContext = await browser.newContext()
  const page = await newContext.newPage()

  await page.goto(gameUrl)

  await page.type('[data-test="name-input"]', 'My name')
  await page.locator('button :has-text("submit")').click()

  await expect(page.locator('h2')).toHaveText('Welcome My name!')
})

test('host can start the game', async () => {
  await hostPage.locator('button :has-text("Start game")').click()
  await expect(hostPage.locator('h2')).toHaveText('Ask the oracle a question')
})