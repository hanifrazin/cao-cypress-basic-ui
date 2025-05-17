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
    cy.xpath(`//input[@placeholder='Username']`).click().clear().type("Admin");
    cy.xpath(`//input[@placeholder='Password']`).click().clear().type("admin123");
    cy.xpath(`//button[@type='submit']`).click();
    cy.url(`/dashboard/index`);
    cy.xpath(`//a[@class="oxd-main-menu-item active"]/span[text()="Dashboard"]`).should('be.visible').and('contain','Dashboard')
});