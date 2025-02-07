const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Blogs app', () => {
  beforeEach(async ({ page }) => {
    await page.post('http://localhost:3003/api/testing/reset')
    await page.post('http://localhost:3003/api/users', {
      data: {
        name: 'Daniel',
        username: 'Neohugh',
        password: 'test123123',
      },
    })

    await page.goto('http://localhost:5173')
  })

  // test('front page can be opened', async ({ page }) => {
  //   const locator = await page.getByText('blogs')
  //   await expect(locator).toBeVisible()
  //   await expect(
  //     page.getByText(
  //       'Blog app, Department of Computer Science, University of Helsinki 2025'
  //     )
  //   ).toBeVisible()
  // })

  // test('should login form can be opened', async ({ page }) => {
  //   await page.getByRole('button', { name: 'Login' }).click()
  //   await page.getByTestId('username').fill('Test')
  //   await page.getByTestId('password').fill('test123')
  //   await page.getByRole('button', { name: 'Login' }).click()
  //   await expect(page.getByText('Login successful')).toBeVisible()
  // })

  describe('when logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('button', { name: 'Login' }).click()
      await page.getByTestId('username').fill('Test')
      await page.getByTestId('password').fill('test123')
      await page.getByRole('button', { name: 'Login' }).click()
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create' }).click()
      const textBoxes = await page.getByRole('textbox').all()
      await textBoxes[0].fill('Titulo')
      await textBoxes[1].fill('Author')
      await textBoxes[2].fill('url.com')
      await page.getByRole('button', { name: 'create' }).click()
      // aparece error adding blog
    })
  })
})
