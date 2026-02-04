import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {
    readonly headerSubjectName: Locator;

    constructor(page: Page) {
        super(page);
        // El header está en el AppShell, accesible desde el dashboard
        this.headerSubjectName = page.locator('header').getByRole('heading', { level: 2 });
        // Nota: En HeaderContextual el nombre está en un span o div, verifiquemos de nuevo
    }

    async getHeaderSubject() {
        // Selector específico para el texto de la asignatura en el header de AppShell/HeaderContextual
        return this.page.locator('header span.text-slate-200');
    }
}
