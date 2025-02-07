const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/tests/reset')
    await request.post('/api/users', {
      data: {
        username: 'Test',
        name: 'Playwright',
        password: 'test123',
      },
    })

    await page.goto('/')
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

  describe('When Logged In', () => {
    beforeEach(async ({ page }) => {
      loginWith(page, 'Test', 'test123')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'Create' }).click()
      await page.getByTestId('title').fill('Vientos y Verdad')
      await page.getByTestId('author').fill('Brandon Sanderson')
      await page.getByTestId('url').fill('cosmere.es')
      await page.getByRole('button', { name: 'Create' }).click()
    })
  })
})
