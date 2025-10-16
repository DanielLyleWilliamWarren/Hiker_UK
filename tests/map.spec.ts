import { expect, test } from '@playwright/test';

test.describe('Map Component with WMTS', () => {
  test('should render map tiles from WMTS', async ({ page }) => {
    await page.goto('http://localhost:4200');

    // Wait for the map to be ready
    await page.waitForSelector('.esri-view-root', { timeout: 10000 });

    // Check that network requests for tiles are made (WMTS requests)
    let tileRequestFound = false;
    page.on('response', (response) => {
      if (response.url().includes('/os-proxy') || response.url().includes('wmts')) {
        tileRequestFound = true;
      }
    });

    // Wait a bit for tile requests to be made
    await page.waitForTimeout(2000);

    expect(tileRequestFound).toBeTruthy();
  });

  test('should display map controls (zoom)', async ({ page }) => {
    await page.goto('http://localhost:4200');

    // Wait for the map to load
    await page.waitForSelector('.arcgis-zoom', { timeout: 10000 });

    // Verify zoom controls are visible
    const zoomWidget = page.locator('.arcgis-zoom');
    await expect(zoomWidget).toBeVisible();
  });

  test('should display map controls (locate)', async ({ page }) => {
    await page.goto('http://localhost:4200');

    // Wait for the map to load
    await page.waitForSelector('.esri-locate', { timeout: 10000 });

    // Verify zoom controls are visible
    const locateWidget = page.locator('.esri-locate');
    await expect(locateWidget).toBeVisible();
  });

  test('should display map controls (compass)', async ({ page }) => {
    await page.goto('http://localhost:4200');

    // Wait for the map to load
    await page.waitForSelector('.esri-compass', { timeout: 10000 });

    // Verify zoom controls are visible
    const compassWidget = page.locator('.esri-compass');
    await expect(compassWidget).toBeVisible();
  });

  test('should display attribution for WMTS layer', async ({ page }) => {
    await page.goto('http://localhost:4200');

    // Wait for the map to load
    await page.waitForSelector('.esri-attribution', { timeout: 10000 });

    // Verify attribution text is present
    const attribution = page.locator('.esri-attribution__sources');
    await expect(attribution).toContainText('Contains OS data © Crown copyright');
  });

  test('should handle map interactions', async ({ page }) => {
    await page.goto('http://localhost:4200');

    // Wait for the map to load
    await page.waitForSelector('.esri-view-root', { timeout: 10000 });

    // Get canvas element
    const canvas = page.locator('canvas').first();

    // Perform pan (drag) interaction
    await canvas.dragTo(canvas, {
      sourcePosition: { x: 400, y: 300 },
      targetPosition: { x: 300, y: 200 },
    });

    // Wait for map to update
    await page.waitForTimeout(1000);

    // Verify map is still visible after interaction
    await expect(canvas).toBeVisible();
  });
});
