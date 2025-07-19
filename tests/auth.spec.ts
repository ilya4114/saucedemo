import { test } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// Список тестируемых аккаунтов и ожидаемый результат (успех или ошибка)
const accounts = [
  { username: 'standard_user', password: 'secret_sauce', expectError: false },
  { username: 'locked_out_user', password: 'secret_sauce', expectError: true },
  { username: 'problem_user', password: 'secret_sauce', expectError: false },
  { username: 'performance_glitch_user', password: 'secret_sauce', expectError: false },
  { username: 'error_user', password: 'secret_sauce', expectError: false },
  { username: 'visual_user', password: 'secret_sauce', expectError: false },
];

// Для каждого аккаунта выполняется один тест
for (const account of accounts) {
  test(`Login test: ${account.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page); // Инициализируем страницу логина

    await loginPage.open(); // Открываем сайт
    await loginPage.login(account.username, account.password); // Входим

    // Проверяем результат в зависимости от типа пользователя
    if (account.expectError) {
      await loginPage.checkError(); // Ожидаем ошибку входа
    } else {
      await loginPage.checkSuccess(); // Ожидаем успешный вход
    }
  });
}
