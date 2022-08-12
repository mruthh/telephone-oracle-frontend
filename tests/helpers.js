// @ts-check
const { test, expect } = require('@playwright/test')
const { firefox } = require('playwright')

/**
 * On the pregame view, enter a username
 * @param {Object} page 
 * @param {String} name - the desired name
 */
const enterName = async (page, name) => {
  await page.type('[data-test="name-input"]', name)
  await page.locator('button :has-text("submit")').click()

  await expect(page.locator('h2')).toHaveText(`Welcome ${name}!`)
}

/**
 * Type a question or answer and submit it
 * @param {Object} page 
 * @param {String} line - the question or answer
 */
const submitLine = async (page, line) => {
  await page.locator('textarea').type(line)
  await page.locator('button :has-text("Submit")').click()
}

/**
 * Given a player with an order property, get the next player in the order
 * @param {Object} currentPlayer
 * @param {Array} players 
 * @returns {Object}
 */
const getNextInOrder = (currentPlayer, players) => {
  const nextPlayerOrder = (currentPlayer.order + 1) % players.length
  return players.find(p => p.order === nextPlayerOrder)
}

module.exports = { enterName, submitLine, getNextInOrder }