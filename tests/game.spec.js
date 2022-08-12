// @ts-check
const { test, expect } = require('@playwright/test')
const { chromium } = require('playwright')
const { enterName, submitLine, getNextInOrder } = require('./helpers')

let gameUrl
const host = { name: 'Host' }
const player2 = { name: 'Player 2' }
const player3 = { name: 'Player 3' }
const players = [host, player2, player3]

test.beforeEach(async () => {
  // Host opens the game and enters their name
  // TODO: extract this into a helper function
  const browser = await chromium.launch()
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
  await expect(host.page.locator('[data-test=playerName]')).toHaveCount(3)

  // Since the orders aren't guaranteed, we have to pull them from the DOM
  for (let i = 0; i < 3; i++) {
    const name = await host.page.locator('[data-test=playerName]').nth(i).innerText()
    const player = players.find(p => p.name === name)
    if (player) player.order = i
  }
})

test('can pass a question or answer to the next player', async () => {
  await submitLine(host.page, `${host.name} question?`)
  await expect(host.page.locator('h2')).toContainText('Waiting')

  const nextPlayer = getNextInOrder(host, players)
  await submitLine(nextPlayer.page, `${nextPlayer.name} question?`)
  await expect(nextPlayer.page.locator('h2'))
    .toHaveText(`Question: ${host.name} question?`)
})

test('the host can delete a player', async () => {
  // figure out who the host is passing to
  const playerToDelete = getNextInOrder(host, players)

  await expect(host.page.locator('[data-test="player"]')).toHaveCount(3)
  await host.page.locator('[data-test="deletePlayer"]').nth(playerToDelete.order).click()
  await expect(host.page.locator('[data-test="player"]')).toHaveCount(2)
})

test('the deleted player\'s questions go to the next active player', async () => {
  for (const { name, page } of players) {
    await submitLine(page, `${name} question?`)
  }

  const playerToDelete = getNextInOrder(host, players)
  await host.page.locator('[data-test="deletePlayer"]').nth(playerToDelete.order).click()
  
  const playerNotDeleted = getNextInOrder(playerToDelete, players)
  await expect(playerNotDeleted.page.locator('h2')).toHaveText('Question: Host question?')
})