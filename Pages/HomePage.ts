import { expect, Locator, Page } from '@playwright/test';
import { selectorsOfHomePage } from '../PageSelectors/HomePage';

export class HomePage {
  readonly page: Page;
  readonly sideNavbar: Locator;
  readonly topNavbar: Locator;
  readonly mainDashboard: Locator;
  readonly reportsTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sideNavbar = page.locator(selectorsOfHomePage.sideBar);
    this.topNavbar = page.locator(selectorsOfHomePage.topNavBar);
    this.mainDashboard = page.locator(selectorsOfHomePage.mainDashboard);
    this.reportsTab = page.locator(selectorsOfHomePage.reportsTabButton);
  }

  async assertHomePageLoaded() {
    await expect(this.sideNavbar).toBeVisible();
    await expect(this.topNavbar).toBeVisible();
    await expect(this.mainDashboard).toBeVisible();
  }

  async switchToReportTab() {
    await expect(this.reportsTab).toBeVisible();
    await this.reportsTab.click();
  }
}
