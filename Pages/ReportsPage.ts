import { expect, Locator, Page } from '@playwright/test';
import { data } from '../Data';
import { selectorsOfReportPage } from '../PageSelectors/ReportsPage';

export class ReportsPage {
  readonly page: Page;
  readonly mainPage: Locator;
  readonly attackBlockWaf: Locator;
  readonly reportButton: Locator;
  readonly tableBody: Locator;
  readonly reportsSidebar: Locator;
  readonly summeryData: Locator;
  readonly assesmentStatus: Locator;
  readonly assesmentScore: Locator;
  readonly pdfReportButton: Locator;
  readonly downloadManagerButton: Locator;
  readonly downloadManagerMenu: Locator;
  readonly downloadedReport: Locator;
  readonly downloadButton: Locator;
  readonly cymulateCSVButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.mainPage = page.locator(selectorsOfReportPage.mainPage);
    this.attackBlockWaf = page.locator(selectorsOfReportPage.attackBlockWaf);
    this.reportButton = page.locator(selectorsOfReportPage.reportButton, { hasText: data.overview });
    this.tableBody = page.locator(selectorsOfReportPage.tableBody);
    this.reportsSidebar = page.locator(selectorsOfReportPage.reportSidebar);
    this.pdfReportButton = page.locator(selectorsOfReportPage.pdfButton);
    this.downloadManagerButton = page.locator(selectorsOfReportPage.downloadManagerButton);
    this.downloadManagerMenu = page.getByRole('menu');
    this.downloadedReport = page.locator(selectorsOfReportPage.downloadedReport);
    this.downloadButton = page.locator(selectorsOfReportPage.downloadButton);
    this.cymulateCSVButton = page.locator(selectorsOfReportPage.cymulateButton, { hasText: data.csvLabel });
  }

  async assertReportsTabLoaded() {
    await expect(this.mainPage).toBeVisible();
    await expect(this.attackBlockWaf).toBeVisible();
  }

  async getOverview() {
    await this.reportButton.click();
  }

  async getReportSummery() {
    await expect(this.tableBody).toBeVisible();
    await this.tableBody.locator(selectorsOfReportPage.tableRow).click();
    await expect(this.reportsSidebar).toBeVisible({ timeout: 5000 });
  }

  async assertReportSummeryDetailsVisible(score, status) {
    await expect(this.page.locator(selectorsOfReportPage.summeryData, { hasText: data.summeryDataUrl }).first()).toBeVisible();
    await expect(this.page.locator(selectorsOfReportPage.assesmentStatus, { hasText: status })).toBeVisible();
    await expect(this.page.locator(selectorsOfReportPage.assesmentScore, { hasText: score })).toBeVisible();
  }

  async downloadReport() {
    await expect(this.pdfReportButton).toBeVisible();
    await this.pdfReportButton.click();
    await expect(this.cymulateCSVButton).toBeVisible();
    await this.cymulateCSVButton.click();
    await expect(this.page.locator(selectorsOfReportPage.notificationPopup, { hasText: data.successMessage })).toBeVisible();
    await expect(this.downloadManagerButton).toBeVisible();
    await this.downloadManagerButton.click();
    await expect(this.downloadManagerMenu).toBeVisible({ timeout: 6000 });
    const report = this.downloadedReport.first();
    await expect(report).toBeVisible();
  }
}
