import { test, expect } from '@playwright/test'

test('should navigate to the about page', async ({ page }) => {
  // Start from the index page (the baseURL is set via the webServer in the playwright.config.ts)
  await page.goto('http://localhost:3000/')
  // Find an element with the text 'Search' and click on it
  await page.click('text=Search')
  // The new url should be "/search" (baseURL is used there)
  await expect(page).toHaveURL('http://localhost:3000/search')
  // The new page should contain an h1 with "Search"
  await expect(page.locator('h1')).toContainText('Search')
})
