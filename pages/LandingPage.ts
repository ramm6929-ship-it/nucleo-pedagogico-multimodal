import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LandingPage extends BasePage {
    readonly iniciarSesionLink: Locator;
    readonly mainTitle: Locator;

    constructor(page: Page) {
        super(page);
        // Locators Semánticos
        this.iniciarSesionLink = page.getByRole('link', { name: /iniciar sesión/i });
        this.mainTitle = page.getByRole('heading', { level: 1 });
    }

    async clickIniciarSesion() {
        await this.iniciarSesionLink.click();
    }
}
