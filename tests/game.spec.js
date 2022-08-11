// @ts-check
const { test, expect } = require('@playwright/test')
const { firefox } = require('playwright')
const { enterName } = require('./helpers')

let gameUrl
const host = {}
const player2 = { name: 'Player 2' }
const player3 = { name: 'Player 3' }

test.beforeEach(async () => {
  // Host opens the game and enters their name
  // TODO: extract this into a helper function
  const browser = await firefox.launch()
  const page = await browser.newPage()
  await page.goto('localhost:8080')

  await page.locator('text=Start a new game').click()

  await expect(page).toHaveURL(/.*\?game=/)
  gameUrl = page.url()
  host.page = page

  await enterName(page, 'Host')
  
  // 2 other players go to the game url and enter their own names
  // Host starts the game

  for (const player of [player2, player3]) {
    const page = await browser.newPage()
    player.page = page

    await page.goto(gameUrl)
    await enterName(page, player.name)
  }

  await host.page.locator('button :has-text("Start game")').click()
})

test('can pass a question or answer to the next player', async () => {
  await host.page.locator('textarea').type('Host question?')
  await host.page.locator('button :has-text("Submit")').click()
  await expect(host.page.locator('h2')).toContainText('Waiting')

  await player2.page.locator('textarea').type('Player2 question?')
  await player2.page.locator('button :has-text("Submit")').click()

  await expect(player2.page.locator('h2')).toHaveText('Question: Host question?')
})