// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const xpathUsernameAddUsr = `//div[@class='oxd-form-row']//div[@class='oxd-grid-2 orangehrm-full-width-grid']//div[@class='oxd-grid-item oxd-grid-item--gutters']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']`;
const xpathPasswordAddUsr = `//div[@class='oxd-grid-item oxd-grid-item--gutters user-password-cell']//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@type='password']`;
const xpathConfPasswordAddUsr = `//div[@class="oxd-form-row user-password-row"]/div/div[2]/div/div[2]/input[@type='password']`;
const xpathSaveButtonAddUsr = `//div[@class="oxd-form-actions"]/button[@type="submit"]`;

const xpathUsrSearch = `//div[@class="oxd-form-row"]/div/div[1]/div/div[2]/input`;
const xpathRoleSearch = `//div[@class="oxd-form-row"]/div/div[2]/div/div[2]/div/div/div[2]`;
const xpathEmpNameSearch = `//div[@class="oxd-form-row"]/div/div[3]/div/div[2]/div/div/input`;
const xpathStatusSearch = `//div[@class="oxd-form-row"]/div/div[4]/div/div[2]/div/div/div[2]`;
const xpathButtonSearch = `//form/div[@class="oxd-form-actions"]/button[@type="submit"]`;

Cypress.Commands.add('login', (username, password) => {
    cy.visit("/auth/login");
    cy.xpath(`//input[@name='username']`).click({force:true}).type(username);
    cy.xpath(`//input[@name='password']`).click({force:true}).type(password);
    cy.xpath(`//button[@type='submit']`).click({force:true});
});

Cypress.Commands.add('TambahKaryawanBaru', (firstName, middleName, lastName, empId) => {
    cy.get(`.oxd-sidepanel-body > ul > li:nth-of-type(2) > a.oxd-main-menu-item > span.oxd-main-menu-item--name`).should('contain','PIM').click();
    cy.xpath(`//a[@class='oxd-main-menu-item active']`).should('be.visible');
    cy.url(`/pim/viewEmployeeList`).should('include','/pim/viewEmployeeList');
    cy.get('.orangehrm-header-container > .oxd-button').click();
    cy.url(`/pim/addEmployee`).should('include','/pim/addEmployee');
    // cy.xpath(`//h6[text()="PIM"]`).should('contain','PIM');
    cy.get(`nav > ul > li.--visited`).should('be.visible');

    cy.xpath(`//input[@name="firstName"]`).click().clear().type(firstName);
    cy.xpath(`//input[@name="middleName"]`).click().clear().type(middleName);
    cy.xpath(`//input[@name="lastName"]`).click().clear().type(lastName);
    cy.xpath(`//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']`)
        .click().clear().type(empId);
    cy.get('.oxd-button--secondary').click();
    cy.get('.orangehrm-edit-employee-name > .oxd-text').should('contain',`${firstName} ${lastName}`)
});

Cypress.Commands.add('TambahAkunKaryawan',(fullName,role,status,username,password,firstName,lastName)=>{
    // Buat Akun untuk Karyawan di menu Admin
    cy.get(`.oxd-sidepanel-body > ul > li:nth-of-type(1) > a.oxd-main-menu-item > span.oxd-main-menu-item--name`).click();
    cy.xpath(`//a[@class='oxd-main-menu-item active']`).should('be.visible');
    cy.url(`/admin/viewSystemUsers`).should('include','/admin/viewSystemUsers');
    cy.get('.orangehrm-header-container > .oxd-button').click();
    cy.url(`/admin/saveSystemUser`).should('include','/admin/saveSystemUser');
    cy.get(`nav > ul > li.--visited`).should('be.visible');

    cy.get(`:nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon`)
        .click();
    cy.get('.oxd-select-dropdown').contains(role).click();
    cy.get(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
    cy.get('.oxd-select-dropdown').contains(status).click();
    cy.xpath(xpathPasswordAddUsr).click().clear().type(password);
    cy.get(`.oxd-autocomplete-text-input--active > input`).click().clear().type(fullName);
    cy.get('.oxd-autocomplete-dropdown').contains(fullName).click();
    cy.xpath(xpathUsernameAddUsr).click().clear().type(username);
    cy.wait(3000)
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

Cypress.Commands.add('TambahJatahCuti', (fullName, leaveType, days) => {
    cy.xpath(`//a[@href="/web/index.php/leave/viewLeaveModule"]`).click();
    cy.url(`/leave/viewLeaveList`).should('include','/leave/viewLeaveList');
    cy.get(`nav > ul > li:nth-of-type(3)`).click();
    cy.xpath(`//ul[@class="oxd-dropdown-menu"]/li[1]`).click();
    cy.url(`/leave/addLeaveEntitlement`).should('include','/leave/addLeaveEntitlement');
    cy.xpath(`//input[@type="radio"]`).check("0");
    cy.get(`.oxd-autocomplete-wrapper > .oxd-autocomplete-text-input > input`).click().clear().type(fullName)
    cy.wait(3000);
    cy.get('.oxd-autocomplete-dropdown').contains(fullName).click();
    cy.xpath(`//form/div[3]/div/div[1]/div/div[2]/div[@class="oxd-select-wrapper"]/div/div[2]`).click();
    cy.get('.oxd-select-dropdown').contains(`${leaveType}`).click();
    // cy.xpath(`//form/div[3]/div/div[2]/div/div[2]/div[@class="oxd-select-wrapper"]/div/div[1]`).should('include',`${karyawan.izinCuti.validFrom}`);
    // cy.xpath(`//form/div[3]/div/div[2]/div/div[2]/div[@class="oxd-select-wrapper"]/div/div[2]`).click();
    // cy.get('.oxd-select-dropdown').contains(`${karyawan.izinCuti.validFrom}`).click();
    cy.xpath(`//form/div[3]/div/div[3]/div/div[2]/input`).click().clear().type(days);
    cy.xpath(`//button[@type='submit']`).click();
    cy.get('.oxd-sheet').should('be.visible');
    cy.get('.orangehrm-modal-footer > .oxd-button--secondary').click();

    cy.get('.orangehrm-container > .oxd-table > .oxd-table-body > .oxd-table-card > .oxd-table-row.oxd-table-row--with-border')
        .first()
        .within(() => {
            // Cek kolom Username (kolom ke-2)
            cy.get('.oxd-table-cell.oxd-padding-cell')
            .eq(1)
            .should('contain.text', leaveType);
            // Cek kolom User Role (kolom ke-6)
            cy.get('.oxd-table-cell.oxd-padding-cell')
            .eq(5)
            .should('contain.text', days);
    });
});

Cypress.Commands.add('logout',() => {
    cy.xpath(`//header/div/div[@class="oxd-topbar-header-userarea"]/ul/li/span`).click();
    cy.contains('Logout').click();
    cy.wait(2000);
    cy.url('/auth/login').should('include','/auth/login');
})