const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        username: 'Test',
        name: 'Playwright',
        password: 'test123',
      },
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click()
    await expect(page.getByTestId('form')).toBeVisible()
  })

  describe('Login Tests', () => {
    test('Login Successfully', async ({ page }) => {
      loginWith(page, 'Test', 'test123')
      await expect(page.getByText('Login successful')).toBeVisible()
    })

    test('Login Wrong', async ({ page }) => {
      loginWith(page, 'Test', 'wrongpassword')
      await expect(page.getByText('Invalid username or password')).toBeVisible()
    })
  })
})
