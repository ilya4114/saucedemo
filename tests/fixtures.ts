import { test as base, Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

type Users =
  | 'standard_user'
  | 'locked_out_user'
  | 'problem_user'
  | 'performance_glitch_user'
  | 'error_user'
  | 'visual_user';

function createUserFixture(user: Users) {
  return async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com/');
    await loginPage.login(user, 'secret_sauce');
    await use(page);
  };
}

export const test = base.extend<{
  standardUserPage: Page;
  lockedOutUserPage: Page;
  problemUserPage: Page;
  glitchUserPage: Page;
  errorUserPage: Page;
  visualUserPage: Page;
}>({
  standardUserPage: createUserFixture('standard_user'),
  lockedOutUserPage: createUserFixture('locked_out_user'),
  problemUserPage: createUserFixture('problem_user'),
  glitchUserPage: createUserFixture('performance_glitch_user'),
  errorUserPage: createUserFixture('error_user'),
  visualUserPage: createUserFixture('visual_user'),
});
