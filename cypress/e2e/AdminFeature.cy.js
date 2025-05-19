import { faker } from "@faker-js/faker";

describe('Test Admin Feature untuk web Orange HRM',() => {
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();
    const fullName = `${firstName} ${middleName} ${lastName}`;
    
    const numbUsr = faker.number.int({min:100,max:999});
    const username = firstName.length < 5 ? `${firstName.toLowerCase()}_${numbUsr}` : firstName.toLowerCase();
    const password = `${firstName}@@12345`;
    const role = 'Admin';
    const status = 'Enabled';

    const xpathUsernameAddUsr = `//div[@class='oxd-form-row']//div[@class='oxd-grid-2 orangehrm-full-width-grid']//div[@class='oxd-grid-item oxd-grid-item--gutters']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']`;
    const xpathPasswordAddUsr = `//div[@class='oxd-grid-item oxd-grid-item--gutters user-password-cell']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@type='password']`;
    const xpathConfPasswordAddUsr = `//div[@class="oxd-form-row user-password-row"]/div/div[2]/div/div[2]/input[@type='password']`;
    const xpathSaveButtonAddUsr = `//div[@class="oxd-form-actions"]/button[@type="submit"]`;

    const xpathUsrSearch = `//div[@class="oxd-form-row"]/div/div[1]/div/div[2]/input`;
    const xpathRoleSearch = `//div[@class="oxd-form-row"]/div/div[2]/div/div[2]/div/div/div[2]`;
    const xpathEmpNameSearch = `//div[@class="oxd-form-row"]/div/div[3]/div/div[2]/div/div/input`;
    const xpathStatusSearch = `//div[@class="oxd-form-row"]/div/div[4]/div/div[2]/div/div/div[2]`;
    const xpathButtonSearch = `//form/div[@class="oxd-form-actions"]/button[@type="submit"]`;

    beforeEach(() => {
        cy.login();
        const empId = faker.number.int({min:10001,max:99999});
        cy.TambahKaryawanBaru(firstName,middleName,lastName,empId);
        cy.get(`.oxd-sidepanel-body > ul > li:nth-of-type(1) > a.oxd-main-menu-item > span.oxd-main-menu-item--name`)
        .should('contain','Admin').click();
        cy.xpath(`//a[@class='oxd-main-menu-item active']`).should('be.visible');
        cy.url(`/admin/viewSystemUsers`).should('include','/admin/viewSystemUser');
        cy.get('.orangehrm-header-container > .oxd-button').click();
        cy.url(`/admin/saveSystemUser`).should('include','/admin/saveSystemUser');
        cy.xpath(`//h6[text()="Admin"]`).should('contain','Admin');
        cy.get(`nav > ul > li.--visited`).should('be.visible');
    });
    
    it("Possitive Case - Buat Akun untuk Karyawan Baru dengan data valid", () => {
        cy.get(`:nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon`)
            .click();
        cy.get('.oxd-select-dropdown').contains(role).click();
        cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        cy.get('.oxd-select-dropdown').contains(status).click();
        cy.xpath(xpathPasswordAddUsr).click().clear().type(password);
        cy.get(`.oxd-autocomplete-text-input--active > input`).click().clear().type(fullName);
        cy.get('.oxd-autocomplete-dropdown').contains(fullName).click();
        cy.xpath(xpathUsernameAddUsr).click().clear().type(username);
        cy.wait(1000)
        cy.xpath(xpathConfPasswordAddUsr).click().clear().type(password);
        cy.xpath(xpathSaveButtonAddUsr).click();
        cy.url(`/admin/viewSystemUsers`);
        cy.xpath(xpathUsrSearch).click().clear().type(username);
        cy.xpath(xpathRoleSearch).click();
        cy.get('.oxd-select-dropdown').contains(role).click();
        cy.xpath(xpathEmpNameSearch).click().clear().type(fullName);
        cy.get('.oxd-autocomplete-dropdown').contains(fullName).click();
        cy.xpath(xpathStatusSearch).click();
        cy.get('.oxd-select-dropdown').contains(status).click();
        cy.xpath(xpathButtonSearch).click();
        cy.get('.orangehrm-container > .oxd-table > .oxd-table-body > .oxd-table-card > .oxd-table-row.oxd-table-row--with-border')
            .first()
            .within(() => {
                // Cek kolom Username (kolom ke-2)
                cy.get('.oxd-table-cell.oxd-padding-cell')
                .eq(1)
                .should('contain.text', username);

                // Cek kolom User Role (kolom ke-3)
                cy.get('.oxd-table-cell.oxd-padding-cell')
                .eq(2)
                .should('contain.text', role);

                // Cek kolom Employee Name (kolom ke-4)
                cy.get('.oxd-table-cell.oxd-padding-cell')
                .eq(3)
                .should('contain.text', `${firstName} ${lastName}`);

                // Cek kolom Status (kolom ke-5)
                cy.get('.oxd-table-cell.oxd-padding-cell')
                .eq(4)
                .should('contain.text', status);
            });
    });

    it("Negative Case - Buat Akun untuk Karyawan Baru dengan data empty", () => {
        cy.xpath(xpathSaveButtonAddUsr).click();
        cy.get('.oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message').should('be.visible') 
    });
});