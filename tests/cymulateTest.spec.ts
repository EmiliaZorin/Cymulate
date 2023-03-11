import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { HomePage } from '../Pages/HomePage';
import { ReportsPage } from '../Pages/ReportsPage';
import { data } from '../Data';
import { username, password, url } from '../playwright.config';
console.log(username, password, url);

const fs = require('fs');

test.describe('Cymulate test', () => {
  let loginPage;
  let homePage;
  let reportsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    reportsPage = new ReportsPage(page);
    await page.goto(url);
  });

  test('Get WAF report', async ({ page }) => {
    await loginPage.login(username, password);
    await homePage.assertHomePageLoaded();
    await homePage.switchToReportTab();
    await reportsPage.assertReportsTabLoaded();
    await reportsPage.getOverview();
    await reportsPage.getReportSummery();
    await reportsPage.assertReportSummeryDetailsVisible(data.assesmentScore, data.assesmentsStatus);
    await reportsPage.downloadReport();
    const downloadedPage = page.waitForEvent('download');
    await reportsPage.downloadButton.first().click();
    const download = await downloadedPage;
    await download.saveAs('report.csv');
    expect(fs.existsSync('report.csv')).toBeTruthy();
    const reader = fs.readFileSync('report.csv').toString();
    if (reader.includes(data.message)) {
      console.log(`Text: ${data.message} included in report.csv file`);
    } else {
      console.log(`Text: ${data.message} NOT included in report.csv file`);
    }
  });
});
