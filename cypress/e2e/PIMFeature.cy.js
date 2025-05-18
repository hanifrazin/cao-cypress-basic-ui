import { faker } from "@faker-js/faker";

describe('Test PIM Feature untuk web Orange HRM',() => {
    const firstName = faker.person.firstName();
    const middleName = faker.person.middleName();
    const lastName = faker.person.lastName();
    const empId = faker.number.int({min:10001,max:99999});

    beforeEach(() => {
        cy.login();
        cy.get(`.oxd-sidepanel-body > ul > li:nth-of-type(2) > a.oxd-main-menu-item > span.oxd-main-menu-item--name`).should('contain','PIM').click();
        cy.xpath(`//a[@class='oxd-main-menu-item active']`).should('be.visible');
        cy.url(`/pim/viewEmployeeList`);
        cy.get('.orangehrm-header-container > .oxd-button').click();
        cy.url(`/pim/addEmployee`);
        // cy.xpath(`//h6[text()="PIM"]`).should('contain','PIM');
        cy.get(`nav > ul > li.--visited`).should('be.visible');
    })

     it("Possitive Case - Tambah Karyawan Baru dengan data valid", () => {
        cy.xpath(`//input[@name="firstName"]`).click().clear().type(firstName);
        cy.xpath(`//input[@name="middleName"]`).click().clear().type(middleName);
        cy.xpath(`//input[@name="lastName"]`).click().clear().type(lastName);
        cy.xpath(`//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']`)
            .click().clear().type(empId);
        cy.get('.oxd-button--secondary').click();
        cy.get('.orangehrm-edit-employee-name > .oxd-text').should('contain',`${firstName} ${lastName}`)
    });

    it("Negative Case - Tambah Karyawan Baru dengan data empty", () => {
        cy.xpath(`//input[@name="firstName"]`).click().clear();
        cy.xpath(`//input[@name="middleName"]`).click().clear();
        cy.xpath(`//input[@name="lastName"]`).click().clear();
        cy.xpath(`//div[@class='oxd-input-group oxd-input-field-bottom-space']//div//input[@class='oxd-input oxd-input--active']`)
            .click().clear();
        cy.get('.oxd-button--secondary').click();
        cy.xpath(`//span[text()="Required"]`).should('contain','Required')
    });
});