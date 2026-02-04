import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    readonly roleEstudianteButton: Locator;
    readonly roleDocenteButton: Locator;

    constructor(page: Page) {
        super(page);
        // Locators Semánticos
        this.roleEstudianteButton = page.getByRole('button', { name: /estudiante/i });
        this.roleDocenteButton = page.getByRole('button', { name: /docente/i });
    }

    async selectEstudiante() {
        await this.roleEstudianteButton.click();
    }

    async selectDocente() {
        await this.roleDocenteButton.click();
    }
}
