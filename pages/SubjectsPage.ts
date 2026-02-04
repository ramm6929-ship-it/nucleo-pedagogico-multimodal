import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SubjectsPage extends BasePage {
    readonly subjectCNEYTButton: Locator;
    readonly subjectPMButton: Locator;

    constructor(page: Page) {
        super(page);
        // Locators Semánticos según app/estudiante/page.tsx
        this.subjectCNEYTButton = page.getByRole('button', { name: /ciencias naturales/i });
        this.subjectPMButton = page.getByRole('button', { name: /pensamiento matemático/i });
    }

    async selectCNEYT() {
        await this.subjectCNEYTButton.click();
    }

    async selectPM() {
        await this.subjectPMButton.click();
    }
}
