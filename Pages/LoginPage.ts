import { expect, Locator, Page } from '@playwright/test';
import { selectorsOfLoginPage } from '../PageSelectors/LoginPage';

export class LoginPage {
  readonly page: Page;
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameField = page.locator(selectorsOfLoginPage.usernameInputField);
    this.passwordField = page.locator(selectorsOfLoginPage.passwordInputField);
    this.signInButton = page.locator(selectorsOfLoginPage.signInButton);
  }

  async fillUserName(username: string) {
    await expect(this.usernameField).toBeVisible();
    await this.usernameField.click();
    await this.usernameField.fill(username);
  }

  async fillPassword(password: string) {
    await expect(this.passwordField).toBeVisible();
    await this.passwordField.click();
    await this.passwordField.fill(password);
  }

  async login(username: string, password: string) {
    await this.fillUserName(username);
    await this.fillPassword(password);
    await expect(this.signInButton).toBeVisible();
    await this.signInButton.click();
  }
}
