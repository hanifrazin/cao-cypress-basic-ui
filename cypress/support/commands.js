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

Cypress.Commands.add('login', () => {
    cy.visit("/auth/login");
    cy.xpath(`//input[@name='username']`).click().clear().type("Admin");
    cy.xpath(`//input[@name='password']`).click().clear().type("admin123");
    cy.xpath(`//button[@type='submit']`).click();
    cy.url(`/dashboard/index`);
    // cy.xpath(`//a[@class="oxd-main-menu-item active"]/span[text()="Dashboard"]`).should('be.visible').and('contain','Dashboard')
});

Cypress.Commands.add('TambahKaryawanBaru', (firstName,middleName,lastName,empId) => {
    cy.get(`.oxd-sidepanel-body > ul > li:nth-of-type(2) > a.oxd-main-menu-item > span.oxd-main-menu-item--name`).should('contain','PIM').click();
    cy.xpath(`//a[@class='oxd-main-menu-item active']`).should('be.visible');
    cy.url(`/pim/viewEmployeeList`);
    cy.get('.orangehrm-header-container > .oxd-button').click();
    cy.url(`/pim/addEmployee`);
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