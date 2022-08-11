// @ts-check
const { test, expect } = require('@playwright/test')
const { firefox } = require('playwright')

const enterName = async (page, name) => {
  await page.type('[data-test="name-input"]', name)
  await page.locator('button :has-text("submit")').click()

  await expect(page.locator('h2')).toHaveText(`Welcome ${name}!`)
}

module.exports = { enterName }