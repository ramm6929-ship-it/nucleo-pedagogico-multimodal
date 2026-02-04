import { test, expect } from '@playwright/test';
import { LandingPage } from '../pages/LandingPage';
import { LoginPage } from '../pages/LoginPage';
import { RoleSelectionPage } from '../pages/RoleSelectionPage';
import { SubjectsPage } from '../pages/SubjectsPage';
import { DashboardPage } from '../pages/DashboardPage';

test.describe('Auditoría Integral: Flujo del Estudiante', () => {

    test('Recorrido completo desde Inicio hasta Dashboard (CNEYT)', async ({ page }) => {
        const landingPage = new LandingPage(page);
        const loginPage = new LoginPage(page);
        const roleSelectionPage = new RoleSelectionPage(page);
        const subjectsPage = new SubjectsPage(page);
        const dashboardPage = new DashboardPage(page);

        await test.step('1. Navegar a la página de inicio', async () => {
            await landingPage.navigateTo('/');
            await expect(landingPage.mainTitle).toBeVisible();
            await expect(landingPage.mainTitle).toContainText('Núcleo Pedagógico Multimodal');
        });

        await test.step('2. Acceso a Identificación', async () => {
            await landingPage.clickIniciarSesion();
            await expect(page).toHaveURL(/.*login/);
        });

        await test.step('3. Proceso de Login', async () => {
            await page.getByPlaceholder(/ID ENTIDAD/i).fill('EST-PROC-001');
            await page.getByPlaceholder(/••••••••/i).fill('MOCK_PASS');
            await page.getByRole('button', { name: /Acceder/i }).click();
            await expect(page).toHaveURL(/.*seleccion-rol/);
        });

        await test.step('4. Selección de Perfil Estudiante', async () => {
            await roleSelectionPage.selectEstudiante();
            await expect(page).toHaveURL(/.*estudiante/);
        });

        await test.step('5. Selección de Asignatura (CNEYT)', async () => {
            await expect(subjectsPage.subjectCNEYTButton).toBeVisible();
            await subjectsPage.selectCNEYT();
            await expect(page).toHaveURL(/.*dashboard/);
        });

        await test.step('6. Verificación de Identidad en Dashboard (Header)', async () => {
            const header = await dashboardPage.getHeaderSubject();
            await expect(header).toBeVisible({ timeout: 10000 });
            await expect(header).toHaveText('Ciencias Naturales, Experimentales y Tecnología');
        });
    });
});
